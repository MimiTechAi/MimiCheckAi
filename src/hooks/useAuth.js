import { useUserProfile } from '@/components/UserProfileContext';

/**
 * Authentication Hook
 * 
 * Wrapper around UserProfileContext for easier access to auth state.
 * Provides user data, loading state, and auth methods.
 * 
 * Usage:
 * const { user, isLoading, isAuthenticated, refreshUser } = useAuth();
 */
export function useAuth() {
  const { user, isLoading, refreshUser, updateUserProfile } = useUserProfile();
  
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    refreshUser,
    updateUserProfile,
  };
}
