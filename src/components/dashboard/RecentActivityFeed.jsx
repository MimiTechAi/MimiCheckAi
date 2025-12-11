import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
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
 * Features virtualization for long lists and offline support.
 * 
 * @param {Object} props
 * @param {number} [props.limit=50] - Number of activities to display
 * @param {boolean} [props.virtualized=false] - Enable virtualization for long lists
 */
export function RecentActivityFeed({ limit = 50, virtualized = false }) {
  const { user } = useAuth();
  const { isOnline } = useNetworkStatus();
  const parentRef = useRef(null);
  
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
    enabled: !!user?.id && isOnline,
    staleTime: 1 * 60 * 1000,
    refetchInterval: isOnline ? 30000 : false,
  });

  const virtualizer = useVirtualizer({
    count: activities?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
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

  const ActivityItem = ({ activity, index, style = {} }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      className="flex gap-4 items-start"
      style={style}
    >
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <activity.icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      
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
  );

  if (virtualized && activities.length > 10) {
    return (
      <div ref={parentRef} className="h-[500px] overflow-auto space-y-4">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const activity = activities[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <ActivityItem activity={activity} index={virtualItem.index} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <ActivityItem key={activity.id} activity={activity} index={index} />
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
