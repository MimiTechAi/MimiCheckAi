import { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { mimitech } from '@/api/mimitechClient';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    Upload,
    Download,
    FileText,
    User as UserIcon,
    AlertTriangle,
    CheckCircle,
    ArrowLeft,
    Loader2,
    Sparkles,
    Eye,
    Info,
    XCircle
} from 'lucide-react';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import SuccessToast from '@/components/ui/SuccessToast';

export default function PdfAutofill() {
    const [searchParams] = useSearchParams();
    const formType = searchParams.get('type');
    
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [filledPdfUrl, setFilledPdfUrl] = useState(null);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [stats, setStats] = useState(null);
    const [pdfAnalysis, setPdfAnalysis] = useState(null);

    const formInfo = {
        buergergeld: {
            title: 'Bürgergeld-Antrag',
            description: 'Antrag auf Leistungen nach dem SGB II (Bürgergeld)',
            officialUrl: 'https://www.arbeitsagentur.de/datei/antrag-sgb2_ba042689.pdf',
            color: 'from-red-500 to-orange-500',
        },
        wohngeld: {
            title: 'Wohngeld-Antrag',
            description: 'Antrag auf Wohngeld (Mietzuschuss oder Lastenzuschuss)',
            officialUrl: 'https://www.bmas.de/SharedDocs/Downloads/DE/Formulare/wohngeldantrag.pdf',
            color: 'from-blue-500 to-indigo-500',
        }
    };

    const currentForm = formInfo[formType] || formInfo.buergergeld;

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await User.me();
                setUser(currentUser);
            } catch (error) {
                console.error('Fehler beim Laden des Nutzers:', error);
                setError('Bitte melden Sie sich an, um diese Funktion zu nutzen.');
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    const calculateCompleteness = () => {
        if (!user) return 0;
        
        const requiredData = {
            vorname: user.vorname,
            nachname: user.nachname,
            geburtsdatum: user.geburtsdatum,
            plz: user.lebenssituation?.wohnadresse?.plz,
            ort: user.lebenssituation?.wohnadresse?.ort,
            strasse: user.lebenssituation?.wohnadresse?.strasse,
            monatliches_nettoeinkommen: user.lebenssituation?.monatliches_nettoeinkommen,
        };

        if (formType === 'wohngeld') {
            requiredData.monatliche_miete_kalt = user.lebenssituation?.monatliche_miete_kalt;
            requiredData.wohnflaeche_qm = user.lebenssituation?.wohnflaeche_qm;
        }

        const totalFields = Object.keys(requiredData).length;
        const filledFields = Object.values(requiredData).filter(v => v !== null && v !== undefined && v !== '').length;
        
        return Math.round((filledFields / totalFields) * 100);
    };

    const completeness = calculateCompleteness();

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Bitte laden Sie eine PDF-Datei hoch.');
            return;
        }

        setError(null);
        setUploadedFile(file);
        setPdfAnalysis(null);

        // PDF hochladen und analysieren
        try {
            setIsAnalyzing(true);
            const { file_url } = await mimitech.integrations.Core.UploadFile({ file });
            setUploadedFileUrl(file_url);

            // PDF analysieren
            const analysisResponse = await mimitech.functions.invoke('analyzePdfFields', {
                pdfUrl: file_url
            });

            if (analysisResponse.status === 200 && analysisResponse.data) {
                setPdfAnalysis(analysisResponse.data);
                
                if (!analysisResponse.data.hasFormFields) {
                    setError('⚠️ Dieses PDF hat keine ausfüllbaren Formularfelder und kann nicht automatisch ausgefüllt werden. Bitte laden Sie ein Formular mit ausfüllbaren Feldern hoch.');
                }
            }
        } catch (error) {
            console.error('Fehler beim Analysieren:', error);
            setError('PDF konnte nicht analysiert werden. Bitte versuchen Sie es erneut.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleFillPdf = async () => {
        if (!uploadedFileUrl) {
            setError('Bitte laden Sie zuerst eine PDF-Datei hoch.');
            return;
        }

        if (pdfAnalysis && !pdfAnalysis.hasFormFields) {
            setError('Dieses PDF kann nicht automatisch ausgefüllt werden, da es keine Formularfelder hat.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const response = await mimitech.functions.invoke('fillPdfForm', {
                formType: formType,
                pdfUrl: uploadedFileUrl
            });

            if (response.status !== 200) {
                throw new Error(response.data?.error || 'Fehler beim Ausfüllen des PDFs');
            }

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            setFilledPdfUrl(url);

            const filledFields = parseInt(response.headers['x-filled-fields'] || '0');
            const skippedFields = parseInt(response.headers['x-skipped-fields'] || '0');
            setStats({ filledFields, skippedFields });

            setShowSuccess(true);
        } catch (error) {
            console.error('Fehler beim Ausfüllen:', error);
            setError(error.message || 'PDF konnte nicht ausgefüllt werden. Bitte versuchen Sie es erneut.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!filledPdfUrl) return;
        
        const link = document.createElement('a');
        link.href = filledPdfUrl;
        link.download = `${formType}_ausgefuellt_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return <LoadingState message="Lade Profildaten..." fullScreen />;
    }

    if (!formType || !formInfo[formType]) {
        return (
            <ErrorState
                title="Ungültiger Antragstyp"
                message="Bitte wählen Sie einen gültigen Antragstyp."
                fullScreen
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <SuccessToast
                message="PDF erfolgreich ausgefüllt!"
                isVisible={showSuccess}
                onClose={() => setShowSuccess(false)}
            />

            {/* Header */}
            <div className="flex items-center justify-between">
                <Link to={createPageUrl('Antraege')}>
                    <Button variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Zurück
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">KI-Ausfüllhilfe</h1>
                </div>
            </div>

            {/* Form Info */}
            <Card className={`shadow-xl border-none bg-gradient-to-br ${currentForm.color} text-white`}>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-2xl mb-2">{currentForm.title}</CardTitle>
                            <p className="text-white/90">{currentForm.description}</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Profile Completeness */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5" />
                        Profil-Vollständigkeit
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">
                                {completeness < 50 && 'Unvollständig'}
                                {completeness >= 50 && completeness < 80 && 'Fast vollständig'}
                                {completeness >= 80 && 'Vollständig'}
                            </span>
                            <span className="font-semibold">{completeness}%</span>
                        </div>
                        <Progress value={completeness} className="h-2" />
                    </div>

                    {completeness < 80 && (
                        <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800 dark:text-amber-300">
                                Ihr Profil ist zu {100 - completeness}% unvollständig. 
                                Für optimales Ausfüllen vervollständigen Sie bitte Ihr Profil.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Link to={createPageUrl('Lebenslagen')}>
                        <Button variant="outline" className="w-full">
                            <UserIcon className="w-4 h-4 mr-2" />
                            Profil vervollständigen
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Upload Section */}
            {!filledPdfUrl && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            PDF-Formular hochladen
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Laden Sie das offizielle {currentForm.title}-Formular hoch, 
                                und wir füllen es automatisch mit Ihren Profildaten aus.
                            </p>
                            <a 
                                href={currentForm.officialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                            >
                                <FileText className="w-4 h-4" />
                                Offizielles Formular herunterladen
                            </a>
                        </div>

                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="pdf-upload"
                                disabled={isAnalyzing}
                            />
                            <label htmlFor="pdf-upload" className="cursor-pointer">
                                {isAnalyzing ? (
                                    <div className="space-y-2">
                                        <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-600" />
                                        <p className="font-semibold text-slate-800 dark:text-white">
                                            PDF wird analysiert...
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Prüfe Formularfelder
                                        </p>
                                    </div>
                                ) : uploadedFile ? (
                                    <div className="space-y-2">
                                        <CheckCircle className="w-12 h-12 mx-auto text-green-600" />
                                        <p className="font-semibold text-slate-800 dark:text-white">
                                            {uploadedFile.name}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {(uploadedFile.size / 1024).toFixed(1)} KB
                                        </p>
                                        <Button variant="outline" size="sm" asChild>
                                            <label htmlFor="pdf-upload" className="cursor-pointer">
                                                Andere Datei wählen
                                            </label>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Upload className="w-12 h-12 mx-auto text-slate-400" />
                                        <p className="font-semibold text-slate-800 dark:text-white">
                                            PDF-Datei hochladen
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Klicken oder Drag & Drop
                                        </p>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* PDF Analysis Results */}
                        {pdfAnalysis && (
                            <Card className={pdfAnalysis.hasFormFields ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:bg-red-900/20'}>
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        {pdfAnalysis.hasFormFields ? (
                                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        )}
                                        <div className="flex-1">
                                            <p className={`font-semibold mb-2 ${pdfAnalysis.hasFormFields ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                                                {pdfAnalysis.hasFormFields 
                                                    ? `✅ ${pdfAnalysis.fieldCount} ausfüllbare Felder gefunden`
                                                    : '❌ Keine ausfüllbaren Felder gefunden'
                                                }
                                            </p>
                                            {pdfAnalysis.hasFormFields ? (
                                                <div className="space-y-2">
                                                    <p className="text-sm text-green-700 dark:text-green-300">
                                                        Dieses PDF kann automatisch ausgefüllt werden.
                                                    </p>
                                                    {pdfAnalysis.suggestions && pdfAnalysis.suggestions.length > 0 && (
                                                        <div className="mt-3">
                                                            <p className="text-xs font-semibold text-green-800 dark:text-green-200 mb-2">
                                                                🤖 KI-Vorschau ({pdfAnalysis.suggestions.length} Felder):
                                                            </p>
                                                            <div className="space-y-1 max-h-32 overflow-y-auto">
                                                                {pdfAnalysis.suggestions.slice(0, 5).map((suggestion, i) => (
                                                                    <div key={i} className="text-xs text-green-700 dark:text-green-300 flex items-center gap-2">
                                                                        <Badge variant="outline" className="text-xs">
                                                                            {(suggestion.confidence * 100).toFixed(0)}%
                                                                        </Badge>
                                                                        <span className="font-mono">{suggestion.fieldName}</span>
                                                                        <span>→</span>
                                                                        <span className="font-semibold">{suggestion.suggestedValue}</span>
                                                                    </div>
                                                                ))}
                                                                {pdfAnalysis.suggestions.length > 5 && (
                                                                    <p className="text-xs text-green-600 dark:text-green-400 italic">
                                                                        +{pdfAnalysis.suggestions.length - 5} weitere Felder
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <p className="text-sm text-red-700 dark:text-red-300">
                                                        {pdfAnalysis.warning || 'Dieses PDF kann nicht automatisch ausgefüllt werden.'}
                                                    </p>
                                                    <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
                                                        <Info className="h-4 w-4 text-amber-600" />
                                                        <AlertDescription className="text-amber-800 dark:text-amber-300 text-xs">
                                                            <strong>Tipp:</strong> Viele Behörden-PDFs haben keine ausfüllbaren Felder. 
                                                            Laden Sie stattdessen ein offizielles Formular mit Formularfeldern hoch, 
                                                            oder nutzen Sie unseren Web-Assistenten für Online-Formulare.
                                                        </AlertDescription>
                                                    </Alert>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {error && <ErrorState message={error} />}

                        <Button
                            onClick={handleFillPdf}
                            disabled={!uploadedFileUrl || isProcessing || isAnalyzing || (pdfAnalysis && !pdfAnalysis.hasFormFields)}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            size="lg"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Formular wird ausgefüllt...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Formular automatisch ausfüllen
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Results */}
            {filledPdfUrl && (
                <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
                            <CheckCircle className="w-6 h-6" />
                            PDF erfolgreich ausgefüllt!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {stats && (
                            <div className="grid grid-cols-2 gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-green-600">{stats.filledFields}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Felder ausgefüllt</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-slate-400">{stats.skippedFields}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Felder übersprungen</p>
                                </div>
                            </div>
                        )}

                        <iframe
                            src={filledPdfUrl}
                            className="w-full h-96 border border-slate-300 dark:border-slate-600 rounded-xl"
                            title="Ausgefülltes PDF"
                        />

                        <div className="flex gap-3">
                            <Button
                                onClick={handleDownload}
                                className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                PDF herunterladen
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setFilledPdfUrl(null);
                                    setUploadedFile(null);
                                    setUploadedFileUrl(null);
                                    setStats(null);
                                    setPdfAnalysis(null);
                                }}
                            >
                                Neues Formular ausfüllen
                            </Button>
                        </div>

                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                <strong>Wichtig:</strong> Bitte prüfen Sie alle ausgefüllten Felder vor dem Einreichen des Antrags. 
                                Nicht alle Felder können automatisch ausgefüllt werden.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}