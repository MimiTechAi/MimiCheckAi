import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
}

interface FillPdfRequest {
  pdfUrl: string
  formType: string
  userProfile: any
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { pdfUrl, formType, userProfile }: FillPdfRequest = await req.json()
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY')

    if (!claudeApiKey) {
      throw new Error('CLAUDE_API_KEY nicht konfiguriert')
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    // Supabase Client für Auth
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    if (!supabaseServiceRoleKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY nicht konfiguriert')
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceRoleKey
    )

    // User authentifizieren
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('Nicht authentifiziert')
    }

    const { data: dbUser, error: dbUserError } = await supabaseAdmin
      .from('users')
      .select('id, subscription_tier, subscription_status, ai_autofill_free_used_at')
      .eq('auth_id', user.id)
      .maybeSingle()

    if (dbUserError) {
      throw new Error(dbUserError.message)
    }

    const tier = dbUser?.subscription_tier
    const status = dbUser?.subscription_status
    const freeUsedAt = dbUser?.ai_autofill_free_used_at
    const hasPaidTier = typeof tier === 'string' && tier !== 'free'
    const isPaidActive = hasPaidTier && (status === 'active' || status === 'trialing' || typeof status !== 'string')

    if (!isPaidActive) {
      if (freeUsedAt) {
        return new Response(
          JSON.stringify({
            error: 'PAYWALL_REQUIRED',
            message: 'Free usage exhausted'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 402,
          }
        )
      }

      const { error: claimError } = await supabaseAdmin
        .from('users')
        .update({ ai_autofill_free_used_at: new Date().toISOString() })
        .eq('auth_id', user.id)
        .is('ai_autofill_free_used_at', null)

      if (claimError) {
        throw new Error(claimError.message)
      }
    }

    console.log('Fülle PDF für User:', user.id, 'FormType:', formType)

    // 1. Claude API aufrufen für intelligentes Mapping
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: `Du bist ein KI-Assistent für deutsche Behördenformulare.

**Antragstyp**: ${formType}

**Nutzerprofil**:
${JSON.stringify(userProfile, null, 2)}

**Aufgabe**:
Erstelle ein intelligentes Mapping für das ${formType}-Formular. Gib mir eine JSON-Struktur zurück mit Vorschlägen für jedes Formularfeld:

{
  "suggestions": [
    {
      "fieldName": string (technischer Feldname),
      "displayName": string (deutscher Feldname),
      "suggestedValue": any (Wert aus Profil),
      "confidence": number (0-1),
      "source": string (woher der Wert kommt),
      "note": string (optional: Hinweis für User)
    }
  ],
  "missingFields": [
    {
      "fieldName": string,
      "displayName": string,
      "description": string,
      "required": boolean
    }
  ],
  "warnings": string[] (wichtige Hinweise)
}

**Wichtige Felder für ${formType}**:
- Vorname, Nachname
- Geburtsdatum
- Adresse (Straße, PLZ, Ort)
- Einkommen
${formType === 'wohngeld' ? '- Miete (kalt)\n- Wohnfläche in qm' : ''}
${formType === 'buergergeld' ? '- Vermögen\n- Haushaltsgröße' : ''}

Antworte NUR mit validem JSON, ohne zusätzlichen Text.`
        }]
      })
    })

    if (!claudeResponse.ok) {
      const error = await claudeResponse.text()
      throw new Error(`Claude API Fehler: ${error}`)
    }

    const claudeData = await claudeResponse.json()
    const content = claudeData.content[0].text

    // Parse Claude's JSON response
    let mappingResult
    try {
      mappingResult = JSON.parse(content)
    } catch (e) {
      console.error('JSON Parse Error:', e)
      mappingResult = {
        suggestions: [],
        missingFields: [],
        warnings: ['Claude konnte kein valides JSON erstellen'],
        rawResponse: content
      }
    }

    // 2. In Production: PDF tatsächlich mit pdf-lib oder ähnlichem ausfüllen
    // Hier: Simuliere Ergebnis
    const filledFields = mappingResult.suggestions?.length || 0
    const totalFields = filledFields + (mappingResult.missingFields?.length || 0)
    const skippedFields = mappingResult.missingFields?.length || 0

    return new Response(
      JSON.stringify({
        success: true,
        mapping: mappingResult,
        stats: {
          filledFields,
          skippedFields,
          totalFields,
          completeness: totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0
        },
        message: 'Formular-Mapping erfolgreich erstellt. PDF-Ausfüllung erfordert pdf-lib Integration.'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'x-filled-fields': filledFields.toString(),
          'x-skipped-fields': skippedFields.toString()
        },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Fehler:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
