import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export default function Impressum() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Impressum</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                    Rechtliche Informationen gemäß § 5 TMG
                </p>
            </div>

            <Card className="border-none shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-blue-600" />
                        Anbieterinformationen
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Unternehmen</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                MiMiCheck GmbH (in Gründung)<br/>
                                Vertreten durch: [Geschäftsführername]<br/>
                                HRB: [Registernummer]<br/>
                                Amtsgericht: [Ort]
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Adresse
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                [Straße und Hausnummer]<br/>
                                [PLZ] [Stadt]<br/>
                                Deutschland
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-200/60">
                        <div>
                            <h3 className="font-semibold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Kontakt
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                E-Mail: info@staatshilfen.ai<br/>
                                Support: support@staatshilfen.ai
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Steuerliche Angaben</h3>
                            <p className="text-slate-600 dark:text-slate-300">
                                Umsatzsteuer-ID: [DE123456789]<br/>
                                Steuernummer: [123/456/78910]
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
                <CardHeader>
                    <CardTitle>Haftungsausschluss</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Haftung für Inhalte</h4>
                        <p>
                            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                            Die Nutzung der KI-Empfehlungen erfolgt auf eigene Verantwortung.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Rechtliche Beratung</h4>
                        <p>
                            MiMiCheck stellt keine Rechtsberatung dar. Bei rechtlichen Fragen wenden Sie sich 
                            bitte an einen qualifizierten Rechtsanwalt oder Steuerberater.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}