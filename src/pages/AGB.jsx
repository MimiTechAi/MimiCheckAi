import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UserCheck, ShieldOff } from 'lucide-react';

export default function AGB() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Allgemeine Geschäftsbedingungen</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                    Stand: Januar 2025
                </p>
            </div>

            <Card className="border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        § 1 Geltungsbereich & Vertragsgegenstand
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300 space-y-2">
                    <p>Diese AGB regeln die Nutzung der Plattform MiMiCheck.</p>
                    <p>Gegenstand ist die Bereitstellung einer KI-gestützten Software zur Analyse von Ansprüchen auf staatliche Leistungen und Prüfung von Nebenkostenabrechnungen.</p>
                </CardContent>
            </Card>
            
            <Card className="border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <UserCheck className="w-6 h-6 text-green-600" />
                        § 2 Pflichten des Nutzers
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300 space-y-2">
                    <p>Der Nutzer ist für die Richtigkeit der eingegebenen Daten verantwortlich. Falsche Angaben können zu fehlerhaften Ergebnissen führen.</p>
                    <p>Die Zugangsdaten sind geheim zu halten.</p>
                </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <ShieldOff className="w-6 h-6 text-red-600" />
                        § 3 Haftungsbeschränkung
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300 space-y-2">
                    <p>MiMiCheck übernimmt keine Garantie für die Richtigkeit der Analyseergebnisse. Die Plattform stellt keine Rechts- oder Steuerberatung dar.</p>
                    <p>Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen.</p>
                </CardContent>
            </Card>
        </div>
    );
}