import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, UserCheck, ShieldOff, CheckCircle, AlertCircle, Scale, Bot, Lock, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AGB() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">
            {/* Hero Header */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/assets/images/agb-header.png"
                        alt="AGB Background"
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-6 backdrop-blur-md">
                        <Scale className="w-4 h-4" />
                        Allgemeine Geschäftsbedingungen
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">
                        {t('agbPage.title', 'AGB')}
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {t('agbPage.subtitle', 'Hier finden Sie unsere Nutzungsbedingungen für MiMiCheck.')}
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20 space-y-6">

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
                    <p className="text-slate-300 text-center">
                        Stand: November 2025
                    </p>
                </div>

                {/* Section 1: Geltungsbereich */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    1. Geltungsbereich
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der MiMi Tech Ai UG (haftungsbeschränkt), Lindenplatz 23, 75378 Bad Liebenzell (nachfolgend "Anbieter") und dem Nutzer (nachfolgend "Kunde") über die Nutzung der Plattform MiMiCheck.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 2: Vertragsgegenstand */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    2. Vertragsgegenstand
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        MiMiCheck ist eine digitale Plattform zur Unterstützung bei der Beantragung von Förderungen und Leistungen. Die Plattform nutzt KI-Systeme zur Analyse von Dokumenten und zum automatischen Ausfüllen von Antragsformularen.
                                    </p>
                                    <p>Der Anbieter stellt folgende Leistungen bereit:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Upload und Analyse von Dokumenten (Abrechnungen, Nachweise)</li>
                                        <li>Identifikation passender Förderungen und Leistungen</li>
                                        <li>Automatisches Vorausfüllen von Antragsformularen</li>
                                        <li>Überprüfung und Freigabe durch qualifizierte Mitarbeiter</li>
                                        <li>Unterstützung bei der Einreichung von Anträgen</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 3: Vertragsschluss */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <UserCheck className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    3. Vertragsschluss und Registrierung
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Der Vertrag kommt durch die Registrierung des Kunden auf der Plattform MiMiCheck zustande. Mit der Registrierung akzeptiert der Kunde diese AGB.
                                    </p>
                                    <p>
                                        Der Kunde ist verpflichtet, bei der Registrierung wahrheitsgemäße und vollständige Angaben zu machen. Änderungen der Daten sind dem Anbieter unverzüglich mitzuteilen.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 4: Leistungsumfang */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    4. Leistungsumfang und Nutzung
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Der Anbieter stellt die Plattform in der jeweils aktuellen Version zur Verfügung. Der Kunde hat keinen Anspruch auf eine bestimmte Funktionalität oder Verfügbarkeit.
                                    </p>
                                    <p>
                                        Der Anbieter behält sich das Recht vor, die Plattform jederzeit zu ändern, zu erweitern oder einzuschränken, soweit dies für den Kunden zumutbar ist.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 5: KI-Systeme */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Bot className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    5. KI-Systeme und Haftung
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>Die Plattform nutzt KI-Systeme zur Analyse und Verarbeitung von Dokumenten. Der Anbieter weist darauf hin, dass:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>KI-Systeme Fehler machen können</li>
                                        <li>Alle KI-Vorschläge von qualifizierten Mitarbeitern überprüft werden</li>
                                        <li>Der Kunde die finale Verantwortung für die Richtigkeit der Angaben trägt</li>
                                        <li>Der Kunde alle Vorschläge vor der Einreichung prüfen muss</li>
                                    </ul>
                                    <p>
                                        Der Anbieter haftet nicht für Schäden, die durch fehlerhafte KI-Vorschläge entstehen, sofern diese vom Kunden nicht geprüft wurden.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 6: Pflichten des Kunden */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <UserCheck className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    6. Pflichten des Kunden
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>Der Kunde verpflichtet sich:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Die Plattform nur für rechtmäßige Zwecke zu nutzen</li>
                                        <li>Wahrheitsgemäße und vollständige Angaben zu machen</li>
                                        <li>Hochgeladene Dokumente auf Richtigkeit zu prüfen</li>
                                        <li>KI-generierte Vorschläge vor der Einreichung zu überprüfen</li>
                                        <li>Seine Zugangsdaten geheim zu halten</li>
                                        <li>Den Anbieter unverzüglich über Missbrauch zu informieren</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 7: Datenschutz */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Lock className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    7. Datenschutz und Vertraulichkeit
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Der Anbieter verpflichtet sich, alle personenbezogenen Daten des Kunden gemäß den geltenden Datenschutzbestimmungen (DSGVO) zu verarbeiten. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
                                    </p>
                                    <p>
                                        Der Anbieter behandelt alle hochgeladenen Dokumente und Informationen vertraulich und gibt diese nicht an Dritte weiter, sofern dies nicht zur Erfüllung des Vertragszwecks erforderlich ist.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 8: Vergütung */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    8. Vergütung und Zahlungsbedingungen
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Die Nutzung der Plattform kann kostenlos oder kostenpflichtig sein. Die jeweils gültigen Preise werden auf der Plattform angezeigt.
                                    </p>
                                    <p>
                                        Zahlungen sind im Voraus fällig. Der Anbieter behält sich das Recht vor, die Nutzung bei Zahlungsverzug zu sperren.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 9: Laufzeit und Kündigung */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <AlertCircle className="w-6 h-6 text-amber-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    9. Laufzeit und Kündigung
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Der Vertrag wird auf unbestimmte Zeit geschlossen. Beide Parteien können den Vertrag jederzeit mit einer Frist von 14 Tagen kündigen.
                                    </p>
                                    <p>Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Ein wichtiger Grund liegt insbesondere vor bei:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Verstoß gegen diese AGB</li>
                                        <li>Missbrauch der Plattform</li>
                                        <li>Zahlungsverzug von mehr als 30 Tagen</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 10: Haftung */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <ShieldOff className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    10. Haftung
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
                                    </p>
                                    <p>
                                        Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
                                    </p>
                                    <p>
                                        Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 11: Gewährleistung */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    11. Gewährleistung
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Der Anbieter gewährleistet, dass die Plattform im Wesentlichen die beschriebenen Funktionen erfüllt. Kleinere Abweichungen oder Fehler, die die Nutzung nicht wesentlich beeinträchtigen, begründen keine Gewährleistungsansprüche.
                                    </p>
                                    <p>
                                        Der Anbieter ist berechtigt, Mängel durch Nachbesserung oder Ersatzlieferung zu beheben. Schlägt die Nacherfüllung fehl, kann der Kunde nach seiner Wahl Minderung verlangen oder vom Vertrag zurücktreten.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 12: EU AI Act */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Scale className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    12. EU AI Act Konformität
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Der Anbieter verpflichtet sich, die Anforderungen des EU AI Act (Verordnung (EU) 2024/1689) einzuhalten. Insbesondere:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Transparente Information über den Einsatz von KI-Systemen</li>
                                        <li>Menschliche Aufsicht bei allen KI-Entscheidungen</li>
                                        <li>Dokumentation und Nachvollziehbarkeit von KI-Vorschlägen</li>
                                        <li>Risikoklassifizierung als "Limited Risk AI"</li>
                                        <li>Regelmäßige Überprüfung und Verbesserung der KI-Systeme</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 13: Änderungen der AGB */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-amber-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    13. Änderungen der AGB
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Der Anbieter behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden dem Kunden per E-Mail mitgeteilt. Widerspricht der Kunde nicht innerhalb von 14 Tagen, gelten die geänderten AGB als akzeptiert.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 14: Schlussbestimmungen */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Scale className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    14. Schlussbestimmungen
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>
                                        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                                    </p>
                                    <p>
                                        Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist, soweit gesetzlich zulässig, der Sitz des Anbieters.
                                    </p>
                                    <p>
                                        Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Section 15: Kontakt */}
                <Card className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                    <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                    15. Kontakt
                                </h2>
                                <div className="space-y-4 text-slate-400 leading-relaxed">
                                    <p>Bei Fragen zu diesen AGB wenden Sie sich bitte an:</p>
                                    <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                        <p className="font-semibold text-white">MiMi Tech Ai UG (haftungsbeschränkt)</p>
                                        <p>Lindenplatz 23</p>
                                        <p>75378 Bad Liebenzell</p>
                                        <p>Deutschland</p>
                                        <p className="mt-2">
                                            E-Mail: <a href="mailto:info@mimitechai.com" className="text-blue-400 hover:underline">info@mimitechai.com</a><br />
                                            Telefon: <a href="tel:+4915758805737" className="text-blue-400 hover:underline">+49 1575 8805737</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-emerald-900/20 border border-white/5 text-center">
                    <p className="text-slate-400 text-sm">
                        Diese AGB regeln die vertraglichen Beziehungen zwischen MiMi Tech Ai UG und den Nutzern der Plattform. <br />
                        Bei Fragen wenden Sie sich bitte an unseren Support.
                    </p>
                </div>
            </div>
        </div>
    );
}