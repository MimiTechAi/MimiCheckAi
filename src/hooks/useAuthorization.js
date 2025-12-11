import { useUserProfile } from '@/components/UserProfileContext';

/**
 * Hook to check user authorization and permissions
 * @returns {Object} Authorization utilities
 */
export function useAuthorization() {
    const { user, userRoles, hasPermission, hasRole } = useUserProfile();

    const isAdmin = () => hasRole('admin');
    
    const isModerator = () => hasRole('moderator');
    
    const isViewer = () => hasRole('viewer');
    
    const canViewUsers = () => isAdmin() || isModerator();
    
    const canManageUsers = () => isAdmin();
    
    const canViewAuditLogs = () => {
        return hasPermission('audit_logs', 'read');
    };
    
    const canAccessAdminDashboard = () => {
        return hasPermission('admin', 'read');
    };
    
    const canAccessSecurityDashboard = () => {
        return hasPermission('security', 'read');
    };
    
    const canRotateSecrets = () => {
        return hasPermission('secrets', 'write');
    };
    
    const canManageRoles = () => {
        return hasPermission('roles', 'write');
    };

    return {
        user,
        userRoles,
        hasPermission,
        hasRole,
        isAdmin,
        isModerator,
        isViewer,
        canViewUsers,
        canManageUsers,
        canViewAuditLogs,
        canAccessAdminDashboard,
        canAccessSecurityDashboard,
        canRotateSecrets,
        canManageRoles
    };
}
