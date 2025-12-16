import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
}

interface AnalyzePdfRequest {
    pdfUrl?: string
    pdfText?: string
    formType?: string
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { pdfText, pdfUrl, formType = 'buergergeld' }: AnalyzePdfRequest = await req.json()

        if (!pdfText && !pdfUrl) {
            return new Response(
                JSON.stringify({ error: 'pdfUrl or pdfText is required' }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
            )
        }

        const claudeApiKey = Deno.env.get('CLAUDE_API_KEY') ?? Deno.env.get('ANTHROPIC_API_KEY')
        if (!claudeApiKey) {
            return new Response(
                JSON.stringify({ error: 'CLAUDE_API_KEY (oder ANTHROPIC_API_KEY) nicht konfiguriert' }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
            )
        }

        const prompt = `Analysiere dieses ${formType}-Formular PDF und gib mir eine JSON-Struktur zurück mit:
          
{
  "hasFormFields": boolean,
  "fieldCount": number,
  "fields": [
    {
      "fieldName": string,
      "fieldType": "text" | "date" | "number" | "checkbox" | "select",
      "required": boolean,
      "description": string
    }
  ],
  "suggestions": [
    {
      "fieldName": string,
      "expectedDataType": string,
      "hint": string
    }
  ]
}

PDF Input:
${pdfText ? pdfText.substring(0, 4000) : 'PDF URL: ' + pdfUrl}

Antworte NUR mit validem JSON, ohne zusätzlichen Text.`

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': claudeApiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4096,
                messages: [{ role: 'user', content: prompt }],
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            return new Response(
                JSON.stringify({ error: `Claude API Fehler: ${errorText}` }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
            )
        }

        const aiData = await response.json()
        const content = aiData?.content?.[0]?.text

        let analysisResult: any
        try {
            analysisResult = JSON.parse(String(content ?? '').replace(/```json|```/g, '').trim())
        } catch {
            analysisResult = {
                hasFormFields: false,
                fieldCount: 0,
                warning: 'PDF konnte nicht analysiert werden',
                rawResponse: content
            }
        }

        return new Response(
            JSON.stringify(analysisResult),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )

    } catch (error) {
        console.error('Error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        )
    }
})
