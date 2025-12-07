import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * RecentActivityFeed Component
 * 
 * Displays the user's recent activities (uploads, analyses, reports).
 * Fetches data from Supabase and displays in a timeline format.
 * 
 * @param {Object} props
 * @param {number} [props.limit=5] - Number of activities to display
 */
export function RecentActivityFeed({ limit = 5 }) {
  const { user } = useAuth();
  
  const { data: activities, isLoading, error } = useQuery({
    queryKey: ['recentActivity', user?.id, limit],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      // Fetch recent applications
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      
      // Transform to activity format
      return data.map(app => ({
        id: app.id,
        type: getActivityType(app.status),
        title: getActivityTitle(app),
        description: getActivityDescription(app),
        timestamp: new Date(app.created_at),
        icon: getActivityIcon(app.status),
      }));
    },
    enabled: !!user?.id,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        <p>Aktivitäten konnten nicht geladen werden</p>
      </div>
    );
  }
  
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Noch keine Aktivitäten</p>
        <p className="text-sm mt-1">Lade dein erstes Dokument hoch!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-4 items-start"
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <activity.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              {activity.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(activity.timestamp, { 
                addSuffix: true, 
                locale: de 
              })}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Helper functions
function getActivityType(status) {
  if (status === 'abgeschlossen' || status === 'approved') return 'analysis';
  if (status === 'in_bearbeitung' || status === 'processing') return 'processing';
  return 'upload';
}

function getActivityTitle(app) {
  if (app.status === 'abgeschlossen') return 'Analyse abgeschlossen';
  if (app.status === 'in_bearbeitung') return 'Analyse läuft';
  return 'Dokument hochgeladen';
}

function getActivityDescription(app) {
  const type = app.type === 'abrechnung' ? 'Nebenkostenabrechnung' : 
               app.type === 'wohngeld' ? 'Wohngeld-Antrag' : 
               'Dokument';
  
  if (app.status === 'abgeschlossen' && app.rueckforderung_potential > 0) {
    return `${type} - ${app.rueckforderung_potential}€ Rückforderung möglich`;
  }
  
  return `${type} - ${app.title || 'Unbenannt'}`;
}

function getActivityIcon(status) {
  if (status === 'abgeschlossen' || status === 'approved') return CheckCircle;
  if (status === 'in_bearbeitung' || status === 'processing') return Clock;
  return FileText;
}
