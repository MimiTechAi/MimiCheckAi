
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    CheckCircle, 
    AlertTriangle, 
    DollarSign, 
    FileText, 
    Upload,
    Eye,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function UploadResults({ results, onReset, onNewAnalysis, onViewAll }) {
    const { abrechnung, analysis } = results;
    const errors = analysis?.fehler || [];
    const hasErrors = errors.length > 0;
    const savings = abrechnung?.rueckforderung_potential || 0;
    
    // Extrahierte Daten aus der Abrechnung
    const extractedData = abrechnung?.extracted_data || {};
    const titel = extractedData.titel || abrechnung?.title || abrechnung?.filename || 'Dokument';
    const zeitraum = extractedData.abrechnungszeitraum || 'Nicht erkannt';

    console.log("UploadResults - Abrechnung:", abrechnung);

    return (
        <div className="space-y-8">
            {/* Success Header */}
            <Card className="shadow-2xl border-none bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-xl">
                <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                        Analyse erfolgreich abgeschlossen!
                    </CardTitle>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Ihre Nebenkostenabrechnung wurde vollständig geprüft
                    </p>
                </CardHeader>
            </Card>

            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">
                            {extractedData.dokumenttyp || 'Dokument'}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{titel}</p>
                        {extractedData.dokumenttyp_confidence && (
                            <Badge className="mt-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                {extractedData.dokumenttyp_confidence}% Konfidenz
                            </Badge>
                        )}
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80">
                    <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
                            hasErrors 
                                ? 'bg-gradient-to-br from-amber-500 to-orange-600' 
                                : 'bg-gradient-to-br from-green-500 to-emerald-600'
                        }`}>
                            {hasErrors ? (
                                <AlertTriangle className="w-6 h-6 text-white" />
                            ) : (
                                <CheckCircle className="w-6 h-6 text-white" />
                            )}
                        </div>
                        <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">Status</h3>
                        <p className={`text-sm ${hasErrors ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                            {hasErrors ? `${errors.length} Auffälligkeiten gefunden` : 'Keine Probleme'}
                        </p>
                        <Badge className={hasErrors 
                            ? 'mt-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                            : 'mt-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800'
                        }>
                            {hasErrors ? 'Prüfung empfohlen' : 'Alles in Ordnung'}
                        </Badge>
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80">
                    <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">Ersparnis</h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {savings.toFixed(0)}€
                        </p>
                        <Badge className="mt-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                            Rückforderung möglich
                        </Badge>
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons - FIXED: Validate ID before creating link */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {abrechnung?.id ? (
                    <Link to={createPageUrl(`Bericht?id=${abrechnung.id}`)}>
                        <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <Eye className="w-5 h-5 mr-2" />
                            Vollständigen Bericht anzeigen
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                ) : (
                    <Button 
                        disabled
                        className="w-full sm:w-auto bg-gray-400 text-white px-8 py-3 text-lg font-semibold rounded-2xl cursor-not-allowed"
                    >
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Bericht wird erstellt...
                    </Button>
                )}
                
                <Button 
                    variant="outline" 
                    onClick={onReset || onNewAnalysis}
                    className="w-full sm:w-auto border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-3 rounded-2xl"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Neue Analyse starten
                </Button>
                
                <Button 
                    variant="outline" 
                    onClick={onViewAll}
                    className="w-full sm:w-auto border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-6 py-3 rounded-2xl"
                >
                    <FileText className="w-4 h-4 mr-2" />
                    Alle Abrechnungen
                </Button>
            </div>

            {/* Found Issues - if any */}
            {hasErrors && (
                <Card className="shadow-lg border-amber-200/60 dark:border-amber-700/60 bg-amber-50/80 dark:bg-amber-900/20">
                    <CardHeader>
                        <CardTitle className="text-lg text-amber-800 dark:text-amber-300 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Gefundene Auffälligkeiten
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {errors.map((fehler, index) => (
                            <div key={index} className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-amber-200/50 dark:border-amber-700/50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-white">{fehler.typ}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{fehler.beschreibung}</p>
                                    </div>
                                    {fehler.betrag > 0 && (
                                        <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                                            {fehler.betrag.toFixed(2)}€
                                        </Badge>
                                    )}
                                </div>
                                {fehler.sicherheit && (
                                    <div className="mt-2 text-xs text-slate-500">
                                        Sicherheit: {fehler.sicherheit}%
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Next Steps Hint */}
            <Card className="shadow-lg border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                            {hasErrors ? 'Empfehlung: Widerspruch einlegen' : 'Was kommt als Nächstes?'}
                        </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {hasErrors 
                            ? `Wir haben ${errors.length} Auffälligkeiten gefunden. Im detaillierten Bericht erhalten Sie Musterbriefe und eine Schritt-für-Schritt Anleitung für Ihren Widerspruch.`
                            : 'Im detaillierten Bericht finden Sie alle extrahierten Informationen und können bei Bedarf den KI-Assistenten um Hilfe bitten.'
                        }
                    </p>
                    {savings > 0 && (
                        <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                            💰 Mögliche Rückforderung: {savings.toFixed(2)}€
                        </Badge>
                    )}
                    {analysis?.empfehlung && (
                        <p className="mt-4 text-sm text-purple-700 dark:text-purple-300 italic">
                            "{analysis.empfehlung}"
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
