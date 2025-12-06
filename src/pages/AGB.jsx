import React, { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, UserCheck, ShieldOff, CheckCircle, AlertCircle, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AGB() {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: FileText,
            color: "blue",
            titleKey: "scope",
            contentKey: ["content1", "content2"]
        },
        {
            icon: UserCheck,
            color: "emerald",
            titleKey: "duties",
            contentKey: ["content1", "content2"]
        },
        {
            icon: ShieldOff,
            color: "red",
            titleKey: "liability",
            contentKey: ["content1", "content2"]
        }
    ];

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
                        Stand: Dezember 2025
                    </p>
                </div>

                {sections.map((section, idx) => (
                    <Card key={idx} className="bg-slate-900/50 backdrop-blur-md border-white/5 hover:border-white/10 transition-all hover:bg-slate-900/80 group">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-6">
                                <div className={`w-12 h-12 rounded-xl bg-${section.color}-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                    <section.icon className={`w-6 h-6 text-${section.color}-400`} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                        {t(`agbPage.${section.titleKey}.title`)}
                                    </h2>
                                    <div className="space-y-4 text-slate-400 leading-relaxed">
                                        {section.contentKey.map((key, k) => (
                                            <p key={k}>
                                                {t(`agbPage.${section.titleKey}.${key}`)}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

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