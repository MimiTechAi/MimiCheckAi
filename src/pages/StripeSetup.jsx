import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User } from '@/api/entities';
import { 
    CheckCircle, 
    Copy,
    ExternalLink,
    AlertTriangle,
    Shield,
    Code,
    ArrowRight,
    Info
} from 'lucide-react';

/**
 * STRIPE SETUP MIT VISUELLER ANLEITUNG
 * Zeigt dem User GENAU wie er Backend Functions erstellt
 */
export default function StripeSetup() {
    const [user, setUser] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);

    useEffect(() => {
        User.me().then(setUser).catch(console.error);
    }, []);

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    // Die 4 Backend Functions
    const functions = {
        validateStripeSetup: `import { createClientFromRequest } from 'npm:@mimitech/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const mimitech = createClientFromRequest(req);
        const user = await mimitech.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
        const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');
        const STRIPE_PREMIUM_PRICE_ID = Deno.env.get('STRIPE_PREMIUM_PRICE_ID');
        const STRIPE_PRO_PRICE_ID = Deno.env.get('STRIPE_PRO_PRICE_ID');

        const validationResult = {
            success: true,
            checks: {
                stripe_secret_key: !!STRIPE_SECRET_KEY,
                stripe_webhook_secret: !!STRIPE_WEBHOOK_SECRET,
                premium_price_id: !!STRIPE_PREMIUM_PRICE_ID,
                pro_price_id: !!STRIPE_PRO_PRICE_ID
            },
            message: ''
        };

        if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !STRIPE_PREMIUM_PRICE_ID || !STRIPE_PRO_PRICE_ID) {
            validationResult.success = false;
            validationResult.message = 'Einige Stripe Secrets fehlen.';
        } else {
            try {
                const testResponse = await fetch('https://api.stripe.com/v1/customers?limit=1', {
                    headers: { 'Authorization': \`Bearer \${STRIPE_SECRET_KEY}\` }
                });

                if (!testResponse.ok) {
                    validationResult.success = false;
                    validationResult.message = 'Stripe API Key ungültig.';
                } else {
                    validationResult.message = '✅ Stripe vollständig konfiguriert!';
                }
            } catch (error) {
                validationResult.success = false;
                validationResult.message = \`Fehler: \${error.message}\`;
            }
        }

        return Response.json(validationResult);
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
});`,

        createStripeCheckoutSession: `import { createClientFromRequest } from 'npm:@mimitech/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const mimitech = createClientFromRequest(req);
        const user = await mimitech.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
        const { planId, successUrl, cancelUrl } = await req.json();

        if (!planId || !['premium', 'pro'].includes(planId)) {
            return Response.json({ error: 'Invalid planId' }, { status: 400 });
        }

        const PRICE_IDS = {
            premium: Deno.env.get('STRIPE_PREMIUM_PRICE_ID'),
            pro: Deno.env.get('STRIPE_PRO_PRICE_ID')
        };

        let customerId = user.stripe_customer_id;

        if (!customerId) {
            const customerResponse = await fetch('https://api.stripe.com/v1/customers', {
                method: 'POST',
                headers: {
                    'Authorization': \`Bearer \${STRIPE_SECRET_KEY}\`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    email: user.email,
                    name: user.full_name || user.email,
                    'metadata[user_id]': user.id
                })
            });

            const customer = await customerResponse.json();
            customerId = customer.id;

            await mimitech.asServiceRole.entities.User.update(user.id, {
                stripe_customer_id: customerId
            });
        }

        const sessionResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': \`Bearer \${STRIPE_SECRET_KEY}\`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                customer: customerId,
                mode: 'subscription',
                'payment_method_types[]': 'card',
                'line_items[0][price]': PRICE_IDS[planId],
                'line_items[0][quantity]': '1',
                success_url: successUrl,
                cancel_url: cancelUrl,
                'metadata[user_id]': user.id,
                'metadata[plan_id]': planId,
                'subscription_data[metadata][user_id]': user.id,
                'subscription_data[metadata][plan_id]': planId
            })
        });

        const session = await sessionResponse.json();
        return Response.json({ checkoutUrl: session.url, sessionId: session.id });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});`,

        createCustomerPortalSession: `import { createClientFromRequest } from 'npm:@mimitech/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const mimitech = createClientFromRequest(req);
        const user = await mimitech.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!user.stripe_customer_id) {
            return Response.json({ error: 'No subscription' }, { status: 400 });
        }

        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
        const { returnUrl } = await req.json();

        const portalResponse = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
            method: 'POST',
            headers: {
                'Authorization': \`Bearer \${STRIPE_SECRET_KEY}\`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                customer: user.stripe_customer_id,
                return_url: returnUrl
            })
        });

        const portalSession = await portalResponse.json();
        return Response.json({ portalUrl: portalSession.url });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});`,

        stripeWebhookHandler: `import { createClientFromRequest } from 'npm:@mimitech/sdk@0.7.1';
import Stripe from 'npm:stripe@14.11.0';

Deno.serve(async (req) => {
    try {
        const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
        const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET');

        const stripe = new Stripe(STRIPE_SECRET_KEY);
        const signature = req.headers.get('stripe-signature');
        const body = await req.text();

        let event;
        try {
            event = await stripe.webhooks.constructEventAsync(body, signature, STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            return Response.json({ error: 'Invalid signature' }, { status: 400 });
        }

        const mimitech = createClientFromRequest(req);

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const userId = session.metadata.user_id;
                const planId = session.metadata.plan_id;

                if (userId && planId) {
                    await mimitech.asServiceRole.entities.User.update(userId, {
                        subscription_tier: planId,
                        subscription_status: 'active',
                        stripe_subscription_id: session.subscription
                    });
                }
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object;
                const subData = await stripe.subscriptions.retrieve(invoice.subscription);
                const userId = subData.metadata.user_id;

                if (userId) {
                    await mimitech.asServiceRole.entities.User.update(userId, {
                        subscription_status: 'active'
                    });
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const userId = subscription.metadata.user_id;

                if (userId) {
                    await mimitech.asServiceRole.entities.User.update(userId, {
                        subscription_tier: 'free',
                        subscription_status: 'cancelled',
                        stripe_subscription_id: null
                    });
                }
                break;
            }
        }

        return Response.json({ received: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});`
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Stripe Backend Setup - Detaillierte Anleitung
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                    Folgen Sie dieser Schritt-für-Schritt-Anleitung, um alle Backend Functions zu erstellen
                </p>
            </div>

            {/* Admin Check */}
            {user && user.role !== 'admin' && (
                <Alert variant="destructive">
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                        <strong>⚠️ PROBLEM GEFUNDEN:</strong> Sie sind kein Admin! 
                        Backend Functions können nur von Admins erstellt werden.
                        Kontaktieren Sie bitte den App-Besitzer, um Admin-Rechte zu erhalten.
                    </AlertDescription>
                </Alert>
            )}

            {/* Schritt 1: Dashboard öffnen */}
            <Card className="border-2 border-blue-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Badge className="bg-blue-600 text-white text-lg px-4 py-2">SCHRITT 1</Badge>
                        Dashboard öffnen
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription>
                            <strong>WO?</strong> In einem neuen Browser-Tab
                        </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-2">
                        <p className="text-slate-700 dark:text-slate-300">
                            1. Öffnen Sie in einem <strong>NEUEN TAB</strong>: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">https://mimitech.com/dashboard</code>
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                            2. Oder klicken Sie oben rechts auf <strong>"Dashboard"</strong>
                        </p>
                    </div>

                    <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open('https://mimitech.com/dashboard', '_blank')}
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Dashboard in neuem Tab öffnen
                    </Button>
                </CardContent>
            </Card>

            {/* Schritt 2: Code → Functions */}
            <Card className="border-2 border-purple-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Badge className="bg-purple-600 text-white text-lg px-4 py-2">SCHRITT 2</Badge>
                        Zum Functions-Bereich navigieren
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <p className="text-slate-700 dark:text-slate-300">
                            Im Dashboard (das Sie gerade geöffnet haben):
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
                            <li>Finden Sie in der <strong>linken Sidebar</strong> den Menüpunkt <strong>"Code"</strong></li>
                            <li>Klicken Sie auf <strong>"Code"</strong></li>
                            <li>Es öffnet sich ein Untermenü</li>
                            <li>Klicken Sie auf <strong>"Functions"</strong></li>
                        </ol>
                    </div>

                    <Alert>
                        <Code className="h-4 w-4" />
                        <AlertDescription>
                            Sie sollten jetzt eine Seite sehen mit der Überschrift "Backend Functions" 
                            und einem Button <strong>"+ New Function"</strong>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            {/* Schritt 3: Functions erstellen */}
            <Card className="border-2 border-green-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Badge className="bg-green-600 text-white text-lg px-4 py-2">SCHRITT 3</Badge>
                        4 Functions erstellen (nacheinander)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertDescription>
                            <strong>WICHTIG:</strong> Erstellen Sie ALLE 4 Functions nacheinander. 
                            Für jede Function: Code kopieren → New Function → Einfügen → Save
                        </AlertDescription>
                    </Alert>

                    {Object.entries(functions).map(([name, code], index) => (
                        <div key={name} className="border-2 border-slate-200 dark:border-slate-700 rounded-lg p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Badge className="bg-slate-600 text-white">Function {index + 1}/4</Badge>
                                    {name}
                                </h3>
                                <Button
                                    onClick={() => copyToClipboard(code, name)}
                                    variant={copiedCode === name ? "default" : "outline"}
                                >
                                    {copiedCode === name ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                            Kopiert!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4 mr-2" />
                                            Code kopieren
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="space-y-3 text-sm">
                                <p className="font-semibold text-slate-700 dark:text-slate-300">GENAU SO VORGEHEN:</p>
                                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
                                    <li>Klicken Sie oben auf "<strong>Code kopieren</strong>"</li>
                                    <li>Gehen Sie zurück zum Dashboard-Tab</li>
                                    <li>Klicken Sie auf "<strong>+ New Function</strong>"</li>
                                    <li>Geben Sie als Name ein: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{name}</code></li>
                                    <li>Löschen Sie den Beispiel-Code im Editor</li>
                                    <li>Fügen Sie den kopierten Code ein (Strg+V / Cmd+V)</li>
                                    <li>Klicken Sie auf "<strong>Save</strong>" (oben rechts)</li>
                                    <li>Warten Sie bis "Saved successfully" erscheint</li>
                                </ol>
                            </div>

                            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs max-h-32">
                                <code>{code.substring(0, 200)}...</code>
                            </pre>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Schritt 4: Environment Variables */}
            <Card className="border-2 border-orange-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Badge className="bg-orange-600 text-white text-lg px-4 py-2">SCHRITT 4</Badge>
                        Environment Variables setzen
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                            Die Backend Functions benötigen 4 Secrets von Stripe
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                        <p className="font-semibold">Im Dashboard:</p>
                        <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
                            <li>Gehen Sie zu <strong>Settings</strong> (linke Sidebar)</li>
                            <li>Klicken Sie auf <strong>Environment Variables</strong></li>
                            <li>Fügen Sie folgende 4 Variablen hinzu:</li>
                        </ol>

                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg space-y-2 text-sm">
                            <div><strong>STRIPE_SECRET_KEY</strong> = sk_live_... (von Stripe Dashboard)</div>
                            <div><strong>STRIPE_WEBHOOK_SECRET</strong> = whsec_... (von Stripe Webhooks)</div>
                            <div><strong>STRIPE_PREMIUM_PRICE_ID</strong> = price_... (Premium Produkt)</div>
                            <div><strong>STRIPE_PRO_PRICE_ID</strong> = price_... (Pro Produkt)</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Fertig! */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Geschafft! 🎉
                            </h2>
                            <p className="text-slate-700 dark:text-slate-300 mt-2">
                                Sobald alle 4 Functions erstellt sind, ist Stripe vollständig integriert 
                                und die Pricing-Seite funktioniert automatisch!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}