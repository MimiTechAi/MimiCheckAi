import { useEffect } from 'react';

/**
 * Redirects to an external URL
 * Used for legal pages that should open on the landing page
 */
export default function ExternalRedirect({ to }) {
    useEffect(() => {
        window.location.href = to;
    }, [to]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
                <p className="text-slate-400">Weiterleitung...</p>
            </div>
        </div>
    );
}
