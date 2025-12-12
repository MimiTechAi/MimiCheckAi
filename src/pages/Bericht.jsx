import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Abrechnung } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
    ArrowLeft, 
    FileText, 
    CheckCircle, 
    AlertTriangle,
    DollarSign,
    Calendar,
    Building,
    MapPin,
    Download,
    Sparkles,
    ExternalLink,
    Info,
    AlertCircle,
    Lightbulb,
    ClipboardList,
    Euro,
    User,
    Home,
    Receipt,
    FileCheck,
    Printer
} from 'lucide-react';
import { createPageUrl } from '@/utils';

// Dokumenttyp-Konfiguration für benutzerfreundliche Anzeige
const DOKUMENTTYP_CONFIG = {
    'Nebenkostenabrechnung': { icon: Receipt, color: 'blue', label: 'Nebenkostenabrechnung' },
    'Betriebskostenabrechnung': { icon: Receipt, color: 'blue', label: 'Betriebskostenabrechnung' },
    'Mietvertrag': { icon: FileText, color: 'purple', label: 'Mietvertrag' },
    'Gehaltsabrechnung': { icon: Euro, color: 'green', label: 'Gehaltsabrechnung' },
    'Lohnzettel': { icon: Euro, color: 'green', label: 'Lohnzettel' },
    'Steuerbescheid': { icon: FileCheck, color: 'amber', label: 'Steuerbescheid' },
    'Rechnung': { icon: Receipt, color: 'slate', label: 'Rechnung' },
    'Kontoauszug': { icon: DollarSign, color: 'emerald', label: 'Kontoauszug' },
    'Behördenschreiben': { icon: Building, color: 'red', label: 'Behördenschreiben' },
    'Personalausweis': { icon: User, color: 'indigo', label: 'Personalausweis' },
    'Versicherungspolice': { icon: FileCheck, color: 'cyan', label: 'Versicherungspolice' },
    'default': { icon: FileText, color: 'slate', label: 'Dokument' }
};

export default function Bericht() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [abrechnung, setAbrechnung] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('Keine Bericht-ID angegeben');
            setLoading(false);
            return;
        }

        const loadAbrechnung = async () => {
            try {
                const data = await Abrechnung.get(id);
                if (!data) {
                    throw new Error('Bericht nicht gefunden');
                }
                setAbrechnung(data);
            } catch (err) {
                console.error('Fehler beim Laden:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAbrechnung();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-full bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400">Bericht wird geladen...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-full bg-slate-950 text-white p-8">
                <div className="max-w-2xl mx-auto text-center">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-4">Fehler</h1>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <Button onClick={() => navigate(createPageUrl('Abrechnungen'))}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück zu Abrechnungen
                    </Button>
                </div>
            </div>
        );
    }

    const extractedData = abrechnung?.extracted_data || {};
    const analysisResults = abrechnung?.analysis_results || {};
    
    // Dokumenttyp-Konfiguration holen
    const dokumenttyp = extractedData.dokumenttyp || 'default';
    const typConfig = DOKUMENTTYP_CONFIG[dokumenttyp] || DOKUMENTTYP_CONFIG['default'];
    const TypeIcon = typConfig.icon;
    const confidence = extractedData.dokumenttyp_confidence || 0;
    
    // Wichtige Hinweise und Handlungsbedarf
    const wichtigeHinweise = extractedData.wichtige_hinweise || [];
    const handlungsbedarf = extractedData.handlungsbedarf || false;
    const zusammenfassung = extractedData.zusammenfassung || '';
    
    // Kostenposten für Tabelle
    const einzelposten = extractedData.einzelposten || [];
    
    return (
        <div className="min-h-full bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)}
                        className="text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                    </Button>
                    <Button 
                        variant="outline"
                        onClick={() => window.print()}
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        Drucken
                    </Button>
                </div>

                {/* Dokumenttyp-Karte - PROMINENT */}
                <Card className={`bg-gradient-to-br from-${typConfig.color}-500/20 to-${typConfig.color}-600/10 border-${typConfig.color}-500/30 mb-6`}>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                            <div className={`w-20 h-20 bg-${typConfig.color}-500/20 rounded-2xl flex items-center justify-center`}>
                                <TypeIcon className={`w-10 h-10 text-${typConfig.color}-400`} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold text-white">
                                        {typConfig.label}
                                    </h1>
                                    {confidence > 0 && (
                                        <Badge className={`bg-${typConfig.color}-500/20 text-${typConfig.color}-400 border-${typConfig.color}-500/30`}>
                                            {confidence}% sicher
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-slate-400">
                                    {extractedData.titel || abrechnung?.title || abrechnung?.filename || 'Dokument'}
                                </p>
                                <p className="text-slate-500 text-sm mt-1">
                                    Analysiert am {new Date(abrechnung?.created_at).toLocaleDateString('de-DE', { 
                                        day: '2-digit', 
                                        month: 'long', 
                                        year: 'numeric' 
                                    })}
                                </p>
                            </div>
                        </div>
                        
                        {/* Konfidenz-Balken */}
                        {confidence > 0 && (
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-slate-400 mb-1">
                                    <span>Erkennungs-Sicherheit</span>
                                    <span>{confidence}%</span>
                                </div>
                                <Progress value={confidence} className="h-2" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Zusammenfassung - In einfacher Sprache */}
                {zusammenfassung && (
                    <Card className="bg-slate-900/50 border-white/10 mb-6">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">Zusammenfassung</h3>
                                    <p className="text-slate-300 leading-relaxed">{zusammenfassung}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Handlungsbedarf - Auffällig wenn ja */}
                {handlungsbedarf && (
                    <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 mb-6">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-amber-400 mb-2">⚠️ Handlungsbedarf erkannt</h3>
                                    <p className="text-slate-300">
                                        Bei diesem Dokument wurden Punkte gefunden, die Ihre Aufmerksamkeit erfordern. 
                                        Prüfen Sie die wichtigen Hinweise unten.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Wichtige Hinweise - Als farbige Karten */}
                {wichtigeHinweise.length > 0 && (
                    <Card className="bg-slate-900/50 border-white/10 mb-6">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-400" />
                                Wichtige Hinweise
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {wichtigeHinweise.map((hinweis, index) => (
                                <div 
                                    key={index}
                                    className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"
                                >
                                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-300">{hinweis}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Extrahierte Daten - Übersichtlich */}
                <Card className="bg-slate-900/50 border-white/10 mb-6">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-emerald-400" />
                            Erkannte Informationen
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {extractedData.datum && (
                                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="text-slate-500 text-xs">Datum</p>
                                        <p className="text-white">{extractedData.datum}</p>
                                    </div>
                                </div>
                            )}
                            
                            {extractedData.abrechnungszeitraum && (
                                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="text-slate-500 text-xs">Zeitraum</p>
                                        <p className="text-white">{extractedData.abrechnungszeitraum}</p>
                                    </div>
                                </div>
                            )}
                            
                            {(extractedData.absender || extractedData.verwalter) && (
                                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                                    <Building className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="text-slate-500 text-xs">Absender</p>
                                        <p className="text-white">{extractedData.absender || extractedData.verwalter}</p>
                                    </div>
                                </div>
                            )}
                            
                            {(extractedData.empfaenger || extractedData.name) && (
                                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                                    <User className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="text-slate-500 text-xs">Empfänger</p>
                                        <p className="text-white">{extractedData.empfaenger || extractedData.name}</p>
                                    </div>
                                </div>
                            )}
                            
                            {(extractedData.objekt_adresse || extractedData.adresse) && (
                                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                                    <Home className="w-5 h-5 text-slate-500" />
                                    <div>
                                        <p className="text-slate-500 text-xs">Adresse</p>
                                        <p className="text-white">{extractedData.objekt_adresse || extractedData.adresse}</p>
                                    </div>
                                </div>
                            )}
                            
                            {(extractedData.gesamtbetrag || extractedData.gesamtkosten) && (
                                <div className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                    <Euro className="w-5 h-5 text-emerald-400" />
                                    <div>
                                        <p className="text-emerald-400 text-xs">Gesamtbetrag</p>
                                        <p className="text-emerald-400 text-xl font-bold">
                                            {typeof (extractedData.gesamtbetrag || extractedData.gesamtkosten) === 'number' 
                                                ? `${(extractedData.gesamtbetrag || extractedData.gesamtkosten).toFixed(2)} €`
                                                : `${extractedData.gesamtbetrag || extractedData.gesamtkosten} €`}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {Object.keys(extractedData).length === 0 && (
                            <p className="text-slate-500 text-center py-8">
                                Keine Daten konnten aus diesem Dokument extrahiert werden.
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Kostenposten-Tabelle wenn vorhanden */}
                {einzelposten.length > 0 && (
                    <Card className="bg-slate-900/50 border-white/10 mb-6">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Receipt className="w-5 h-5 text-blue-400" />
                                Kostenaufstellung
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="text-left py-3 px-4 text-slate-400 font-medium">Position</th>
                                            <th className="text-right py-3 px-4 text-slate-400 font-medium">Betrag</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {einzelposten.map((posten, index) => (
                                            <tr key={index} className="border-b border-slate-800">
                                                <td className="py-3 px-4 text-white">
                                                    {posten.bezeichnung || posten.position || `Position ${index + 1}`}
                                                </td>
                                                <td className="py-3 px-4 text-right text-white font-medium">
                                                    {typeof posten.betrag === 'number' 
                                                        ? `${posten.betrag.toFixed(2)} €`
                                                        : posten.betrag || '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Aktionen */}
                <div className="flex flex-wrap gap-4">
                    <Button 
                        onClick={() => navigate(createPageUrl('Upload'))}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        Neues Dokument analysieren
                    </Button>
                    
                    <Button 
                        variant="outline"
                        onClick={() => navigate(createPageUrl('Abrechnungen'))}
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        Alle Dokumente
                    </Button>
                    
                    <Button 
                        variant="outline"
                        onClick={() => navigate(`${createPageUrl('Assistent')}?documentId=${id}`)}
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        KI-Assistent zu diesem Dokument
                    </Button>
                </div>
            </div>
        </div>
    );
}
