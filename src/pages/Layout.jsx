import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "@/api/entities";
import { supabase } from "@/api/supabaseClient";
import { createPageUrl } from "@/utils";
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard,
    FileText,
    Upload as UploadIcon,
    FileCheck,
    Menu,
    X,
    LogOut,
    User as UserIcon,
    HelpCircle,
    Settings,
    Globe,
    Crown,
    CreditCard
} from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell.jsx";
import AIChatAssistant from "@/components/ui/AIChatAssistant";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }) {
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        // Versuche User-Profil zu laden
        const loadUser = async () => {
            try {
                // Erst versuchen das Profil zu laden
                const profile = await User.me();
                if (profile) {
                    setUser(profile);
                    return;
                }

                // Fallback: Auth-User direkt verwenden
                const { data: { user: authUser } } = await supabase.auth.getUser();
                if (authUser) {
                    setUser({
                        email: authUser.email,
                        full_name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Benutzer'
                    });
                }
            } catch (err) {
                console.warn('Layout: User load failed:', err);
                // Trotzdem versuchen Auth-User zu bekommen
                try {
                    const { data: { user: authUser } } = await supabase.auth.getUser();
                    if (authUser) {
                        setUser({
                            email: authUser.email,
                            full_name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Benutzer'
                        });
                    }
                } catch { /* ignore */ }
            }
        };

        loadUser();

        // Auth State Listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setUser(null);
            } else if (session?.user) {
                loadUser();
            }
        });

        return () => subscription?.unsubscribe();
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await supabase.auth.signOut();
            // Clear localStorage
            localStorage.removeItem('sb-yjjauvmjyhlxcoumwqlj-auth-token');
        } catch (error) {
            console.warn('Logout error:', error);
        }
        setUser(null);
        window.location.href = '/';
    }, []);

    const navItems = [
        { name: t('layout.nav.dashboard', 'Dashboard'), icon: LayoutDashboard, page: 'profilseite' },
        { name: t('layout.nav.upload', 'Upload'), icon: UploadIcon, page: 'Upload' },
        { name: t('abrechnungen.title', 'Abrechnungen'), icon: FileText, page: 'Abrechnungen' },
        { name: t('layout.nav.antraege', 'Anträge'), icon: FileCheck, page: 'Antraege' },
        { name: t('layout.nav.pricing', 'Preise & Abo'), icon: Crown, page: 'Pricing', highlight: user?.subscription_tier === 'free' },
        { name: t('layout.nav.contact', 'Kontakt'), icon: HelpCircle, page: 'Contact' },
    ];

    const currentPath = location.pathname.toLowerCase();

    // PUBLIC ROUTES - No Sidebar, just Navbar + Footer
    const isPublicRoute = (
        currentPath === '/' ||
        currentPath === '/landing' ||
        currentPath === '/contact' ||
        currentPath === '/pricing' ||
        currentPath === '/hilfe'
    );

    // ============================================================
    // PUBLIC LAYOUT
    // ============================================================
    if (isPublicRoute) {
        return (
            <div className="min-h-screen bg-slate-950 font-sans flex flex-col selection:bg-emerald-500/30">
                {/* Public Navbar */}
                <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img src="/logo.png" alt="MiMiCheck Logo" className="h-8 w-auto" />
                            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
                                MiMi<span className="text-emerald-400">Check</span>
                            </span>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Start</Link>
                            <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Preise</Link>
                            <Link to="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Kontakt</Link>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white uppercase transition-colors p-2 rounded hover:bg-white/5">
                                        <Globe className="w-4 h-4" />
                                        {i18n.language}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-900 border-white/10 text-slate-200 max-h-[320px] overflow-y-auto" align="end">
                                    {[
                                        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
                                        { code: 'en', label: 'English', flag: '🇬🇧' },
                                        { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
                                        { code: 'ar', label: 'العربية', flag: '🇸🇦' },
                                        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
                                        { code: 'pl', label: 'Polski', flag: '🇵🇱' },
                                        { code: 'es', label: 'Español', flag: '🇪🇸' },
                                        { code: 'pt', label: 'Português', flag: '🇵🇹' },
                                        { code: 'it', label: 'Italiano', flag: '🇮🇹' },
                                    ].map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            onClick={() => i18n.changeLanguage(lang.code)}
                                            className={`cursor-pointer flex gap-3 ${i18n.language === lang.code ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/5'}`}
                                        >
                                            <span className="text-base">{lang.flag}</span>
                                            <span className="uppercase font-bold text-xs w-6 text-slate-500">{lang.code}</span>
                                            <span>{lang.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {user ? (
                                <Link to={createPageUrl('profilseite')}>
                                    <Button variant="outline" className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 hidden sm:flex">
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        Zum Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link to="/auth">
                                    <Button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg shadow-blue-500/20 border-0">
                                        Anmelden
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1">
                    {children}
                </main>

                <footer className="border-t border-white/5 bg-slate-900/50 pt-16 pb-8">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                            <div className="col-span-2">
                                <Link to="/" className="flex items-center gap-2 mb-4">
                                    <img src="/logo.png" alt="MiMiCheck Logo" className="h-6 w-auto" />
                                    <span className="text-lg font-bold text-white tracking-tight">
                                        MiMi<span className="text-emerald-400">Check</span>
                                    </span>
                                </Link>
                                <p className="text-slate-400 text-sm max-w-sm">
                                    {t('layout.subtitle', 'Dein digitaler Antragshelfer')}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-4">Rechtliches</h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li><Link to="/impressum" className="hover:text-emerald-400 transition-colors">Impressum</Link></li>
                                    <li><Link to="/datenschutz" className="hover:text-emerald-400 transition-colors">Datenschutz</Link></li>
                                    <li><Link to="/agb" className="hover:text-emerald-400 transition-colors">AGB</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-4">Hilfe</h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li><Link to="/kontakt" className="hover:text-emerald-400 transition-colors">Kontakt</Link></li>
                                    <li><Link to="/hilfe" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
                            <p>{t('layout.footer', '© 2025 MiMiCheck. Made with ❤️ in DACH.')}</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    // ============================================================
    // APP LAYOUT (Sidebar + Dashboard)
    // ============================================================
    return (
        <div className="min-h-screen bg-slate-950 font-sans flex overflow-hidden selection:bg-emerald-500/30">
            {/* DEBUG BANNER - Remove after testing */}
            <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white text-center py-1 text-xs font-bold lg:hidden">
                📱 MOBILE v2.1 - Dec 10 - If you see this, deployment works!
            </div>
            
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            
            {/* SIDEBAR - Dark Theme - Hidden on mobile by default */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                }`}>
                {/* Logo Area */}
                <div className="p-8">
                    <div className="flex items-center justify-between mb-1">
                        <Link
                            to="/"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                            <img src="/logo.png" alt="MiMiCheck Logo" className="h-8 w-auto" />
                            <span className="text-xl font-bold text-white tracking-tight">
                                MiMi<span className="text-emerald-400">Check</span>
                            </span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = currentPath === createPageUrl(item.page).toLowerCase();
                        return (
                            <Link
                                key={item.name}
                                to={createPageUrl(item.page)}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${isActive
                                        ? 'bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.1)] border border-emerald-500/20'
                                        : item.highlight
                                            ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 font-semibold border border-purple-500/30 animate-pulse'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white font-medium border border-transparent'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive
                                        ? 'text-emerald-400'
                                        : item.highlight
                                            ? 'text-purple-400'
                                            : 'text-slate-500 group-hover:text-slate-300'
                                    }`} />
                                <span>{item.name}</span>
                                {item.highlight && (
                                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile & Footer */}
                <div className="p-4 mt-auto border-t border-white/5">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left border border-transparent hover:border-white/5 group">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm border border-emerald-500/30 group-hover:border-emerald-400/50 transition-colors">
                                        {user.full_name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{user.full_name || 'Benutzer'}</p>
                                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                    </div>
                                    <Settings className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 bg-slate-900/95 backdrop-blur-xl border-white/10 text-slate-200 shadow-xl shadow-black/20" align="end" side="top" sideOffset={8}>
                                {/* User Info Header */}
                                <div className="px-3 py-3 border-b border-white/5">
                                    <p className="text-sm font-semibold text-white">{user.full_name || 'Benutzer'}</p>
                                    <p className="text-xs text-slate-400">{user.email}</p>
                                </div>
                                
                                {/* Account Actions */}
                                <div className="py-1">
                                    <DropdownMenuItem asChild className="focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer">
                                        <Link to={createPageUrl('Lebenslagen')} className="flex items-center">
                                            <UserIcon className="w-4 h-4 mr-3 text-slate-400" />
                                            <div>
                                                <p className="text-sm">{t('layout.profile.data', 'Meine Daten')}</p>
                                                <p className="text-xs text-slate-500">Persönliche Angaben verwalten</p>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer">
                                        <Link to={createPageUrl('Pricing')} className="flex items-center">
                                            <CreditCard className="w-4 h-4 mr-3 text-slate-400" />
                                            <div>
                                                <p className="text-sm">{t('layout.profile.subscription', 'Abo & Zahlung')}</p>
                                                <p className="text-xs text-slate-500">Abonnement verwalten</p>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                </div>
                                
                                <DropdownMenuSeparator className="bg-white/5" />
                                
                                {/* Logout */}
                                <div className="py-1">
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer">
                                        <LogOut className="w-4 h-4 mr-3" />
                                        {t('layout.profile.logout', 'Abmelden')}
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : null}

                    {/* KI Lotse Button */}
                    <div className="p-3 mt-2">
                        <button
                            onClick={() => setIsAIChatOpen(true)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <HelpCircle className="w-5 h-5" />
                            KI Lotse
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between px-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-300 uppercase transition-colors p-2 rounded hover:bg-white/5">
                                    <Globe className="w-4 h-4" />
                                    {i18n.language}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-900 border-white/10 text-slate-200 max-h-[320px] overflow-y-auto" align="start">
                                {[
                                    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
                                    { code: 'en', label: 'English', flag: '🇬🇧' },
                                    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
                                    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
                                    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
                                    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
                                    { code: 'es', label: 'Español', flag: '🇪🇸' },
                                    { code: 'pt', label: 'Português', flag: '🇵🇹' },
                                    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
                                ].map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() => i18n.changeLanguage(lang.code)}
                                        className={`cursor-pointer flex gap-3 ${i18n.language === lang.code ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/5'}`}
                                    >
                                        <span className="text-base">{lang.flag}</span>
                                        <span className="uppercase font-bold text-xs w-6 text-slate-500">{lang.code}</span>
                                        <span>{lang.label}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <NotificationBell />
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT WRAPPER - Dark Theme Container */}
            <div className="flex-1 relative bg-slate-950 lg:py-3 lg:pr-3 h-screen overflow-hidden w-full">
                <main className="h-full w-full bg-slate-900/50 lg:rounded-[2rem] shadow-2xl overflow-y-auto overflow-x-hidden relative scrollbar-hide border-0 lg:border border-white/5 backdrop-blur-sm">

                    {/* Mobile Header Bar - top-6 to account for debug banner */}
                    <div className="lg:hidden sticky top-6 z-30 flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-lg border-b border-white/5">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2.5 bg-slate-800 text-white rounded-xl border border-white/10 active:scale-95 transition-transform"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.png" alt="MiMiCheck" className="h-7 w-auto" />
                            <span className="text-lg font-bold text-white">
                                MiMi<span className="text-emerald-400">Check</span>
                            </span>
                        </Link>
                        <div className="w-10" /> {/* Spacer for centering */}
                    </div>

                    {/* Page Content */}
                    {children}

                    {/* Footer inside the dark area */}
                    <footer className="py-8 px-6 border-t border-white/5">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                            <p className="text-slate-500">{t('layout.footer', '© 2025 MiMiCheck. Made with ❤️ in DACH.')}</p>
                            <div className="flex items-center gap-4 text-slate-400">
                                <a href="https://www.mimitechai.com/impressum" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Impressum</a>
                                <span className="text-slate-600">•</span>
                                <a href="https://www.mimitechai.com/datenschutz" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Datenschutz</a>
                                <span className="text-slate-600">•</span>
                                <a href="https://www.mimitechai.com/agb" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">AGB</a>
                            </div>
                        </div>
                        {/* Version Indicator - für Debug */}
                        <div className="mt-4 text-center">
                            <span className="text-[10px] text-slate-700 font-mono">v2.1.0-mobile-fix-dec10</span>
                        </div>
                    </footer>
                </main>
            </div>

            {/* Global AI Assistant */}
            <AIChatAssistant isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
        </div>
    );
}
