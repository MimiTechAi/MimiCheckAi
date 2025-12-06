import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Database, Bot, Lock, Eye, Trash2, FileCheck, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Datenschutz() {
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
                        src="/assets/images/datenschutz-header.png"
                        alt="Datenschutz Background"
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-slate-950/80 to-slate-950" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6 backdrop-blur-md">
                        <Shield className="w-4 h-4" />
                        Datenschutz & Sicherheit
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-emerald-200">
                        {t('datenschutzPage.title', 'Datenschutzerklärung')}
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {t('datenschutzPage.subtitle', 'Der Schutz Ihrer Daten hat für uns höchste Priorität.')}
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-20 space-y-8">

                {/* Intro Card */}
                <Card className="bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-2xl">
                    <CardContent className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                            <Lock className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">{t('datenschutzPage.security.title', 'Datensicherheit')}</h2>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {t('datenschutzPage.security.text', 'Wir setzen modernste Verschlüsselungstechnologien ein, um Ihre Dokumente und persönlichen Daten zu schützen. Ihre Daten werden ausschließlich auf sicheren Servern in Deutschland verarbeitet.')}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Data Collection */}
                    <Card className="bg-slate-900/40 backdrop-blur-md border-white/5 hover:border-blue-500/30 transition-all hover:bg-slate-900/60 group">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                    <Database className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">{t('datenschutzPage.collection.title', 'Datenerhebung')}</h3>
                            </div>

                            <div className="space-y-6 text-slate-400">
                                <div className="pl-4 border-l-2 border-white/10 group-hover:border-blue-500/30 transition-colors">
                                    <h4 className="font-semibold text-white mb-2">{t('datenschutzPage.collection.google.title', 'Google Auth')}</h4>
                                    <p className="text-sm">{t('datenschutzPage.collection.google.text', 'Basis-Profildaten bei Login.')}</p>
                                </div>
                                <div className="pl-4 border-l-2 border-white/10 group-hover:border-blue-500/30 transition-colors">
                                    <h4 className="font-semibold text-white mb-2">{t('datenschutzPage.collection.profile.title', 'Profildaten')}</h4>
                                    <p className="text-sm">{t('datenschutzPage.collection.profile.text', 'Daten, die Sie im Profil hinterlegen.')}</p>
                                </div>
                                <div className="pl-4 border-l-2 border-white/10 group-hover:border-blue-500/30 transition-colors">
                                    <h4 className="font-semibold text-white mb-2">{t('datenschutzPage.collection.docs.title', 'Dokumente')}</h4>
                                    <p className="text-sm">{t('datenschutzPage.collection.docs.text', 'Hochgeladene PDF-Dokumente zur Analyse.')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Processing */}
                    <Card className="bg-slate-900/40 backdrop-blur-md border-white/5 hover:border-purple-500/30 transition-all hover:bg-slate-900/60 group">
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                    <Bot className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">{t('datenschutzPage.ai.title', 'KI-Verarbeitung')}</h3>
                            </div>

                            <div className="space-y-6 text-slate-400">
                                <div className="pl-4 border-l-2 border-white/10 group-hover:border-purple-500/30 transition-colors">
                                    <h4 className="font-semibold text-white mb-2">{t('datenschutzPage.ai.purpose.title', 'Zweck')}</h4>
                                    <p className="text-sm">{t('datenschutzPage.ai.purpose.text', 'Analyse von Dokumenten auf Fehler.')}</p>
                                </div>
                                <div className="pl-4 border-l-2 border-white/10 group-hover:border-purple-500/30 transition-colors">
                                    <h4 className="font-semibold text-white mb-2">{t('datenschutzPage.ai.anon.title', 'Anonymisierung')}</h4>
                                    <p className="text-sm">{t('datenschutzPage.ai.anon.text', 'Daten werden vor der Verarbeitung pseudonymisiert.')}</p>
                                </div>
                                <div className="pl-4 border-l-2 border-white/10 group-hover:border-purple-500/30 transition-colors">
                                    <h4 className="font-semibold text-white mb-2">{t('datenschutzPage.ai.noShare.title', 'Keine Weitergabe')}</h4>
                                    <p className="text-sm">{t('datenschutzPage.ai.noShare.text', 'Ihre Daten werden nicht für KI-Training Dritter verwendet.')}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Rights Secion */}
                <Card className="bg-slate-900/40 border-white/5">
                    <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <FileCheck className="w-6 h-6 text-emerald-400" />
                            {t('datenschutzPage.rights.title', 'Ihre Rechte')}
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6 text-sm">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-3 text-blue-400">
                                    <Eye className="w-4 h-4" />
                                    <h4 className="font-bold uppercase">Auskunft</h4>
                                </div>
                                <p className="text-slate-400">
                                    {t('datenschutzPage.rights.info.text', 'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten.')}
                                </p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-3 text-red-400">
                                    <Trash2 className="w-4 h-4" />
                                    <h4 className="font-bold uppercase">Löschung</h4>
                                </div>
                                <p className="text-slate-400">
                                    {t('datenschutzPage.rights.delete.text', 'Sie können jederzeit die Löschung oder Sperrung Ihrer Daten verlangen.')}
                                </p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                                    <Shield className="w-4 h-4" />
                                    <h4 className="font-bold uppercase">Widerruf</h4>
                                </div>
                                <p className="text-slate-400">
                                    {t('datenschutzPage.rights.revoke.text', 'Erteilte Einwilligungen können Sie jederzeit für die Zukunft widerrufen.')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Footer */}
                <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/5">
                    <Mail className="w-8 h-8 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{t('datenschutzPage.contact.title', 'Datenschutzbeauftragter')}</h3>
                    <p className="text-slate-400 mb-4">
                        {t('datenschutzPage.contact.text', 'Bei Fragen zum Datenschutz erreichen Sie uns unter:')}
                    </p>
                    <a href="mailto:datenschutz@mimitechai.com" className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors font-medium border border-white/10">
                        datenschutz@mimitechai.com
                    </a>
                </div>

            </div>
        </div>
    );
}