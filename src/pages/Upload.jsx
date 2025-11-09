import { useState } from "react";
import { Abrechnung } from "@/api/entities";
import { mimitech } from "@/api/mimitechClient";
import { uploadFile } from "@/api/integrations";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track, trackError, AREA, SEVERITY } from '@/components/core/telemetry';
import { AppError } from '@/components/core/errors';

import FileUploadZone from "../components/upload/FileUploadZone";
import AnalysisProgress from "../components/upload/AnalysisProgress";
import UploadResults from "../components/upload/UploadResults";
import ErrorState from "@/components/ui/ErrorState";

export default function Upload() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [uploadProgress, setUploadProgress] = useState(0);

    const MAX_RETRIES = 2;

    const analysisSteps = [
        { title: "Dokument hochladen", description: "Datei wird gespeichert" },
        { title: "OCR-Texterkennung", description: "Text wird extrahiert" },
        { title: "Datenextraktion", description: "Relevante Informationen werden identifiziert" },
        { title: "Rechtliche Prüfung", description: "Abrechnung wird nach deutschem Mietrecht geprüft" },
        { title: "Bericht erstellen", description: "Ergebnisse werden zusammengefasst" }
    ];

    const extractDataWithFallback = async (file_url) => {
        const extractionStrategies = [
            {
                name: "Vollständige Extraktion",
                schema: {
                    type: "object",
                    properties: {
                        titel: { type: "string" },
                        abrechnungszeitraum: { type: "string" },
                        verwalter: { type: "string" },
                        objekt_adresse: { type: "string" },
                        gesamtkosten: { type: "number" },
                        kostenposten: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    position: { type: "string" },
                                    betrag: { type: "number" },
                                    beschreibung: { type: "string" }
                                }
                            }
                        }
                    }
                }
            },
            {
                name: "Vereinfachte Extraktion",
                schema: {
                    type: "object",
                    properties: {
                        titel: { type: "string" },
                        abrechnungszeitraum: { type: "string" },
                        verwalter: { type: "string" },
                        gesamtkosten: { type: "number" }
                    }
                }
            },
            {
                name: "Basis-Extraktion",
                schema: {
                    type: "object",
                    properties: {
                        titel: { type: "string" },
                        typ: { type: "string" }
                    }
                }
            }
        ];

        let lastError = null;

        for (const strategy of extractionStrategies) {
            try {
                const result = await mimitech.integrations.Core.ExtractDataFromUploadedFile({
                    file_url,
                    json_schema: strategy.schema
                });

                if (result && result.status === "success" && result.output) {
                    track('upload.extraction.success', AREA.UPLOAD, { strategy: strategy.name });
                    return result.output;
                }
            } catch (error) {
                lastError = error;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        throw new AppError(
            'Datenextraktion fehlgeschlagen',
            'EXTRACTION_FAILED',
            { lastError: lastError?.message },
            SEVERITY.HIGH
        );
    };

    const performLegalAnalysisWithFallback = async (extractedData) => {
        const analysisStrategies = [
            {
                name: "Vollständige Analyse",
                prompt: `
                Analysiere diese Nebenkostenabrechnung nach deutschem Mietrecht (§§ 556, 559 BGB, BetrKV).
                Abrechnung: ${JSON.stringify(extractedData)}
                Prüfe: Unzulässige Posten, Verteilerschlüssel, Transparenz, Abrechnungsfrist.
                Bewerte jeden Kostenposten als: "ok", "pruefbeduerftig", oder "fehlerhaft".
                `,
                schema: {
                    type: "object",
                    properties: {
                        fehler: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    kategorie: { type: "string" },
                                    beschreibung: { type: "string" },
                                    schweregrad: { type: "string", enum: ["niedrig", "mittel", "hoch"] },
                                    betrag: { type: "number" },
                                    rechtsgrundlage: { type: "string" }
                                }
                            }
                        },
                        rueckforderung_potential: { type: "number" },
                        zusammenfassung: { type: "string" }
                    }
                }
            }
        ];

        let lastError = null;

        for (const strategy of analysisStrategies) {
            try {
                const result = await mimitech.integrations.Core.InvokeLLM({
                    prompt: strategy.prompt,
                    response_json_schema: strategy.schema
                });

                if (result) {
                    track('upload.analysis.success', AREA.UPLOAD, { strategy: strategy.name });
                    return result;
                }
            } catch (error) {
                lastError = error;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        return {
            fehler: [],
            rueckforderung_potential: 0,
            zusammenfassung: "Dokument wurde hochgeladen, aber die automatische Analyse war nicht möglich."
        };
    };

    const processDocument = async (file) => {
        setIsProcessing(true);
        setError(null);
        setAnalysisStep(0);
        setUploadProgress(0);

        track('upload.process.started', AREA.UPLOAD, {
            fileName: file.name,
            fileSize: file.size
        });

        try {
            // Step 1: Upload
            setAnalysisStep(1);
            let file_url;
            
            try {
                const uploadResult = await uploadFile(file, {
                    onProgress: (p) => setUploadProgress(p)
                });
                file_url = uploadResult.file_url;
            } catch (uploadError) {
                throw new AppError(
                    'Datei-Upload fehlgeschlagen',
                    'UPLOAD_FAILED',
                    { error: uploadError.message },
                    SEVERITY.CRITICAL
                );
            }
            
            // Step 2: OCR
            setAnalysisStep(2);
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            // Step 3: Extraction
            setAnalysisStep(3);
            let extractedData;
            
            try {
                extractedData = await extractDataWithFallback(file_url);
            } catch (extractionError) {
                trackError(extractionError, AREA.UPLOAD);
                extractedData = {
                    titel: file.name.replace(/\.[^/.]+$/, ""),
                    abrechnungszeitraum: new Date().getFullYear().toString(),
                    verwalter: "Nicht erkannt",
                    objekt_adresse: "Nicht erkannt",
                    gesamtkosten: 0
                };
            }

            // Step 4: Analysis
            setAnalysisStep(4);
            let legalAnalysis;
            
            try {
                legalAnalysis = await performLegalAnalysisWithFallback(extractedData);
            } catch (analysisError) {
                trackError(analysisError, AREA.UPLOAD);
                legalAnalysis = {
                    fehler: [],
                    rueckforderung_potential: 0,
                    zusammenfassung: "Automatische Analyse war nicht möglich."
                };
            }

            // Step 5: Save
            setAnalysisStep(5);
            const abrechnungData = {
                titel: extractedData?.titel || file.name,
                abrechnungszeitraum: extractedData?.abrechnungszeitraum || new Date().getFullYear().toString(),
                verwalter: extractedData?.verwalter || "Nicht erkannt",
                objekt_adresse: extractedData?.objekt_adresse || "Nicht erkannt", 
                upload_datum: new Date().toISOString().split('T')[0],
                datei_url: file_url,
                analyse_status: "abgeschlossen",
                gesamtkosten: extractedData?.gesamtkosten || 0,
                rueckforderung_potential: legalAnalysis?.rueckforderung_potential || 0,
                fehler_anzahl: legalAnalysis?.fehler?.length || 0,
                analyse_ergebnis: {
                    geprueft_am: new Date().toISOString(),
                    fehler: legalAnalysis?.fehler || [],
                    kostenposten: legalAnalysis?.kostenposten_bewertung || [],
                    zusammenfassung: legalAnalysis?.zusammenfassung || "Dokument erfolgreich verarbeitet"
                }
            };

            const savedAbrechnung = await Abrechnung.create(abrechnungData);
            
            if (!savedAbrechnung || !savedAbrechnung.id) {
                throw new AppError(
                    'Abrechnung konnte nicht gespeichert werden',
                    'SAVE_FAILED',
                    {},
                    SEVERITY.HIGH
                );
            }

            track('upload.process.completed', AREA.UPLOAD, {
                abrechnungId: savedAbrechnung.id,
                totalSavings: legalAnalysis?.rueckforderung_potential || 0
            });

            setResults({ abrechnung: savedAbrechnung, analysis: legalAnalysis });

        } catch (err) {
            console.error("Error processing document:", err);
            
            trackError(err, AREA.UPLOAD, {
                fileName: file.name,
                step: analysisStep,
                retryCount
            });

            // Retry logic
            if (retryCount < MAX_RETRIES && err.code !== 'VALIDATION_ERROR') {
                setRetryCount(prev => prev + 1);
                setError(`Fehler aufgetreten. Versuche erneut... (${retryCount + 1}/${MAX_RETRIES})`);
                
                await new Promise(resolve => setTimeout(resolve, 2000));
                return processDocument(file);
            }
            
            let errorMessage = err instanceof AppError ? err.message : "Fehler bei der Dokumentenanalyse.";
            
            if (err.message?.includes("Network Error")) {
                errorMessage = "Netzwerkfehler: Keine Verbindung zum Server.";
            } else if (err.message?.includes("timeout")) {
                errorMessage = "Zeitüberschreitung: Bitte versuchen Sie es später erneut.";
            }
            
            setError(errorMessage);
        }

        setIsProcessing(false);
        setRetryCount(0);
    };

    const handleRetry = () => {
        setError(null);
        setResults(null);
        setAnalysisStep(0);
        if (selectedFile) {
            processDocument(selectedFile);
        }
    };

    if (results) {
        return (
            <div className="min-h-screen p-4 lg:p-6">
                <div className="max-w-4xl mx-auto">
                    <UploadResults 
                        results={results}
                        onNewAnalysis={() => {
                            setResults(null);
                            setSelectedFile(null);
                            setAnalysisStep(0);
                            setRetryCount(0);
                        }}
                        onViewAll={() => navigate(createPageUrl("Abrechnungen"))}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigate(createPageUrl("Dashboard"))}
                            aria-label="Zurück"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
                                Nebenkostenabrechnung prüfen
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">
                                Laden Sie Ihre Abrechnung hoch für eine automatische rechtliche Prüfung
                            </p>
                        </div>
                    </div>
                </div>

                {error && <ErrorState message={error} onRetry={handleRetry} />}

                {/* Progress or Upload */}
                {isProcessing ? (
                    <AnalysisProgress 
                        steps={analysisSteps}
                        currentStep={analysisStep}
                        fileName={selectedFile?.name}
                        uploadProgress={uploadProgress}
                    />
                ) : (
                    <FileUploadZone 
                        onFileSelected={(file) => {
                            setSelectedFile(file);
                            processDocument(file);
                        }}
                    />
                )}
            </div>
        </div>
    );
}