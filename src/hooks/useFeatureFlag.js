/**
 * Feature Flag Hook
 * 
 * Controls gradual rollout of new features in production.
 * Feature flags are controlled via environment variables.
 * 
 * Usage:
 * const isEnabled = useFeatureFlag('NEW_HOME_DASHBOARD');
 * 
 * Environment Variables:
 * - VITE_FEATURE_NEW_HOME=true/false
 * - VITE_FEATURE_ENHANCED_UPLOAD=true/false
 * - VITE_FEATURE_ANALYTICS=true/false
 */
export function useFeatureFlag(flag) {
  const flags = {
    NEW_HOME_DASHBOARD: import.meta.env.VITE_FEATURE_NEW_HOME === 'true',
    ENHANCED_UPLOAD: import.meta.env.VITE_FEATURE_ENHANCED_UPLOAD === 'true',
    ANALYTICS_TRACKING: import.meta.env.VITE_FEATURE_ANALYTICS === 'true',
  };
  
  return flags[flag] || false;
}
