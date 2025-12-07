import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from './useAuth';

/**
 * User Statistics Hook
 * 
 * Fetches and calculates user statistics from Supabase.
 * Uses React Query for caching and automatic refetching.
 * 
 * Returns:
 * - documents_count: Total number of uploaded documents
 * - total_savings: Sum of all potential refunds (Rückforderung)
 * - analyses_count: Number of completed analyses
 * - pending_tasks: Number of applications in draft/processing status
 * 
 * Usage:
 * const { data: stats, isLoading, error, refetch } = useUserStats();
 */
export function useUserStats() {
  const { user, isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      // Fetch applications (includes analyses and documents)
      const { data: applications, error: appsError } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id);
      
      if (appsError) throw appsError;
      
      // Fetch documents count
      const { count: documentsCount, error: docsError } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      
      if (docsError) throw docsError;
      
      // Calculate stats
      const totalSavings = applications?.reduce((sum, app) => {
        const potential = parseFloat(app.rueckforderung_potential || 0);
        return sum + potential;
      }, 0) || 0;
      
      const analysesCount = applications?.filter(app => 
        app.status === 'abgeschlossen' || app.status === 'approved'
      ).length || 0;
      
      const pendingTasks = applications?.filter(app => 
        app.status === 'draft' || app.status === 'in_bearbeitung' || app.status === 'processing'
      ).length || 0;
      
      return {
        documents_count: documentsCount || 0,
        total_savings: Math.round(totalSavings * 100) / 100, // Round to 2 decimals
        analyses_count: analysesCount,
        pending_tasks: pendingTasks,
        last_activity: new Date().toISOString(),
      };
    },
    enabled: isAuthenticated && !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
