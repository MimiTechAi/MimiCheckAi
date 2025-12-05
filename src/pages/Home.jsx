import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
    FileText, 
    Shield, 
    Sparkles, 
    Upload, 
    CheckCircle, 
    Euro,
    ArrowRight,
    FileSearch,
    Bot,
    Clock,
    Lock,
    TrendingUp
} from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Home() {
    const navigate = useNavigate();
    
    const features = [
        {
            icon: FileSearch,
            title: "Dokumente analysieren",
            description: "Laden Sie Nebenkostenabrechnungen, Mietverträge oder andere Dokumente hoch. Unsere KI erkennt automatisch den Dokumenttyp.",
            color: "blue"
        },
        {
            icon: Euro,
            title: "Fehler finden",
            description: "Die KI prüft Ihre Dokumente auf Unstimmigkeiten und zeigt Ihnen mögliches Rückforderungspotential.",
            color: "emerald"
        },
        {
            icon: Bot,
            title: "KI-Assistent",
            description: "Stellen Sie Fragen zu Ihren Dokumenten. Der Assistent hilft beim Verstehen und erstellt Musterbriefe.",
            color: "violet"
        }
    ];

    const trustElements = [
        { icon: Lock, text: "DSGVO-konform" },
        { icon: Shield, text: "Verschlüsselte Übertragung" },
        { icon: Clock, text: "Analyse in Sekunden" }
    ];

    const stats = [
        { value: "50+", label: "Dokumenttypen erkannt" },
        { value: "95%", label: "Erkennungsgenauigkeit" },
        { value: "< 30s", label: "Durchschnittliche Analysezeit" }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-950 to-emerald-600/10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
                
                <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
                                <Sparkles className="w-4 h-4" />
                                KI-gestützte Dokumentenanalyse
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                Ihre Dokumente.
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                    Intelligent analysiert.
                                </span>
                            </h1>
                            
                            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg">
                                MiMiCheck analysiert Ihre Nebenkostenabrechnungen, Mietverträge und andere Dokumente mit künstlicher Intelligenz – und findet Fehler, die Geld kosten.
                            </p>
                            
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Button 
                                    size="lg"
                                    onClick={() => navigate(createPageUrl('Upload'))}
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/25"
                                >
                                    <Upload className="w-5 h-5 mr-2" />
                                    Dokument hochladen
                                </Button>
                                <Button 
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate(createPageUrl('Abrechnungen'))}
                                    className="border-white/20 text-white hover:bg-white/10"
                                >
                                    Meine Dokumente
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                            
                            {/* Trust Elements */}
                            <div className="mt-10 flex flex-wrap gap-6">
                                {trustElements.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-slate-400 text-sm">
                                        <item.icon className="w-4 h-4 text-emerald-400" />
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Hero Visual */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
                            <Card className="relative bg-slate-900/80 border-white/10 backdrop-blur-xl overflow-hidden">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">Nebenkostenabrechnung</p>
                                            <p className="text-sm text-slate-400">Analyse abgeschlossen</p>
                                        </div>
                                        <div className="ml-auto">
                                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
                                                95% sicher
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                            <span className="text-slate-300">Dokumenttyp erkannt</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                            <span className="text-slate-300">Zeitraum: 01.01.2024 - 31.12.2024</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                            <TrendingUp className="w-5 h-5 text-amber-400" />
                                            <span className="text-amber-400 font-medium">Mögliche Ersparnis: 127,50 €</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-900/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            So funktioniert MiMiCheck
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            In drei einfachen Schritten zu Ihrer Dokumentenanalyse
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card 
                                key={index} 
                                className="bg-slate-900/50 border-white/10 hover:border-blue-500/30 transition-colors group"
                            >
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                                        </div>
                                        <span className="text-4xl font-bold text-slate-700">{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-y border-white/5">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                    {stat.value}
                                </p>
                                <p className="text-slate-400 mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Bereit, Ihre Dokumente zu analysieren?
                    </h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        Laden Sie jetzt Ihr erstes Dokument hoch und lassen Sie unsere KI nach Fehlern und Einsparpotential suchen.
                    </p>
                    <Button 
                        size="lg"
                        onClick={() => navigate(createPageUrl('Upload'))}
                        className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg shadow-blue-500/25"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Jetzt kostenlos starten
                    </Button>
                </div>
            </section>
        </div>
    );
}
