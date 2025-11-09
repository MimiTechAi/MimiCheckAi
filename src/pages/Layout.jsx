
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "@/api/entities";
import { createPageUrl } from "@/utils";
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard,
    FileText,
    Upload,
    FileCheck,
    Menu,
    X,
    Sun,
    Moon,
    LogOut,
    User as UserIcon,
    Settings,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/notifications/NotificationBell.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        User.me().then(u => setUser(u)).catch(() => {});
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const handleLogout = useCallback(async () => {
        await User.logout(createPageUrl('LandingPage'));
    }, []);

    // ✅ VEREINFACHTE NAVIGATION - NUR 4 HAUPTPUNKTE
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
        { name: 'Upload', icon: Upload, page: 'Upload' },
        { name: t('abrechnungen.title', 'Abrechnungen'), icon: FileText, page: 'Abrechnungen' },
        { name: 'Anträge', icon: FileCheck, page: 'Antraege' },
    ];

    const currentPath = location.pathname;

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
            <style>{`
                .dynamic-bg {
                    position: fixed;
                    top: -10%;
                    left: -10%;
                    width: 120%;
                    height: 120%;
                    background: linear-gradient(135deg, 
                        rgba(99, 102, 241, 0.05) 0%,
                        rgba(168, 85, 247, 0.05) 25%,
                        rgba(236, 72, 153, 0.05) 50%,
                        rgba(251, 146, 60, 0.05) 75%,
                        rgba(59, 130, 246, 0.05) 100%
                    );
                    z-index: -1;
                }
                .dark .dynamic-bg {
                    background: linear-gradient(135deg,
                        rgba(17, 24, 39, 0.95) 0%,
                        rgba(30, 27, 75, 0.95) 25%,
                        rgba(49, 46, 129, 0.95) 50%,
                        rgba(67, 56, 202, 0.95) 75%,
                        rgba(17, 24, 39, 0.95) 100%
                    );
                }
            `}</style>

            <div className="dynamic-bg"></div>

            <div className="flex min-h-screen">
                {/* SIDEBAR */}
                <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
                    {/* Logo */}
                    <div className="p-8 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                MiMiCheck
                            </h1>
                            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Dein digitaler Antragshelfer</p>
                    </div>

                    {/* Navigation - NUR 4 PUNKTE */}
                    <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = currentPath === createPageUrl(item.page);
                            return (
                                <Link
                                    key={item.name}
                                    to={createPageUrl(item.page)}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                                        isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                                    }`}
                                >
                                    <item.icon className="w-6 h-6" />
                                    <span className="font-semibold">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Section: User Menu + Dark Mode */}
                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="flex items-center justify-between">
                            {user?.profile_completeness < 100 && (
                                <Link to={createPageUrl('Onboarding')} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                    {t('nav.onboarding')}
                                </Link>
                            )}
                            <div className="flex items-center gap-2">
                                <button onClick={() => i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de')} aria-label="Sprache umschalten" title="Language" className="px-2 py-1 text-xs border rounded">
                                    {i18n.language === 'de' ? 'DE' : 'EN'}
                                </button>
                                <NotificationBell />
                            </div>
                        </div>
                        {/* User Dropdown Menu */}
                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="w-full flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <span className="text-white font-bold text-lg">
                                                {user.full_name?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="font-semibold text-slate-900 dark:text-white truncate">{user.full_name || 'User'}</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{user.email}</p>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuItem asChild>
                                        <Link to={createPageUrl('Lebenslagen')} className="flex items-center cursor-pointer">
                                            <UserIcon className="w-4 h-4 mr-2" />
                                            Profil bearbeiten
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 cursor-pointer">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Abmelden
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            <span className="font-semibold">
                                {isDarkMode ? 'Hell' : 'Dunkel'}
                            </span>
                        </button>
                    </div>
                </aside>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* MAIN CONTENT */}
                <main className="flex-1 min-w-0 relative flex flex-col">
                    <div className="flex-1 container mx-auto py-8 px-6 lg:px-8 max-w-8xl">
                        {children}
                    </div>

                    {/* FOOTER mit Hilfe-Link */}
                    <footer className="mt-auto py-8 px-6 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
                            <p>© 2025 MiMiCheck. Alle Rechte vorbehalten.</p>
                            <div className="flex gap-6">
                                <Link to={createPageUrl('Hilfe')} className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4" />
                                    Hilfe & FAQ
                                </Link>
                                <Link to={createPageUrl('Impressum')} className="hover:text-blue-600 dark:hover:text-blue-400">Impressum</Link>
                                <Link to={createPageUrl('Datenschutz')} className="hover:text-blue-600 dark:hover:text-blue-400">Datenschutz</Link>
                                <Link to={createPageUrl('AGB')} className="hover:text-blue-600 dark:hover:text-blue-400">AGB</Link>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
