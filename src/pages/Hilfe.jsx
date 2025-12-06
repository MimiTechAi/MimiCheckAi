import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search,
    HelpCircle,
    MessageCircle,
    Mail,
    Phone,
    Book,
    ChevronDown,
    ChevronUp,
    LifeBuoy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useTranslation } from 'react-i18next';

export default function Hilfe() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [openFAQ, setOpenFAQ] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        {
            question: "Wie lade ich eine Nebenkostenabrechnung hoch?",
            answer: "Gehen Sie auf 'Nebenkosten prüfen' und klicken Sie auf die Upload-Zone. Sie können PDF-Dateien oder Fotos (JPG, PNG) hochladen. Die KI analysiert automatisch alle Kostenposten und rechtlichen Aspekte."
        },
        {
            question: "Was kostet die Premium-Version?",
            answer: "Premium kostet €14.99/Monat und bietet unbegrenzte Analysen, PDF-Reports, Musterbriefe und Priority-Support. Sie können jederzeit upgraden oder kündigen."
        },
        {
            question: "Wie kann ich gegen meine Nebenkostenabrechnung Widerspruch einlegen?",
            answer: "Nach der Analyse erhalten Sie einen detaillierten Bericht. Klicken Sie auf 'Widerspruch starten' - unser KI-Assistent erstellt rechtssichere Musterbriefe basierend auf den gefundenen Fehlern."
        },
        {
            question: "Welche Arten von Fehlern kann die KI erkennen?",
            answer: "Unsere KI prüft: Überhöhte Heizkosten, falsche Verteilerschlüssel, nicht umlagefähige Kosten, Formfehler, fehlende Belege und Fristüberschreitungen."
        },
        {
            question: "Ist meine Daten sicher?",
            answer: "Ja, alle Dokumente werden verschlüsselt übertragen und gespeichert. Wir sind DSGVO-konform und verkaufen keine Daten. Sie können Ihre Dokumente jederzeit löschen."
        },
        {
            question: "Kann ich staatliche Förderungen beantragen?",
            answer: "Ja! Unser Förder-Prüfradar analysiert Ihre Lebenssituation und findet automatisch alle Zuschüsse, die Ihnen zustehen - von Wohngeld bis Kindergeld."
        },
        {
            question: "Wie kontaktiere ich den Support?",
            answer: "Premium-Nutzer erhalten Priority-Support per E-Mail (support@mimicheck.ai) oder über den KI-Assistenten. Free-User können die FAQ nutzen oder eine E-Mail senden."
        }
    ];

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">
            {/* Hero Header */}
            <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-blue-900/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6 backdrop-blur-md">
                        <LifeBuoy className="w-4 h-4" />
                        Support Center
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Wie können wir dir <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">helfen?</span>
                    </h1>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-200" />
                        <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                            <Search className="w-5 h-5 text-slate-400 ml-4" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Suche nach Antworten..."
                                className="border-0 bg-transparent text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20 space-y-12">

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Link to={createPageUrl('Assistent')} className="group">
                        <Card className="h-full bg-slate-900/50 backdrop-blur-md border border-white/5 hover:border-blue-500/30 hover:bg-slate-900/70 transition-all duration-300">
                            <CardContent className="p-8 text-center">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                                    <MessageCircle className="w-7 h-7 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">KI-Assistent</h3>
                                <p className="text-sm text-slate-400">
                                    Sofortige Antworten auf deine Fragen durch unsere KI.
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    <a href="mailto:support@mimitechai.com" className="group">
                        <Card className="h-full bg-slate-900/50 backdrop-blur-md border border-white/5 hover:border-emerald-500/30 hover:bg-slate-900/70 transition-all duration-300">
                            <CardContent className="p-8 text-center">
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
                                    <Mail className="w-7 h-7 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">E-Mail Support</h3>
                                <p className="text-sm text-slate-400">
                                    Schreib uns bei komplexeren Anliegen eine E-Mail.
                                </p>
                            </CardContent>
                        </Card>
                    </a>

                    <div className="group cursor-pointer">
                        <Card className="h-full bg-slate-900/50 backdrop-blur-md border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/70 transition-all duration-300">
                            <CardContent className="p-8 text-center">
                                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                                    <Book className="w-7 h-7 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Rechtsleitfaden</h3>
                                <p className="text-sm text-slate-400">
                                    Stöbere in unserer Wissensdatenbank. (Bald verfügbar)
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* FAQs */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <HelpCircle className="w-6 h-6 text-slate-400" />
                        Häufig gestellte Fragen
                    </h2>
                    <div className="space-y-4">
                        {filteredFAQs.map((faq, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-white/5 bg-slate-900/30 hover:bg-white/5 overflow-hidden transition-all duration-200"
                            >
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    className="w-full p-6 text-left flex items-center justify-between"
                                >
                                    <span className="font-semibold text-white group-hover:text-blue-200 transition-colors pr-8">
                                        {faq.question}
                                    </span>
                                    {openFAQ === index ? (
                                        <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-white shrink-0" />
                                    )}
                                </button>
                                {openFAQ === index && (
                                    <div className="px-6 pb-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-500">Keine Ergebnisse für "{searchTerm}" gefunden.</p>
                        </div>
                    )}
                </div>

                {/* Footer CTA */}
                <div className="text-center py-12 border-t border-white/5">
                    <h3 className="text-xl font-bold text-white mb-4">Nicht gefunden wonach du suchst?</h3>
                    <Button
                        onClick={() => window.location.href = 'mailto:support@mimitechai.com'}
                        className="bg-white text-slate-900 hover:bg-slate-200 font-bold px-8 py-6 rounded-full"
                    >
                        Kontaktiere uns
                    </Button>
                </div>

            </div>
        </div>
    );
}