import { Navigate } from 'react-router-dom';
import { useAuthorization } from '@/hooks/useAuthorization';

/**
 * ProtectedRoute component to gate access to admin-only features
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child component to render if authorized
 * @param {Function} props.requiredPermission - Function that checks if user has permission
 * @param {string} props.fallback - Route to redirect to if not authorized (default: '/')
 */
export function ProtectedRoute({ 
    children, 
    requiredPermission, 
    fallback = '/' 
}) {
    const { user, isLoading } = useAuthorization();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredPermission && !requiredPermission()) {
        return <Navigate to={fallback} replace />;
    }

    return children;
}

/**
 * AdminOnlyRoute - Shorthand for admin-only routes
 */
export function AdminOnlyRoute({ children, fallback = '/' }) {
    const { isAdmin } = useAuthorization();
    
    return (
        <ProtectedRoute 
            requiredPermission={isAdmin} 
            fallback={fallback}
        >
            {children}
        </ProtectedRoute>
    );
}

/**
 * ConditionalRender - Conditionally render content based on authorization
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render if authorized
 * @param {Function} props.check - Authorization check function
 * @param {React.ReactNode} props.fallback - Content to render if not authorized
 */
export function ConditionalRender({ children, check, fallback = null }) {
    const authorized = check();
    
    if (authorized) {
        return children;
    }
    
    return fallback;
}
