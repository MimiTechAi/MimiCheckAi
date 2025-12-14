import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserProfile } from '@/components/UserProfileContext.jsx';
import { supabase } from '@/api/supabaseClient';
import AntragsService from '@/services/AntragsService';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnalysisAnimation from "@/components/animations/AnalysisAnimation";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
    FileText,
    Euro,
    Baby,
    Home,
    GraduationCap,
    Heart,
    Search,
    ArrowRight,
    AlertCircle,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { track, AREA, SEVERITY } from '@/components/core/telemetry';

const CATEGORY_STYLES = {
    'social': { icon: Euro, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    'family': { icon: Baby, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    'housing': { icon: Home, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    'education': { icon: GraduationCap, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    'retirement': { icon: Heart, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    'health': { icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' }
};

// Map program names to categories
const mapProgramToCategory = (programName) => {
    const name = programName.toLowerCase();
    if (name.includes('wohngeld') || name.includes('wohn') || name.includes('miete')) return 'housing';
    if (name.includes('kindergeld') || name.includes('elterngeld') || name.includes('kind') || name.includes('familie')) return 'family';
    if (name.includes('bafög') || name.includes('bildung') || name.includes('ausbildung') || name.includes('student')) return 'education';
    if (name.includes('rente') || name.includes('pension') || name.includes('alter')) return 'retirement';
    if (name.includes('pflege') || name.includes('kranken') || name.includes('gesundheit')) return 'health';
    return 'social'; // Default: Bürgergeld, Sozialhilfe, etc.
};

const mapProgramToCanonicalId = (programName = '') => {
    const name = String(programName).toLowerCase();
    if (name.includes('wohngeld')) return 'wohngeld';
    if (name.includes('kindergeld')) return 'kindergeld';
    if (name.includes('bürgergeld') || name.includes('buergergeld')) return 'buergergeld';
    if (name.includes('bafög') || name.includes('bafoeg')) return 'bafoeg';
    return programName.toLowerCase().replace(/\s+/g, '-');
};

export default function Antraege() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user: userProfile, isLoading: profileLoading } = useUserProfile();
    const [recommendations, setRecommendations] = useState(null);
    const [error, setError] = useState(null);

    const handleStartAntrag = (programId) => {
        track('funnel.started_antrag', AREA.APPLICATION, { program_id: programId }, SEVERITY.MEDIUM);
        navigate(`/PdfAutofill?type=${encodeURIComponent(programId)}`);
    };

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!profileLoading) {
            loadRecommendations();
        }
    }, [userProfile, profileLoading, t]); // Reload when language changes

    const loadRecommendations = async () => {
        // Simulate loading delay for smoother UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // Check if user has completed onboarding (has basic profile data)
        const hasProfile = userProfile && (userProfile.vorname || userProfile.name || userProfile.onboarding_completed_at);
        
        if (!hasProfile) {
            setLoading(false);
            return;
        }

        const localEvaluations = (() => {
            try {
                return AntragsService.evaluateEligibilityAll(userProfile);
            } catch (e) {
                console.warn('Eligibility Fallback Error:', e);
                return [];
            }
        })();

        const localPrograms = localEvaluations.map((a) => ({
            id: a.id,
            name: a.name,
            category: mapProgramToCategory(a.name),
            description: a.reasoning || a.description || '',
            confidence: Math.max(0, Math.min(100, Number(a.eligibilityScore ?? 0))),
            estimatedAmount: a.estimatedAmount ? `~${a.estimatedAmount}€` : '',
            processingTime: a.processingTime || '1-3 Monate',
            downloadUrl: a.pdfUrl || '',
            requiredDocuments: [],
            nextSteps: [],
            missingData: a.missingData || [],
            eligibilityStatus: a.eligibilityStatus || 'unknown'
        })).filter(p => p.eligibilityStatus !== 'ineligible');

        try {
            const { data, error } = await supabase.functions.invoke('analyze-eligibility', {
                body: { userProfile }
            });

            if (error) throw error;
            
            // Transform API response to expected format
            if (data?.analysis?.eligiblePrograms) {
                const transformedPrograms = data.analysis.eligiblePrograms.map(program => ({
                    id: mapProgramToCanonicalId(program.programName),
                    name: program.programName,
                    category: mapProgramToCategory(program.programName),
                    description: program.reasoning,
                    confidence: program.eligibilityScore,
                    estimatedAmount: `~${program.estimatedAmount}€`,
                    processingTime: '1-3 Monate',
                    downloadUrl: program.officialLink,
                    requiredDocuments: program.requiredDocuments || [],
                    nextSteps: program.nextSteps || []
                }));

                const apiById = new Map(transformedPrograms.map(p => [p.id, p]));
                const merged = localPrograms.map(lp => {
                    const ap = apiById.get(lp.id);
                    if (!ap) return lp;
                    return {
                        ...lp,
                        name: ap.name || lp.name,
                        category: ap.category || lp.category,
                        description: ap.description || lp.description,
                        confidence: Math.max(lp.confidence ?? 0, Number(ap.confidence ?? 0)),
                        estimatedAmount: ap.estimatedAmount || lp.estimatedAmount,
                        processingTime: ap.processingTime || lp.processingTime,
                        downloadUrl: ap.downloadUrl || lp.downloadUrl,
                        requiredDocuments: ap.requiredDocuments || lp.requiredDocuments,
                        nextSteps: ap.nextSteps || lp.nextSteps
                    };
                });

                const localIds = new Set(localPrograms.map(p => p.id));
                const apiOnly = transformedPrograms
                    .filter(p => !localIds.has(p.id))
                    .map(p => ({
                        ...p,
                        missingData: [],
                        eligibilityStatus: 'eligible'
                    }));
                
                setRecommendations({ 
                    programs: [...merged, ...apiOnly],
                    totalBenefit: data.analysis.estimatedTotalMonthlyBenefit,
                    recommendations: data.analysis.recommendations
                });
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Fehler beim Laden der Empfehlungen:', err);
            console.log('⚠️ Edge Function nicht verfügbar. Verwende lokale Eligibility.');
            setRecommendations({
                programs: localPrograms
            });
        } finally {
            setLoading(false);
        }
    };

    const filteredPrograms = recommendations?.programs.filter(program => {
        const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
        const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    }) || [];

    const topPicks = (selectedCategory === 'all' && !searchTerm)
        ? (recommendations?.programs || []).filter(p => (p.missingData?.length || 0) === 0).slice(0, 3)
        : [];

    const topPickIds = new Set(topPicks.map(p => p.id));
    const remainingPrograms = filteredPrograms.filter(p => !topPickIds.has(p.id));

    return (
        <div className="min-h-full w-full bg-transparent text-white relative">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <AnalysisAnimation />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight font-heading">
                            {t('antraegePage.title').split(' ')[0]} <span className="text-emerald-400">{t('antraegePage.title').split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            {t('antraegePage.subtitle')}
                        </p>
                    </motion.div>
                </div>

                {/* No Profile Warning */}
                {!loading && (!userProfile || (!userProfile.vorname && !userProfile.name && !userProfile.onboarding_completed_at)) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <SpotlightCard className="p-8 text-center border-orange-500/30" spotlightColor="rgba(249, 115, 22, 0.15)">
                            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2 text-white">{t('antraegePage.noProfile.title')}</h3>
                            <p className="text-slate-400 mb-6">
                                {t('antraegePage.noProfile.text')}
                            </p>
                            <Button
                                onClick={() => navigate('/onboarding')}
                                className="bg-orange-600 hover:bg-orange-500 text-white"
                            >
                                {t('antraegePage.noProfile.button')}
                                <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                        </SpotlightCard>
                    </motion.div>
                )}

                {/* Search & Filter */}
                <div className="mb-12 space-y-6">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t('antraegePage.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all backdrop-blur-sm"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                }`}
                        >
                            {t('antraegePage.filter.all')}
                        </button>
                        {Object.keys(CATEGORY_STYLES).map(categoryId => (
                            <button
                                key={categoryId}
                                onClick={() => setSelectedCategory(categoryId)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === categoryId
                                    ? 'bg-white text-slate-900'
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                    }`}
                            >
                                {t(`antraegePage.categories.${categoryId}`)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {topPicks.length > 0 && (
                            <div>
                                <div className="flex items-end justify-between mb-5">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">Top Empfehlungen</h2>
                                        <p className="text-slate-400 text-sm mt-1">Die besten nächsten Schritte basierend auf deinem Profil</p>
                                    </div>
                                    <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">SOTA 2025</Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <AnimatePresence>
                                        {topPicks.map((program, index) => {
                                            const categoryStyle = CATEGORY_STYLES[program.category] || { icon: FileText, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
                                            const Icon = categoryStyle.icon;

                                            return (
                                                <motion.div
                                                    key={`top-${program.id}`}
                                                    initial={{ opacity: 0, y: 16 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    transition={{ delay: index * 0.06 }}
                                                >
                                                    <SpotlightCard className="h-full flex flex-col p-6 group cursor-pointer border-emerald-500/20" spotlightColor="rgba(16, 185, 129, 0.18)">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className={`p-3 rounded-xl ${categoryStyle.bg} ${categoryStyle.color}`}>
                                                                <Icon className="w-6 h-6" />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Badge className="bg-white/5 text-slate-200 border border-white/10">Top</Badge>
                                                                <Badge variant="outline" className={`${categoryStyle.border} ${categoryStyle.color} bg-transparent`}>
                                                                    {`${program.confidence}% ${t('antraegePage.card.match')}`}
                                                                </Badge>
                                                            </div>
                                                        </div>

                                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                                            {program.name}
                                                        </h3>
                                                        <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                                                            {program.description}
                                                        </p>

                                                        <div className="space-y-4 mt-auto">
                                                            <div className="flex items-center justify-between text-sm border-t border-white/5 pt-4">
                                                                <span className="text-slate-500">{t('antraegePage.card.amount')}</span>
                                                                <span className="text-emerald-400 font-mono font-bold">{program.estimatedAmount}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-slate-500">{t('antraegePage.card.duration')}</span>
                                                                <span className="text-white">{program.processingTime}</span>
                                                            </div>

                                                            <Button
                                                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all mt-4"
                                                                onClick={() => handleStartAntrag(program.id)}
                                                            >
                                                                {t('antraegePage.card.button')}
                                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                            </Button>
                                                        </div>
                                                    </SpotlightCard>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {remainingPrograms.map((program, index) => {
                                const categoryStyle = CATEGORY_STYLES[program.category] || { icon: FileText, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
                                const Icon = categoryStyle.icon;
                                const hasMissing = (program.missingData?.length || 0) > 0;

                                return (
                                    <motion.div
                                        key={program.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <SpotlightCard className="h-full flex flex-col p-6 group cursor-pointer border-white/10" spotlightColor="rgba(16, 185, 129, 0.15)">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 rounded-xl ${categoryStyle.bg} ${categoryStyle.color}`}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <Badge variant="outline" className={`${categoryStyle.border} ${categoryStyle.color} bg-transparent`}>
                                                    {hasMissing ? `Daten fehlen (${program.missingData.length})` : `${program.confidence}% ${t('antraegePage.card.match')}`}
                                                </Badge>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                                {program.name}
                                            </h3>
                                            <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                                                {program.description}
                                            </p>

                                            {hasMissing && (
                                                <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-4">
                                                    <div className="text-xs text-slate-400 mb-2">Fehlende Angaben:</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {program.missingData.slice(0, 4).map((m) => (
                                                            <span key={m} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200">
                                                                {m}
                                                            </span>
                                                        ))}
                                                        {program.missingData.length > 4 && (
                                                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                                                                +{program.missingData.length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-4 mt-auto">
                                                <div className="flex items-center justify-between text-sm border-t border-white/5 pt-4">
                                                    <span className="text-slate-500">{t('antraegePage.card.amount')}</span>
                                                    <span className="text-emerald-400 font-mono font-bold">{program.estimatedAmount}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-500">{t('antraegePage.card.duration')}</span>
                                                    <span className="text-white">{program.processingTime}</span>
                                                </div>

                                                {hasMissing ? (
                                                    <Button
                                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all mt-4"
                                                        onClick={() => navigate('/profilseite')}
                                                    >
                                                        Fehlende Angaben ergänzen
                                                        <ChevronRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all mt-4"
                                                        onClick={() => handleStartAntrag(program.id)}
                                                    >
                                                        {t('antraegePage.card.button')}
                                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                )}
                                            </div>
                                        </SpotlightCard>
                                    </motion.div>
                                );
                            })}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
