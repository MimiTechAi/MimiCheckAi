import { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Loader2, AlertCircle, CheckCircle, Zap, Crown, Shield, Star, Rocket } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createStripeCheckoutSession, createCustomerPortalSession } from '@/api/functions';
import { useTranslation } from 'react-i18next';

const pricingPlans = [
    {
        id: 'free',
        title: 'Basis-Check',
        subtitle: 'Für den Einstieg',
        price: '€0',
        icon: Shield,
        color: 'slate',
        features: [
            '1x Förderprüfung (alle 3 Monate)',
            '1x Nebenkostenprüfung (alle 6 Monate)',
            'Basis KI-Assistent (5 Fragen/Tag)',
            'Ergebnisse nur anzeigen (kein Export)'
        ],
        recommended: false
    },
    {
        id: 'premium',
        title: 'Staatshilfen+',
        subtitle: 'Alles was du brauchst',
        price: '€14.99',
        priceId: 'price_1SacLbGX9ckbY2L6ejmsITKD',
        icon: Crown,
        color: 'emerald',
        features: [
            '50 Förderprüfungen pro Monat',
            '10 Nebenkostenprüfungen pro Monat',
            'Priority KI-Assistent (100 Fragen/Tag)',
            'PDF-Reports & Musterbriefe',
            'Automatische Antragsassistenz',
            'Widerspruchs-Wizard'
        ],
        recommended: true
    },
    {
        id: 'pro',
        title: 'Haushalt-Optimierer',
        subtitle: 'Maximale Power',
        price: '€29.99',
        priceId: 'price_1SacN7GX9ckbY2L68BctYrGk',
        icon: Rocket,
        color: 'purple',
        features: [
            'Alle Features von Premium',
            'Familienmitglieder verwalten (bis 4 Profile)',
            'Rechtliche Erstberatung (1x/Monat)',
            'Steueroptimierungs-KI',
            'Persönlicher KI-Agent für komplexe Fälle',
            'WhatsApp & Telefon-Support'
        ],
        recommended: false
    }
];

export default function Pricing() {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [showPortalSetupGuide, setShowPortalSetupGuide] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        User.me().then(user => {
            setUser(user);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));

        const paymentStatus = searchParams.get('payment');
        if (paymentStatus === 'success') {
            setError(null);
            setTimeout(() => navigate(createPageUrl('Dashboard')), 2000);
        } else if (paymentStatus === 'cancelled') {
            setError('Zahlung wurde abgebrochen. Sie können es jederzeit erneut versuchen.');
        }
    }, [searchParams, navigate]);

    const handleSelectPlan = async (planId) => {
        if (!user) {
            navigate(createPageUrl('Auth'));
            return;
        }

        if (planId === 'free') {
            handleManageSubscription();
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const response = await createStripeCheckoutSession({
                planId,
                successUrl: `${window.location.origin}${createPageUrl('Pricing')}?payment=success`,
                cancelUrl: `${window.location.origin}${createPageUrl('Pricing')}?payment=cancelled`
            });

            if (response.error || !response.data?.checkoutUrl) {
                throw new Error(response.error || 'Fehler beim Laden der Checkout-URL');
            }

            window.location.href = response.data.checkoutUrl;

        } catch (error) {
            console.error('Checkout Error:', error);
            setError(`Fehler: ${error.message}`);
            setIsProcessing(false);
        }
    };

    const handleManageSubscription = async () => {
        if (!user || !user.stripe_customer_id) {
            setError('Keine aktive Subscription gefunden.');
            return;
        }

        setIsProcessing(true);
        setError(null);
        setShowPortalSetupGuide(false);

        try {
            const response = await createCustomerPortalSession({ returnUrl: window.location.href });

            if (response.data?.error === 'STRIPE_CUSTOMER_PORTAL_NOT_CONFIGURED') {
                setShowPortalSetupGuide(true);
                throw new Error(response.data.message);
            }

            if (!response.data?.portalUrl) throw new Error('Keine Portal URL erhalten');

            window.location.href = response.data.portalUrl;

        } catch (error) {
            console.error('Portal Error:', error);
            setError(`Fehler: ${error.message}`);
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen bg-slate-950"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">
            {/* Hero Header */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-950 to-emerald-900/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-slate-950 to-slate-950" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-6 backdrop-blur-md">
                        <Zap className="w-4 h-4" />
                        Flexible Tarife für jeden Bedarf
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 mt-2">
                        Investiere in deine <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Rechte</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Wähle den passenden Plan und hole das Maximum aus deinen Ansprüchen heraus.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
                {error && (
                    <Alert variant="destructive" className="mb-8 bg-red-900/20 border-red-500/50 text-red-200">
                        <AlertCircle className="h-4 h-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {searchParams.get('payment') === 'success' && (
                    <Alert className="mb-8 bg-emerald-900/20 border-emerald-500/50 text-emerald-300">
                        <CheckCircle className="h-4 h-4" />
                        <AlertDescription>Zahlung erfolgreich! Willkommen an Bord.</AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`relative border transition-all duration-300 backdrop-blur-xl group overflow-hidden ${plan.recommended
                                    ? 'bg-slate-900/60 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.1)] scale-105 z-10'
                                    : 'bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/60'
                                }`}
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
                            )}

                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`p-3 rounded-xl bg-${plan.color}-500/10 text-${plan.color}-400`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    {plan.recommended && (
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20 shadow-sm">
                                            Empfohlen
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                                <p className="text-slate-400 text-sm h-10">{plan.subtitle}</p>

                                <div className="my-8">
                                    <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                                    {plan.id !== 'free' && <span className="text-slate-500 ml-2">/ Monat</span>}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                            <CheckCircle className={`w-5 h-5 shrink-0 ${plan.recommended ? 'text-emerald-400' : 'text-slate-500'}`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    onClick={() => handleSelectPlan(plan.id)}
                                    disabled={isProcessing || user?.subscription_tier === plan.id}
                                    className={`w-full py-6 font-semibold rounded-xl transition-all ${plan.recommended
                                            ? 'bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white shadow-lg shadow-emerald-500/20 border-0'
                                            : user?.subscription_tier === plan.id
                                                ? 'bg-white/10 text-slate-400 cursor-not-allowed border border-white/5'
                                                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                        }`}
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : user?.subscription_tier === plan.id ? (
                                        'Dein aktueller Plan'
                                    ) : (
                                        plan.id === 'free' ? 'Zu Basic wechseln' : 'Jetzt starten'
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center border-t border-white/5 pt-12">
                    <p className="text-slate-500 mb-6">Wir akzeptieren</p>
                    <div className="flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                        {/* Simple placeholder icons/text for payment methods */}
                        <span className="font-bold text-xl text-white">VISA</span>
                        <span className="font-bold text-xl text-white">Mastercard</span>
                        <span className="font-bold text-xl text-white">PayPal</span>
                        <span className="font-bold text-xl text-white">Apple Pay</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
