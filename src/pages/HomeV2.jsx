import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUserStats } from '@/hooks/useUserStats';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { RecentActivityFeed } from '@/components/dashboard/RecentActivityFeed';
import { OnboardingTips } from '@/components/dashboard/OnboardingTips';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Euro, CheckCircle, Clock, Upload, FileSearch, BarChart3 } from 'lucide-react';

/**
 * HomeV2 - Personalized Dashboard
 * 
 * New home page with personalized welcome, stats, quick actions, and recent activity.
 * This is the V2 version controlled by feature flag VITE_FEATURE_NEW_HOME.
 */
export default function HomeV2() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: stats, isLoading: statsLoading, error: statsError } = useUserStats();
  
  const isLoading = authLoading || statsLoading;
  const showOnboarding = stats?.documents_count === 0;
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Guten Morgen';
    if (hour < 18) return 'Guten Tag';
    return 'Guten Abend';
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            {getGreeting()}, {user?.vorname || user?.name || 'User'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Hier ist deine Übersicht für heute
          </p>
        </motion.div>
        
        {/* Onboarding Tips (only for new users) */}
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <OnboardingTips />
          </motion.div>
        )}
        
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Deine Statistiken
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-lg" />
              ))}
            </div>
          ) : statsError ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Statistiken konnten nicht geladen werden</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={FileText}
                label="Dokumente"
                value={stats?.documents_count || 0}
                trend={stats?.documents_count > 0 ? `${stats.documents_count} hochgeladen` : 'Noch keine'}
                trendDirection="neutral"
                color="blue"
              />
              
              <StatCard
                icon={Euro}
                label="Einsparpotential"
                value={`${stats?.total_savings || 0}€`}
                trend={stats?.total_savings > 0 ? 'Gefunden' : 'Noch keine Analyse'}
                trendDirection={stats?.total_savings > 0 ? 'up' : 'neutral'}
                color="emerald"
              />
              
              <StatCard
                icon={CheckCircle}
                label="Analysen"
                value={stats?.analyses_count || 0}
                trend={stats?.analyses_count > 0 ? 'Abgeschlossen' : 'Noch keine'}
                trendDirection="neutral"
                color="teal"
              />
              
              <StatCard
                icon={Clock}
                label="Offene Aufgaben"
                value={stats?.pending_tasks || 0}
                trend={stats?.pending_tasks > 0 ? 'In Bearbeitung' : 'Alles erledigt'}
                trendDirection={stats?.pending_tasks > 0 ? 'neutral' : 'up'}
                color="amber"
              />
            </div>
          )}
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Schnellzugriff
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickActionCard
              icon={Upload}
              title="Neues Dokument"
              description="Lade eine neue Abrechnung hoch"
              href="/upload"
              gradient="from-blue-600 to-emerald-600"
            />
            
            <QuickActionCard
              icon={FileSearch}
              title="Meine Dokumente"
              description="Alle hochgeladenen Dokumente"
              href="/abrechnungen"
              gradient="from-emerald-600 to-teal-600"
            />
            
            <QuickActionCard
              icon={BarChart3}
              title="Berichte"
              description="Analysen und Auswertungen"
              href="/bericht"
              gradient="from-teal-600 to-blue-600"
            />
          </div>
        </motion.div>
        
        {/* Recent Activity */}
        {!showOnboarding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Letzte Aktivitäten
            </h2>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <RecentActivityFeed limit={5} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
