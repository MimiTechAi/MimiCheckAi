import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"
import Stripe from "https://esm.sh/stripe@14.14.0"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 1. Validation & Auth
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            throw new Error('No authorization header provided')
        }

        // DEBUG: Was kommt an? (Nur erste Zeichen loggen für Sicherheit)
        console.log(`Auth Header received: ${authHeader.substring(0, 15)}...`)

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: authHeader } } }
        )

        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()

        if (userError || !user) {
            console.error('Auth Error:', userError)
            return new Response(
                JSON.stringify({ error: 'Authentication failed', details: userError?.message }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 2. Request Parsing
        const { planId, successUrl, cancelUrl } = await req.json()
        if (!planId || !['premium', 'pro'].includes(planId)) {
            return new Response(
                JSON.stringify({ error: 'Invalid planId. Must be "premium" or "pro".' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 3. Stripe Initialization
        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
        if (!STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY not set')

        const stripe = new Stripe(STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16',
            httpClient: Stripe.createFetchHttpClient(),
        })

        const PRICE_IDS = {
            premium: Deno.env.get('STRIPE_PREMIUM_PRICE_ID'),
            pro: Deno.env.get('STRIPE_PRO_PRICE_ID')
        }

        if (!PRICE_IDS[planId as keyof typeof PRICE_IDS]) {
            throw new Error(`Price ID for ${planId} not configured`)
        }

        // 4. Customer Resolution
        let customerId = user.user_metadata?.stripe_customer_id

        if (!customerId) {
            console.log(`Looking up customer for ${user.email}...`)
            const customers = await stripe.customers.list({ email: user.email, limit: 1 });

            if (customers.data.length > 0) {
                customerId = customers.data[0].id;
                console.log(`Found existing customer: ${customerId}`)
            } else {
                console.log(`Creating new customer for ${user.email}...`)
                const customer = await stripe.customers.create({
                    email: user.email,
                    name: user.user_metadata?.full_name || user.email,
                    metadata: { user_id: user.id }
                });
                customerId = customer.id;
            }

            // Save back to Supabase
            await supabaseClient.auth.updateUser({
                data: { stripe_customer_id: customerId }
            });
        }

        // 5. Create Session
        console.log(`Creating session for ${customerId} with price ${PRICE_IDS[planId as keyof typeof PRICE_IDS]}`)

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: PRICE_IDS[planId as keyof typeof PRICE_IDS],
                    quantity: 1,
                },
            ],
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                user_id: user.id,
                plan_id: planId
            },
            subscription_data: {
                metadata: {
                    user_id: user.id,
                    plan_id: planId
                }
            }
        })

        return new Response(
            JSON.stringify({ checkoutUrl: session.url, sessionId: session.id }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error('Stripe Checkout Error:', error)
        // CRITICAL: Return the actual error message to the client for clear debugging
        return new Response(
            JSON.stringify({ error: `Server Error: ${error.message || error}`, stack: error.stack }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
