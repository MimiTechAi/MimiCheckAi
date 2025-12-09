import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Fallback data when AI is not available
const getFallbackAnalysis = (userProfile: any) => {
  const programs = [];
  const hasChildren = userProfile?.lebenssituation?.kinder_anzahl > 0 || userProfile?.kinder_anzahl > 0;
  const isRenting = userProfile?.lebenssituation?.wohnart === 'miete' || userProfile?.wohnart === 'miete';
  const income = userProfile?.lebenssituation?.monatliches_nettoeinkommen || 0;
  const isUnemployed = userProfile?.lebenssituation?.beschaeftigungsstatus === 'arbeitslos';
  const isStudent = userProfile?.lebenssituation?.beschaeftigungsstatus === 'student';

  // Wohngeld - für Mieter mit niedrigem Einkommen
  if (isRenting && income < 2500) {
    programs.push({
      programName: 'Wohngeld',
      eligibilityScore: income < 1500 ? 90 : 70,
      estimatedAmount: Math.round(150 + (2500 - income) * 0.1),
      reasoning: 'Basierend auf Ihrem Einkommen und Ihrer Wohnsituation könnten Sie Anspruch auf Wohngeld haben.',
      requiredDocuments: ['Mietvertrag', 'Einkommensnachweise der letzten 3 Monate', 'Personalausweis'],
      nextSteps: ['Wohngeldantrag bei der Gemeinde stellen', 'Unterlagen zusammenstellen'],
      officialLink: 'https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html'
    });
  }

  // Kindergeld - für Familien mit Kindern
  if (hasChildren) {
    programs.push({
      programName: 'Kindergeld',
      eligibilityScore: 95,
      estimatedAmount: 250,
      reasoning: 'Als Familie mit Kindern haben Sie Anspruch auf Kindergeld.',
      requiredDocuments: ['Geburtsurkunde des Kindes', 'Steuer-ID des Kindes', 'Personalausweis'],
      nextSteps: ['Antrag bei der Familienkasse stellen'],
      officialLink: 'https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-anspruch-hoehe-dauer'
    });
  }

  // Bürgergeld - bei Arbeitslosigkeit
  if (isUnemployed || income < 500) {
    programs.push({
      programName: 'Bürgergeld',
      eligibilityScore: isUnemployed ? 85 : 60,
      estimatedAmount: 563,
      reasoning: 'Bei Arbeitslosigkeit oder sehr geringem Einkommen besteht möglicherweise Anspruch auf Bürgergeld.',
      requiredDocuments: ['Kontoauszüge der letzten 3 Monate', 'Mietbescheinigung', 'Personalausweis', 'Arbeitslosenbescheinigung'],
      nextSteps: ['Termin beim Jobcenter vereinbaren', 'Antrag stellen'],
      officialLink: 'https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld'
    });
  }

  // BAföG - für Studenten
  if (isStudent) {
    programs.push({
      programName: 'BAföG',
      eligibilityScore: 75,
      estimatedAmount: 450,
      reasoning: 'Als Student/in könnten Sie Anspruch auf BAföG haben.',
      requiredDocuments: ['Immatrikulationsbescheinigung', 'Einkommensnachweise der Eltern', 'Personalausweis'],
      nextSteps: ['Online-Antrag auf bafög.de stellen'],
      officialLink: 'https://www.bafög.de/'
    });
  }

  // Kinderzuschlag - für Familien mit niedrigem Einkommen
  if (hasChildren && income > 900 && income < 2000) {
    programs.push({
      programName: 'Kinderzuschlag',
      eligibilityScore: 70,
      estimatedAmount: 250,
      reasoning: 'Familien mit Kindern und geringem Einkommen können Kinderzuschlag erhalten.',
      requiredDocuments: ['Einkommensnachweise', 'Geburtsurkunden der Kinder', 'Mietvertrag'],
      nextSteps: ['Antrag bei der Familienkasse stellen'],
      officialLink: 'https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag'
    });
  }

  const totalBenefit = programs.reduce((sum, p) => sum + p.estimatedAmount, 0);

  return {
    estimatedTotalMonthlyBenefit: totalBenefit,
    eligiblePrograms: programs,
    recommendations: [
      'Vervollständigen Sie Ihr Profil für genauere Empfehlungen.',
      'Sammeln Sie alle erforderlichen Dokumente vor der Antragstellung.',
      'Beachten Sie die Fristen für die Antragstellung.'
    ]
  };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userProfile } = await req.json()

    // 1. Validate Input
    if (!userProfile) {
      throw new Error('User profile is required')
    }

    // 2. Try AI Analysis (Using OpenAI GPT-4o)
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    
    // If no API key, use fallback
    if (!OPENAI_API_KEY) {
      console.log('No OpenAI API key configured, using fallback analysis')
      const fallbackResult = getFallbackAnalysis(userProfile)
      return new Response(
        JSON.stringify({ analysis: fallbackResult, source: 'fallback' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const prompt = `
      Analysiere die folgende Lebenssituation für Sozialleistungen in Deutschland (Wohngeld, Kindergeld, Bürgergeld, BAföG, Kinderzuschlag, etc.).
      
      Profil:
      ${JSON.stringify(userProfile, null, 2)}
      
      Gib das Ergebnis als valides JSON zurück mit folgender Struktur:
      {
        "estimatedTotalMonthlyBenefit": number,
        "eligiblePrograms": [
          {
            "programName": string,
            "eligibilityScore": number (0-100),
            "estimatedAmount": number,
            "reasoning": string (kurze Begründung auf Deutsch),
            "requiredDocuments": string[],
            "nextSteps": string[],
            "officialLink": string (offizielle Website)
          }
        ],
        "recommendations": string[] (allgemeine Tipps)
      }
      
      Wichtig:
      - Sei präzise und realistisch basierend auf deutschen Gesetzen 2025
      - Schätze Beträge konservativ
      - Gib nur Programme zurück, für die eine realistische Chance besteht (Score > 50)
      - Sortiere nach eligibilityScore absteigend
    `

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'Du bist ein Experte für deutsche Sozialleistungen und Bürokratie. Antworte immer mit validem JSON.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          response_format: { type: "json_object" }
        }),
      })

      const aiData = await response.json()

      if (aiData.error) {
        console.error('OpenAI Error:', aiData.error)
        // Fallback on AI error
        const fallbackResult = getFallbackAnalysis(userProfile)
        return new Response(
          JSON.stringify({ analysis: fallbackResult, source: 'fallback' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const content = aiData.choices[0]?.message?.content
      if (!content) {
        throw new Error('No content in AI response')
      }

      const analysisResult = JSON.parse(content.replace(/```json|```/g, '').trim())

      // 3. Return Result
      return new Response(
        JSON.stringify({ analysis: analysisResult, source: 'ai' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (aiError) {
      console.error('AI Analysis failed:', aiError)
      // Fallback on any AI error
      const fallbackResult = getFallbackAnalysis(userProfile)
      return new Response(
        JSON.stringify({ analysis: fallbackResult, source: 'fallback' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

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
