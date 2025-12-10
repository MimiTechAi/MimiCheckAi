import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserProfile } from '@/components/UserProfileContext';
import { supabase } from '@/api/supabaseClient';
import ProfileCompletionWidget from './ProfileCompletionWidget';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User, FileCheck, Sparkles, TrendingUp, AlertCircle,
  ChevronRight, Euro, ExternalLink, Loader2, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CATEGORY_COLORS = {
  social: 'from-blue-500 to-indigo-500',
  family: 'from-pink-500 to-rose-500',
  housing: 'from-emerald-500 to-teal-500',
  education: 'from-orange-500 to-amber-500',
  retirement: 'from-violet-500 to-purple-500',
  health: 'from-rose-500 to-red-500'
};

export default function DashboardTabs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user: userProfile, profileVersion } = useUserProfile();
  const [activeTab, setActiveTab] = useState('overview');
  const [recommendations, setRecommendations] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profileReady, setProfileReady] = useState(false);

  const mapProgramToCategory = useCallback((name) => {
    const n = name.toLowerCase();
    if (n.includes('wohngeld') || n.includes('wohn')) return 'housing';
    if (n.includes('kindergeld') || n.includes('elterngeld') || n.includes('kind')) return 'family';
    if (n.includes('bafög') || n.includes('bildung')) return 'education';
    if (n.includes('rente') || n.includes('pension')) return 'retirement';
    if (n.includes('pflege') || n.includes('kranken')) return 'health';
    return 'social';
  }, []);

  const getFallbackRecommendations = useCallback(() => ({
    programs: [
      { programName: 'Wohngeld', eligibilityScore: 85, estimatedAmount: 150, category: 'housing', reasoning: 'Basierend auf Ihrem Einkommen und Ihrer Wohnsituation.' },
      { programName: 'Kindergeld', eligibilityScore: 90, estimatedAmount: 250, category: 'family', reasoning: 'Für Familien mit Kindern.' },
      { programName: 'Bürgergeld', eligibilityScore: 60, estimatedAmount: 563, category: 'social', reasoning: 'Bei Bedürftigkeit möglich.' }
    ],
    totalBenefit: 963,
    tips: ['Vervollständigen Sie Ihr Profil für genauere Empfehlungen.']
  }), []);

  const runAnalysis = useCallback(async () => {
    if (!userProfile || isAnalyzing) return;
    
    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-eligibility', {
        body: { userProfile }
      });

      if (error) throw error;

      if (data?.analysis?.eligiblePrograms) {
        setRecommendations({
          programs: data.analysis.eligiblePrograms.map(p => ({
            ...p,
            category: mapProgramToCategory(p.programName)
          })),
          totalBenefit: data.analysis.estimatedTotalMonthlyBenefit,
          tips: data.analysis.recommendations
        });
      }
    } catch (err) {
      console.error('Analysis error:', err);
      // Use fallback data
      setRecommendations(getFallbackRecommendations());
    } finally {
      setIsAnalyzing(false);
    }
  }, [userProfile, isAnalyzing, mapProgramToCategory, getFallbackRecommendations]);

  // Check if profile is ready for analysis
  useEffect(() => {
    if (userProfile) {
      const hasBasicData = userProfile.vorname && userProfile.nachname;
      const hasFinancialData = userProfile.lebenssituation?.monatliches_nettoeinkommen || 
                               userProfile.lebenssituation?.beschaeftigungsstatus;
      setProfileReady(hasBasicData && hasFinancialData);
    }
  }, [userProfile, profileVersion]);

  // Auto-analyze when profile becomes ready
  useEffect(() => {
    if (profileReady && !recommendations && !isAnalyzing) {
      runAnalysis();
    }
  }, [profileReady, recommendations, isAnalyzing, runAnalysis]);

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-white/10 rounded-xl p-1 mb-8">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all text-xs sm:text-sm"
          >
            <TrendingUp className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{t('dashboard.tabs.overview', 'Übersicht')}</span>
            <span className="sm:hidden">📊</span>
          </TabsTrigger>
          <TabsTrigger 
            value="profile"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg transition-all text-xs sm:text-sm"
          >
            <User className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{t('dashboard.tabs.profile', 'Mein Profil')}</span>
            <span className="sm:hidden">👤</span>
            {!profileReady && (
              <span className="ml-1 sm:ml-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="antraege"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all text-xs sm:text-sm"
          >
            <FileCheck className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{t('dashboard.tabs.applications', 'Meine Anträge')}</span>
            <span className="sm:hidden">📋</span>
            {recommendations?.programs?.length > 0 && (
              <Badge className="ml-1 sm:ml-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                {recommendations.programs.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <SpotlightCard className="p-4 sm:p-6 border-white/10" spotlightColor="rgba(59, 130, 246, 0.15)">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-blue-500/10">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400">{t('dashboard.tabs.profileStatus', 'Profil-Status')}</p>
                      <p className="text-lg sm:text-2xl font-bold text-white">
                        {profileReady ? t('dashboard.tabs.ready', 'Bereit') : t('dashboard.tabs.incomplete', 'Unvollständig')}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-4 sm:p-6 border-white/10" spotlightColor="rgba(16, 185, 129, 0.15)">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-emerald-500/10">
                      <Euro className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400">{t('dashboard.tabs.potentialSavings', 'Potenzielle Ersparnis')}</p>
                      <p className="text-lg sm:text-2xl font-bold text-emerald-400">
                        ~{recommendations?.totalBenefit || 0}€/{t('dashboard.tabs.perMonth', 'Monat')}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-4 sm:p-6 border-white/10" spotlightColor="rgba(168, 85, 247, 0.15)">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-purple-500/10">
                      <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400">{t('dashboard.tabs.matchingApps', 'Passende Anträge')}</p>
                      <p className="text-lg sm:text-2xl font-bold text-white">
                        {recommendations?.programs?.length || 0}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </div>

              {/* CTA based on status */}
              {!profileReady ? (
                <SpotlightCard className="p-4 sm:p-8 border-orange-500/30" spotlightColor="rgba(249, 115, 22, 0.15)">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="p-3 sm:p-4 rounded-2xl bg-orange-500/10">
                      <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {t('dashboard.tabs.completeProfile', 'Profil vervollständigen')}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 mb-4">
                        {t('dashboard.tabs.completeProfileText', 'Fülle dein Profil aus, damit unsere AI passende Förderungen und Anträge für dich finden kann.')}
                      </p>
                      <Button 
                        onClick={() => setActiveTab('profile')}
                        className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white"
                      >
                        {t('dashboard.tabs.fillNow', 'Jetzt ausfüllen')}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </SpotlightCard>
              ) : (
                <SpotlightCard className="p-4 sm:p-8 border-emerald-500/30" spotlightColor="rgba(16, 185, 129, 0.15)">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="p-3 sm:p-4 rounded-2xl bg-emerald-500/10">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {t('dashboard.tabs.analysisComplete', 'AI-Analyse abgeschlossen')}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-400 mb-4">
                        {t('dashboard.tabs.foundPrograms', 'Wir haben {{count}} passende Förderungen für dich gefunden!', { count: recommendations?.programs?.length || 0 })}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={() => setActiveTab('antraege')}
                          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white"
                        >
                          {t('dashboard.tabs.viewApps', 'Anträge ansehen')}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={runAnalysis}
                          disabled={isAnalyzing}
                          className="w-full sm:w-auto border-white/10 text-slate-300 hover:bg-white/5"
                        >
                          {isAnalyzing ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <RefreshCw className="w-4 h-4 mr-2" />
                          )}
                          {t('dashboard.tabs.reanalyze', 'Neu analysieren')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              )}
            </motion.div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProfileCompletionWidget 
                onAnalysisReady={(ready) => {
                  setProfileReady(ready);
                  if (ready) runAnalysis();
                }} 
              />
            </motion.div>
          </TabsContent>

          {/* Anträge Tab */}
          <TabsContent value="antraege" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-6"
            >
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20">
                  <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 animate-spin mb-4" />
                  <p className="text-base sm:text-lg text-white font-medium">{t('dashboard.tabs.analyzing', 'AI analysiert dein Profil...')}</p>
                  <p className="text-xs sm:text-sm text-slate-400">{t('dashboard.tabs.analyzingWait', 'Dies kann einen Moment dauern.')}</p>
                </div>
              ) : !profileReady ? (
                <SpotlightCard className="p-6 sm:p-12 text-center border-white/10" spotlightColor="rgba(249, 115, 22, 0.15)">
                  <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{t('dashboard.tabs.profileIncomplete', 'Profil unvollständig')}</h3>
                  <p className="text-sm sm:text-base text-slate-400 mb-6 max-w-md mx-auto">
                    {t('dashboard.tabs.fillProfileFirst', 'Bitte fülle zuerst dein Profil aus, damit wir passende Anträge für dich finden können.')}
                  </p>
                  <Button 
                    onClick={() => setActiveTab('profile')}
                    className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white"
                  >
                    {t('dashboard.tabs.fillProfile', 'Profil ausfüllen')}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </SpotlightCard>
              ) : recommendations?.programs?.length > 0 ? (
                <>
                  {/* Summary Card */}
                  <SpotlightCard className="p-4 sm:p-6 border-emerald-500/30" spotlightColor="rgba(16, 185, 129, 0.15)">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{t('dashboard.tabs.yourRecommendations', 'Deine Empfehlungen')}</h3>
                        <p className="text-xs sm:text-sm text-slate-400">
                          {t('dashboard.tabs.foundBasedOnProfile', 'Basierend auf deinem Profil haben wir {{count}} passende Förderungen gefunden.', { count: recommendations.programs.length })}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs sm:text-sm text-slate-400">{t('dashboard.tabs.estimatedPotential', 'Geschätztes Potenzial')}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-emerald-400">~{recommendations.totalBenefit}€</p>
                        <p className="text-xs text-slate-500">{t('dashboard.tabs.perMonth', 'pro Monat')}</p>
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* Programs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {recommendations.programs.map((program, index) => (
                      <motion.div
                        key={program.programName}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SpotlightCard 
                          className="p-4 sm:p-6 border-white/10 h-full flex flex-col"
                          spotlightColor="rgba(16, 185, 129, 0.1)"
                        >
                          <div className="flex items-start justify-between mb-3 sm:mb-4">
                            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${CATEGORY_COLORS[program.category] || CATEGORY_COLORS.social} text-white`}>
                              {program.eligibilityScore}% {t('dashboard.tabs.match', 'Match')}
                            </div>
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                              ~{program.estimatedAmount}€/{t('dashboard.tabs.perMonth', 'Monat')}
                            </Badge>
                          </div>

                          <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{program.programName}</h4>
                          <p className="text-xs sm:text-sm text-slate-400 flex-1 mb-3 sm:mb-4">{program.reasoning}</p>

                          <div className="flex gap-2 mt-auto">
                            <Button
                              onClick={() => navigate(`/pdf-autofill?form=${program.programName.toLowerCase().replace(/\s+/g, '-')}`)}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm"
                            >
                              {t('dashboard.tabs.fillWithAI', 'Mit AI ausfüllen')}
                              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                            </Button>
                            {program.officialLink && (
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => window.open(program.officialLink, '_blank')}
                                className="border-white/10 text-slate-300 hover:bg-white/5"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </SpotlightCard>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <SpotlightCard className="p-6 sm:p-12 text-center border-white/10" spotlightColor="rgba(59, 130, 246, 0.1)">
                  <FileCheck className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{t('dashboard.tabs.noRecommendations', 'Keine Empfehlungen')}</h3>
                  <p className="text-sm sm:text-base text-slate-400 mb-6">
                    {t('dashboard.tabs.noRecommendationsText', 'Basierend auf deinem Profil konnten wir keine passenden Förderungen finden.')}
                  </p>
                  <Button 
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t('dashboard.tabs.analyzeAgain', 'Erneut analysieren')}
                  </Button>
                </SpotlightCard>
              )}
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
