import { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Abrechnung } from "@/api/entities";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Upload,
    FileText,
    Eye,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Plus,
    Euro,
    Clock
} from "lucide-react";
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [abrechnungen, setAbrechnungen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            
            const userAbrechnungen = await Abrechnung.list("-created_date", 10);
            setAbrechnungen(userAbrechnungen);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
            setError("Dashboard konnte nicht geladen werden. Bitte überprüfen Sie Ihre Internetverbindung.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'abgeschlossen':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'in_bearbeitung':
                return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
            case 'fehler':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4 text-slate-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'abgeschlossen':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'in_bearbeitung':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'fehler':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'abgeschlossen': return 'Abgeschlossen';
            case 'in_bearbeitung': return 'In Bearbeitung';
            case 'wartend': return 'Wartend';
            case 'fehler': return 'Fehler';
            default: return status;
        }
    };

    if (isLoading) {
        return <LoadingState message="Dashboard wird geladen..." fullScreen />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadData} fullScreen />;
    }

    const totalSavings = abrechnungen.reduce((sum, a) => sum + (a.rueckforderung_potential || 0), 0);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    Willkommen{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}!
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    Verwalten Sie Ihre Nebenkostenabrechnungen und Förderanträge
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Abrechnungen</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {abrechnungen.length}
                                </p>
                            </div>
                            <FileText className="w-12 h-12 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Geprüfte Abrechnungen</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {abrechnungen.filter(a => a.analyse_status === 'abgeschlossen').length}
                                </p>
                            </div>
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-700 dark:text-green-300 mb-1">Rückforderungspotential</p>
                                <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                                    {totalSavings.toFixed(2)} €
                                </p>
                            </div>
                            <Euro className="w-12 h-12 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <Link to={createPageUrl('Upload')}>
                        <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                                    <Upload className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                        Abrechnung prüfen
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Nebenkostenabrechnung hochladen & analysieren
                                    </p>
                                </div>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Jetzt hochladen
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Link>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <Link to={createPageUrl('Antraege')}>
                        <CardContent className="p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                        Förderanträge
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Staatliche Anträge finden & ausfüllen
                                    </p>
                                </div>
                            </div>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                Anträge durchsuchen
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Link>
                </Card>
            </div>

            {/* Recent Abrechnungen */}
            <Card className="border-none shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">Letzte Abrechnungen</CardTitle>
                        <Link to={createPageUrl('Abrechnungen')}>
                            <Button variant="outline">
                                Alle anzeigen
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    {abrechnungen.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Noch keine Abrechnungen hochgeladen
                            </p>
                            <Link to={createPageUrl('Upload')}>
                                <Button>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Erste Abrechnung hochladen
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {abrechnungen.slice(0, 5).map(abr => (
                                <div key={abr.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <div className="flex items-center gap-4 flex-1">
                                        <FileText className="w-8 h-8 text-blue-500" />
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">
                                                {abr.titel || `Abrechnung ${abr.abrechnungszeitraum}`}
                                            </h4>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <span>{abr.abrechnungszeitraum}</span>
                                                {abr.created_date && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{format(new Date(abr.created_date), 'dd.MM.yyyy', { locale: de })}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge className={`${getStatusColor(abr.analyse_status)} border flex items-center gap-1`}>
                                            {getStatusIcon(abr.analyse_status)}
                                            {getStatusText(abr.analyse_status)}
                                        </Badge>

                                        {abr.rueckforderung_potential > 0 && (
                                            <div className="text-right">
                                                <p className="text-sm text-slate-600 dark:text-slate-400">Potential</p>
                                                <p className="font-bold text-green-600">{abr.rueckforderung_potential.toFixed(2)} €</p>
                                            </div>
                                        )}

                                        {abr.analyse_status === 'abgeschlossen' && (
                                            <Link to={createPageUrl(`Bericht?id=${abr.id}`)}>
                                                <Button size="sm" variant="outline">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Bericht
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}