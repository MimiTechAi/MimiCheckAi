import { useState, useEffect } from "react";
import { Abrechnung } from "@/api/entities";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useTranslation } from 'react-i18next';
import {
    FileText,
    ArrowRight,
    AlertTriangle,
    CheckCircle,
    Loader2,
    Plus,
    Trash2,
    RefreshCcw
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import SuccessToast from "@/components/ui/SuccessToast";
import { filterAndSortAbrechnungen } from "@/lib/abrechnungenUtils";

export default function Abrechnungen() {
    const [abrechnungen, setAbrechnungen] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [abrechnungToDelete, setAbrechnungToDelete] = useState(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [statusFilter, setStatusFilter] = useState('alle');
    const [minPotential, setMinPotential] = useState('');
    const [sortBy, setSortBy] = useState('created_date');
    const [sortOrder, setSortOrder] = useState('desc');

    const loadAbrechnungen = async (showRefreshLoader = false) => {
        if (showRefreshLoader) {
            setIsRefreshing(true);
        } else {
            setIsLoading(true);
        }
        setError(null);
        
        try {
            const data = await Abrechnung.list("-created_date");
            setAbrechnungen(data || []);
        } catch (error) {
            console.error("Fehler beim Laden der Abrechnungen:", error);
            setError("Die Abrechnungen konnten nicht geladen werden.");
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        loadAbrechnungen();
    }, []);

    const displayedAbrechnungen = filterAndSortAbrechnungen(abrechnungen, {
        status: statusFilter,
        minPotential: Number(minPotential) || 0,
        sortBy,
        order: sortOrder,
    });

    const openDeleteDialog = (abrechnung) => {
        setAbrechnungToDelete(abrechnung);
        setIsAlertOpen(true);
    };

    const handleDelete = async () => {
        if (!abrechnungToDelete) return;

        setIsDeleting(true);
        try {
            await Abrechnung.delete(abrechnungToDelete.id);
            await loadAbrechnungen();
            setSuccessMessage('Abrechnung erfolgreich gelöscht');
            setShowSuccessToast(true);
            setError(null);
        } catch (error) {
            console.error("Fehler beim Löschen der Abrechnung:", error);
            setError("Die Abrechnung konnte nicht gelöscht werden. Bitte versuchen Sie es erneut.");
        } finally {
            setIsDeleting(false);
            setIsAlertOpen(false);
            setAbrechnungToDelete(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'abgeschlossen': return 'bg-green-100 text-green-800 border-green-200';
            case 'in_bearbeitung': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'wartend': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'fehler': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

    const StatusBadge = ({ status }) => (
        <Badge className={`${getStatusColor(status)} border`}>
            {status === 'abgeschlossen' && <CheckCircle className="w-3 h-3 mr-1" />}
            {status === 'in_bearbeitung' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
            {status === 'fehler' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {getStatusText(status)}
        </Badge>
    );

    const getAnalysisResult = (abrechnung) => {
        if (abrechnung.rueckforderung_potential > 0) {
            return (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <span className="text-xl font-bold">{(abrechnung.rueckforderung_potential || 0).toFixed(2)} €</span>
                    <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded-full">
                        Rückforderung möglich
                    </span>
                </div>
            );
        } else if (abrechnung.fehler_anzahl > 0) {
            return (
                <div className="flex items-center gap-2 text-amber-600 font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">{abrechnung.fehler_anzahl} Auffälligkeiten</span>
                </div>
            );
        }
        return (
            <div className="flex items-center gap-2 text-gray-500">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Keine Probleme gefunden</span>
            </div>
        );
    };

    const { t } = useTranslation();

    if (isLoading) {
        return <LoadingState message="Abrechnungen werden geladen..." fullScreen />;
    }

    return (
        <div className="min-h-screen p-6">
            <SuccessToast 
                message={successMessage}
                isVisible={showSuccessToast}
                onClose={() => setShowSuccessToast(false)}
            />

            <div className="max-w-7xl mx-auto">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">{t('abrechnungen.title')}</h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                                Überblick über alle geprüften Nebenkostenabrechnungen
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button 
                                variant="outline"
                                onClick={() => loadAbrechnungen(true)}
                                disabled={isRefreshing}
                            >
                                {isRefreshing ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                )}
                                Aktualisieren
                            </Button>
                            <Link to={createPageUrl("Upload")}>
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Neue Prüfung
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Filter & Sort */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                        <div className="flex flex-col">
                            <label className="text-sm text-slate-600 dark:text-slate-300 mb-1">Status</label>
                            <select
                                data-testid="filter-status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                            >
                                <option value="alle">Alle</option>
                                <option value="abgeschlossen">Abgeschlossen</option>
                                <option value="in_bearbeitung">In Bearbeitung</option>
                                <option value="wartend">Wartend</option>
                                <option value="fehler">Fehler</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm text-slate-600 dark:text-slate-300 mb-1">Min. Rückforderung (€)</label>
                            <input
                                data-testid="filter-min-potential"
                                type="number"
                                min="0"
                                value={minPotential}
                                onChange={(e) => setMinPotential(e.target.value)}
                                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm text-slate-600 dark:text-slate-300 mb-1">Sortieren nach</label>
                            <select
                                data-testid="sort-by"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                            >
                                <option value="created_date">Datum</option>
                                <option value="rueckforderung_potential">Rückforderung</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm text-slate-600 dark:text-slate-300 mb-1">Reihenfolge</label>
                            <select
                                data-testid="sort-order"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                            >
                                <option value="desc">Absteigend</option>
                                <option value="asc">Aufsteigend</option>
                            </select>
                        </div>
                    </div>

                    {error && <ErrorState message={error} onRetry={() => loadAbrechnungen()} />}

                    {/* Results */}
                    {displayedAbrechnungen.length === 0 ? (
                        <Card className="text-center py-20">
                            <CardContent>
                                <FileText className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                                    Noch keine Abrechnungen
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    Laden Sie Ihre erste Nebenkostenabrechnung hoch
                                </p>
                                <Link to={createPageUrl("Upload")}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Erste Abrechnung hochladen
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {displayedAbrechnungen.map((abrechnung) => (
                                <Card key={abrechnung.id} className="shadow-sm hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                                                    <FileText className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                                                        {abrechnung.titel || `Abrechnung ${abrechnung.abrechnungszeitraum}`}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-500">
                                                        <span>Zeitraum: {abrechnung.abrechnungszeitraum}</span>
                                                        {abrechnung.verwalter && (
                                                            <>
                                                                <span>•</span>
                                                                <span>Verwalter: {abrechnung.verwalter}</span>
                                                            </>
                                                        )}
                                                        {abrechnung.created_date && (
                                                            <>
                                                                <span>•</span>
                                                                <span>
                                                                    Geprüft: {format(new Date(abrechnung.created_date), "dd.MM.yyyy", { locale: de })}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="mt-3">
                                                        {getAnalysisResult(abrechnung)}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <StatusBadge status={abrechnung.analyse_status} />
                                                
                                                {abrechnung.analyse_status === 'abgeschlossen' && (
                                                    <Link to={createPageUrl(`Bericht?id=${abrechnung.id}`)}>
                                                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                                                            Bericht ansehen
                                                            <ArrowRight className="ml-2 w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                )}
                                                
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-slate-400 hover:text-red-600"
                                                    onClick={() => openDeleteDialog(abrechnung)}
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting && abrechnungToDelete?.id === abrechnung.id ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Dialog */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Abrechnung löschen?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Möchten Sie die Abrechnung "{abrechnungToDelete?.titel}" wirklich dauerhaft löschen? 
                            Diese Aktion kann nicht rückgängig gemacht werden.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete} 
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Wird gelöscht...
                                </>
                            ) : (
                                'Endgültig löschen'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}