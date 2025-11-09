import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Bot, Cookie } from 'lucide-react';

export default function Datenschutz() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Datenschutzerklärung</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                    Gemäß Art. 13, 14 DSGVO • Stand: Januar 2025
                </p>
            </div>

            <Card className="border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-green-600" />
                        Ihre Daten sind sicher
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 dark:text-slate-300">
                        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre Daten 
                        vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser 
                        Datenschutzerklärung.
                    </p>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-none shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg">
                            <Database className="w-5 h-5 text-blue-600" />
                            Welche Daten wir sammeln
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 dark:text-slate-300 space-y-3">
                        <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">Google Login:</h4>
                            <p>Name, E-Mail-Adresse (zur Kontenerstellung)</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">Profildaten:</h4>
                            <p>Einkommen, Familienstand, Wohnsituation (für Förderprüfung)</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">Dokumente:</h4>
                            <p>Nebenkostenabrechnungen (zur rechtlichen Analyse)</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-lg">
                            <Bot className="w-5 h-5 text-purple-600" />
                            KI & Datenverarbeitung
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 dark:text-slate-300 space-y-3">
                        <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">Zweck:</h4>
                            <p>Automatische Prüfung von Förderansprüchen und Nebenkostenabrechnungen</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">Anonymisierung:</h4>
                            <p>Daten werden für KI-Analyse pseudonymisiert</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800 dark:text-white">Keine Weitergabe:</h4>
                            <p>Ihre Daten werden nicht an Dritte verkauft</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-xl">
                <CardHeader>
                    <CardTitle>Ihre Rechte</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Auskunft</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            Sie haben das Recht auf Auskunft über Ihre gespeicherten Daten.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Löschung</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            Sie können jederzeit die Löschung Ihrer Daten beantragen.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Widerruf</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            Einverständnisse können jederzeit widerrufen werden.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardContent className="p-6">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4">Kontakt zum Datenschutzbeauftragten</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Bei Fragen zum Datenschutz kontaktieren Sie uns unter: <br/>
                        <strong>datenschutz@staatshilfen.ai</strong>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}