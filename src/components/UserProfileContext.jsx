import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/api/entities';

const UserProfileContext = createContext({
    user: null,
    isLoading: true,
    refreshUser: async () => {},
    updateUserProfile: async (data) => {},
    profileVersion: 0
});

export function UserProfileProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profileVersion, setProfileVersion] = useState(0);

    const loadUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const currentUser = await User.me();
            setUser(currentUser);
            setProfileVersion(prev => prev + 1);
        } catch (error) {
            console.error('Failed to load user:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, []);

    const refreshUser = useCallback(async () => {
        await loadUser();
    }, [loadUser]);

    const updateUserProfile = useCallback(async (data) => {
        try {
            await User.updateProfile(data);
            const updatedUser = await User.me();
            setUser(updatedUser);
            setProfileVersion(prev => prev + 1);
            return { success: true, user: updatedUser };
        } catch (error) {
            console.error('Failed to update user profile:', error);
            return { success: false, error };
        }
    }, []);

    const contextValue = {
        user,
        isLoading,
        refreshUser,
        updateUserProfile,
        profileVersion
    };

    return (
        <UserProfileContext.Provider value={contextValue}>
            {children}
        </UserProfileContext.Provider>
    );
}

export function useUserProfile() {
    const context = useContext(UserProfileContext);
    if (!context) {
        throw new Error('useUserProfile must be used within UserProfileProvider');
    }
    return context;
}

export function useProfileUpdateListener(callback, dependencies = []) {
    // Simplified - no event emitter for now
    useEffect(() => {
        // Empty for now to avoid errors
    }, dependencies);
}