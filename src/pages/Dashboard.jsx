import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User } from "@/api/entities";
import { Abrechnung } from "@/api/entities";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Plus,
    Euro,
    Clock,
    Activity,
    Sparkles,
    ShieldCheck
} from "lucide-react";
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import ErrorState from "@/components/ui/ErrorState";
import TypingHeadline from "@/components/ui/TypingHeadline";
import MagneticButton from "@/components/ui/MagneticButton";
import DashboardAnimation from "@/components/animations/DashboardAnimation";
import SpotlightCard from "@/components/ui/SpotlightCard";
import DashboardMobileShell from "@/components/dashboard/mobile/DashboardMobileShell";
import DashboardBottomNav from "@/components/dashboard/mobile/DashboardBottomNav";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { LazySection } from "@/components/ui/LazySection";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Lazy load heavy components
const FlowDiagram3D = lazy(() => import("@/components/3d/FlowDiagram3D"));
const DashboardTabs = lazy(() => import("@/components/dashboard/DashboardTabs"));

gsap.registerPlugin(ScrollTrigger);

import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const { t } = useTranslation();
    const { isMobile, isDesktop } = useBreakpoint();
    const { isOnline } = useNetworkStatus();
    const prefersReducedMotion = usePrefersReducedMotion();
    const [user, setUser] = useState(null);
    const [abrechnungen, setAbrechnungen] = useState([]);
    const [cachedAbrechnungen, setCachedAbrechnungen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const heroRef = useRef(null);

    const loadData = async (useCache = false) => {
        if (!isOnline && useCache) {
            setAbrechnungen(cachedAbrechnungen);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const userPromise = User.me();
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout beim Laden der Benutzerdaten')), 10000)
            );
            
            const currentUser = await Promise.race([userPromise, timeoutPromise]);
            
            setUser(currentUser);

            try {
                const abrechnungenPromise = Abrechnung.list({ orderBy: 'created_date', ascending: false, limit: 10 });
                const abrechnungenTimeout = new Promise((resolve) => 
                    setTimeout(() => resolve([]), 10000)
                );
                const userAbrechnungen = await Promise.race([abrechnungenPromise, abrechnungenTimeout]);
                setAbrechnungen(userAbrechnungen || []);
                setCachedAbrechnungen(userAbrechnungen || []);
            } catch (abrErr) {
                console.warn('Dashboard: Abrechnungen konnten nicht geladen werden:', abrErr);
                if (cachedAbrechnungen.length > 0) {
                    setAbrechnungen(cachedAbrechnungen);
                } else {
                    setAbrechnungen([]);
                }
            }
        } catch (error) {
            console.error("Dashboard: Fehler beim Laden:", error);
            if (!isOnline && cachedAbrechnungen.length > 0) {
                setAbrechnungen(cachedAbrechnungen);
            } else {
                setError("Dashboard konnte nicht geladen werden. Bitte überprüfen Sie Ihre Internetverbindung.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isOnline && cachedAbrechnungen.length > 0) {
            loadData(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnline]);

    // GSAP ScrollTrigger for Hero Section (Desktop only, skip if reduced motion)
    useEffect(() => {
        if (!heroRef.current || !isDesktop || isLoading || prefersReducedMotion) return;

        gsap.to(".hero-content", {
            y: 50,
            opacity: 0.7,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        gsap.fromTo(".stats-card",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".stats-grid",
                    start: "top 80%",
                },
            }
        );

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, [isLoading, isDesktop, prefersReducedMotion]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('dashboard.greeting.morning', 'Guten Morgen');
        if (hour < 18) return t('dashboard.greeting.day', 'Guten Tag');
        return t('dashboard.greeting.evening', 'Guten Abend');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'abgeschlossen':
                return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'in_bearbeitung':
                return <Clock className="w-4 h-4 text-blue-400 animate-spin" />;
            case 'fehler':
                return <AlertCircle className="w-4 h-4 text-red-400" />;
            default:
                return <Clock className="w-4 h-4 text-slate-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'abgeschlossen':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'in_bearbeitung':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'fehler':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'abgeschlossen': return t('dashboard.status.completed', 'Abgeschlossen');
            case 'in_bearbeitung': return t('dashboard.status.processing', 'In Bearbeitung');
            case 'wartend': return t('dashboard.status.pending', 'Wartend');
            case 'fehler': return t('dashboard.status.error', 'Fehler');
            default: return status;
        }
    };

    if (isLoading) {
        return (
            <div className="h-full w-full bg-slate-950 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <DashboardAnimation />
                </div>
                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-white mb-2">Dashboard wird geladen</h2>
                    <p className="text-slate-400">Ihre Daten werden sicher entschlüsselt...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadData} fullScreen />;
    }

    return (
        <div className="h-full w-full bg-transparent text-white relative">
            {/* Offline Banner */}
            <OfflineBanner />

            {/* Background Animation - Skip on mobile or reduced motion */}
            {(!isMobile && !prefersReducedMotion) && (
                <div className="absolute inset-0 z-0">
                    <Suspense fallback={<div className="w-full h-full bg-slate-950" />}>
                        <DashboardAnimation />
                    </Suspense>
                </div>
            )}

            {/* Main Content wrapped in Mobile Shell */}
            <DashboardMobileShell>
                {/* Hero Section - Mobile First */}
                <section 
                    id="hero"
                    ref={heroRef} 
                    className="relative pt-8 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-32 overflow-hidden"
                >
                <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Pre-Headline Badge - Upload Style */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4 sm:mb-6">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{t('dashboard.hero.secure', 'Sicher & Verschlüsselt')}</span>
                        </div>

                        {/* Hero Headline with Typing Effect */}
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 sm:mb-6 font-heading">
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                <TypingHeadline />
                            </span>
                            <br />
                            <span className="text-white">{t('dashboard.hero.easy', 'leicht gemacht')}</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-base sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
                            {getGreeting()}{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}.<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>
                            {t('dashboard.hero.subtitle', 'MiMiCheck analysiert Ihre Dokumente mit KI.')}
                        </p>

                        {/* CTA Buttons - Mobile First Stack */}
                        <div className="flex flex-col gap-3 md:flex-row md:gap-4 justify-center mb-8 md:mb-16">
                            <MagneticButton
                                onClick={() => navigate(createPageUrl("Upload"))}
                                data-cursor-text={t('dashboard.hero.ctaUpload', 'Upload starten')}
                                size="touch"
                                className="w-full md:w-auto rounded-2xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all duration-300"
                            >
                                <Plus className="w-5 h-5 mr-2 inline" />
                                {t('dashboard.hero.ctaUpload', 'Neue Abrechnung')}
                            </MagneticButton>
                            <MagneticButton
                                onClick={() => navigate(createPageUrl("Antraege"))}
                                data-cursor-text={t('dashboard.hero.ctaAntraege', 'Anträge ansehen')}
                                size="touch"
                                className="w-full md:w-auto rounded-2xl font-semibold border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-white"
                            >
                                <FileText className="w-5 h-5 mr-2 inline" />
                                {t('dashboard.hero.ctaAntraege', 'Meine Anträge')}
                            </MagneticButton>
                            {user?.subscription_tier === 'free' && (
                                <MagneticButton
                                    onClick={() => navigate(createPageUrl("Pricing"))}
                                    data-cursor-text="Premium upgraden"
                                    size="touch"
                                    className="w-full md:w-auto rounded-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25 transition-all duration-300 animate-pulse"
                                >
                                    <Sparkles className="w-5 h-5 mr-2 inline" />
                                    Premium upgraden
                                </MagneticButton>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Flow Diagram - Desktop Only (Lazy loaded with IntersectionObserver) */}
            {isDesktop && !prefersReducedMotion && (
                <LazySection 
                    fallback={<div className="h-48 bg-slate-900/20 rounded-xl animate-pulse" />}
                    className="relative z-10 mb-12 lg:mb-20"
                >
                    <FlowDiagram3D />
                </LazySection>
            )}

            {/* Stats Grid - Mobile First */}
            <section 
                id="stats"
                className="stats-grid relative z-10 max-w-7xl mx-auto py-6 md:py-8 lg:py-16"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* Quick Stats Cards */}
                    <motion.div className="stats-card">
                        <SpotlightCard className="h-full p-1 border-white/10 overflow-hidden" spotlightColor="rgba(59, 130, 246, 0.15)">
                            <div className="bg-slate-900/50 rounded-xl p-6 h-full backdrop-blur-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-500/10 rounded-xl">
                                        <FileText className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <span className="text-xs font-mono text-blue-300 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                                        {t('dashboard.stats.total', 'GESAMT')}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-white mb-1">
                                        {abrechnungen.length}
                                    </h3>
                                    <p className="text-slate-400">{t('dashboard.stats.abrechnungen', 'Abrechnungen')}</p>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div className="stats-card">
                        <SpotlightCard className="h-full p-1 border-white/10 overflow-hidden" spotlightColor="rgba(168, 85, 247, 0.15)">
                            <div className="bg-slate-900/50 rounded-xl p-6 h-full backdrop-blur-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-500/10 rounded-xl">
                                        <Activity className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                                        {t('dashboard.stats.active', 'AKTIV')}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-white mb-1">
                                        {abrechnungen.filter(a => a.status === 'in_bearbeitung').length}
                                    </h3>
                                    <p className="text-slate-400">{t('dashboard.stats.processing', 'In Bearbeitung')}</p>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div className="stats-card">
                        <SpotlightCard className="h-full p-1 border-white/10 overflow-hidden" spotlightColor="rgba(16, 185, 129, 0.15)">
                            <div className="bg-slate-900/50 rounded-xl p-6 h-full backdrop-blur-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                                        <Euro className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                                        {t('dashboard.stats.potential', 'POTENZIAL')}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold text-white mb-1">
                                        ~2.500€
                                    </h3>
                                    <p className="text-slate-400">{t('dashboard.stats.savings', 'Ø Ersparnis/Jahr')}</p>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </section>

            {/* Profile & Anträge Tabs - Mobile First (Lazy loaded with IntersectionObserver) */}
            <LazySection
                fallback={
                    <div className="relative z-10 max-w-7xl mx-auto py-6 md:py-8 lg:py-16">
                        <div className="h-64 bg-slate-900/20 rounded-xl animate-pulse" />
                    </div>
                }
                className="relative z-10 max-w-7xl mx-auto py-6 md:py-8 lg:py-16"
            >
                <section id="tabs">
                    <div className="mb-4 md:mb-6 lg:mb-8">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-heading mb-2">
                            {t('dashboard.tabs.title', 'Dein Förder-Cockpit')}
                        </h2>
                        <p className="text-sm md:text-base text-slate-400">
                            {t('dashboard.tabs.subtitle', 'Profil ausfüllen, AI-Analyse starten, passende Anträge finden.')}
                        </p>
                    </div>
                    <DashboardTabs />
                </section>
            </LazySection>

            {/* Recent Activity - Mobile First */}
            <section 
                id="activity"
                className="relative z-10 max-w-7xl mx-auto py-6 md:py-8 lg:py-16"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">{t('dashboard.activity.title', 'Letzte Aktivitäten')}</h2>
                    <Button variant="ghost" onClick={() => navigate(createPageUrl("Abrechnungen"))} className="text-slate-400 hover:text-white w-full sm:w-auto justify-center sm:justify-start">
                        {t('dashboard.activity.viewAll', 'Alle anzeigen')} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    {abrechnungen.length === 0 ? (
                        <SpotlightCard className="p-1 border-white/10 overflow-hidden" spotlightColor="rgba(255, 255, 255, 0.05)">
                            <div className="bg-slate-900/50 rounded-xl p-12 text-center backdrop-blur-sm">
                                <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                <p className="text-xl font-medium text-white mb-2">{t('dashboard.activity.emptyTitle', 'Noch keine Abrechnungen')}</p>
                                <p className="text-sm text-slate-400 mb-6">
                                    {t('dashboard.activity.emptyText', 'Starten Sie jetzt und lassen Sie uns Ihre Dokumente analysieren!')}
                                </p>
                                <Button 
                                    onClick={() => navigate(createPageUrl("Upload"))} 
                                    size="touch"
                                    className="bg-blue-600 hover:bg-blue-500 text-white w-full md:w-auto"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    {t('dashboard.activity.createFirst', 'Erste Abrechnung erstellen')}
                                </Button>
                            </div>
                        </SpotlightCard>
                    ) : (
                        abrechnungen.slice(0, 5).map((abrechnung) => (
                            <motion.div
                                key={abrechnung.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ scale: 1.005 }}
                                transition={{ duration: 0.2 }}
                            >
                                <SpotlightCard
                                    className="cursor-pointer group p-1 border-white/10 overflow-hidden"
                                    spotlightColor="rgba(59, 130, 246, 0.1)"
                                >
                                    <div
                                        className="bg-slate-900/50 rounded-xl p-6 backdrop-blur-sm flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                                        onClick={() => navigate(createPageUrl("Bericht", { id: abrechnung.id }))}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${abrechnung.status === 'abgeschlossen' ? 'bg-emerald-500/10' :
                                                abrechnung.status === 'in_bearbeitung' ? 'bg-blue-500/10' :
                                                    'bg-slate-800'
                                                }`}>
                                                {getStatusIcon(abrechnung.status)}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                    {abrechnung.filename || `Abrechnung ${abrechnung.id.slice(0, 8)}`}
                                                </h3>
                                                <p className="text-sm text-slate-400">
                                                    {abrechnung.created_at && format(new Date(abrechnung.created_at), 'dd. MMMM yyyy', { locale: de })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge className={`${getStatusColor(abrechnung.status)} border bg-transparent`}>
                                                {getStatusText(abrechnung.status)}
                                            </Badge>
                                            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>
            </DashboardMobileShell>

            {/* Mobile Bottom Navigation */}
            {isMobile && <DashboardBottomNav />}
        </div>
    );
}