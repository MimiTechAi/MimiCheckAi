import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/api/supabaseClient';
import supabaseEntities from '@/api/supabaseEntities';

const UserProfileContext = createContext({
    user: null,
    userRoles: [],
    isLoading: true,
    refreshUser: async () => { },
    updateUserProfile: async (_data) => { },
    profileVersion: 0,
    hasPermission: (_resource, _action) => false,
    hasRole: (_roleName) => false
});

export function UserProfileProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userRoles, setUserRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [profileVersion, setProfileVersion] = useState(0);

    const loadUser = useCallback(async () => {
        try {
            setIsLoading(true);

            // Get current user profile from Supabase
            const userProfile = await supabaseEntities.UserProfile.getCurrent();

            if (userProfile) {
                setUser(userProfile);
                setProfileVersion(prev => prev + 1);
                
                // Load user roles using RPC
                try {
                    const { data, error } = await supabase.rpc('get_user_roles', {
                        user_id: userProfile.id
                    });
                    
                    if (error) {
                        console.warn('Failed to load user roles:', error);
                        setUserRoles([]);
                    } else {
                        setUserRoles(data || []);
                    }
                } catch (roleError) {
                    console.warn('Failed to load user roles:', roleError);
                    setUserRoles([]);
                }
            } else {
                setUser(null);
                setUserRoles([]);
            }
        } catch (error) {
            console.error('Failed to load user:', error);
            setUser(null);
            setUserRoles([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();

        // Listen to auth state changes
        let subscription = null;
        try {
            const result = supabase.auth.onAuthStateChange(async (event) => {
                if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                    await loadUser();
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                }
            });
            subscription = result?.data?.subscription;
        } catch (error) {
            console.warn('Auth state change listener not available:', error);
        }

        return () => subscription?.unsubscribe();
    }, [loadUser]);

    const refreshUser = useCallback(async () => {
        await loadUser();
    }, [loadUser]);

    const updateUserProfile = useCallback(async (data) => {
        try {
            const updated = await supabaseEntities.UserProfile.update(data);
            setUser(updated);
            setProfileVersion(prev => prev + 1);
            return { success: true, user: updated };
        } catch (error) {
            console.error('Failed to update user profile:', error);
            return { success: false, error };
        }
    }, []);

    const hasRole = useCallback((roleName) => {
        return userRoles.some(r => r.role_name === roleName);
    }, [userRoles]);

    const hasPermission = useCallback((_resource, _action) => {
        // Check if user is admin (admins have all permissions)
        if (hasRole('admin')) {
            return true;
        }
        
        // This will be extended when we have proper permission checking
        // For now, we just check if user has the role
        return false;
    }, [hasRole]);

    const contextValue = {
        user,
        userRoles,
        isLoading,
        refreshUser,
        updateUserProfile,
        profileVersion,
        hasPermission,
        hasRole
    };

    return (
        <UserProfileContext.Provider value={contextValue}>
            {children}
        </UserProfileContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserProfile() {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error('useUserProfile must be used within UserProfileProvider');
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfileUpdateListener(_callback) {
    // Simplified - no event emitter for now
    useEffect(() => {
        // Empty for now to avoid errors
    }, []);
}