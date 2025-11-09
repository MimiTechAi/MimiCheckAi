
import { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    FileText,
    Download,
    ExternalLink,
    CheckCircle,
    Clock,
    User as UserIcon,
    Euro,
    AlertTriangle,
    Sparkles,
    Bot,
    Search,
    Filter,
    Baby,
    GraduationCap,
    Heart,
    Home,
    Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const applicationData = [
    // === GRUNDSICHERUNG & SOZIALES ===
    {
        id: 'buergergeld',
        title: 'Bürgergeld-Hauptantrag',
        description: 'Antrag auf Leistungen nach dem SGB II (Bürgergeld) - ersetzt das ehemalige Hartz IV',
        category: 'Grundsicherung & Soziales',
        priority: 'hoch',
        downloadUrl: 'https://www.arbeitsagentur.de/datei/antrag-sgb2_ba042689.pdf',
        officialSource: 'Bundesagentur für Arbeit',
        processingTime: '2-4 Wochen',
        targetGroups: ['Arbeitslose', 'Geringverdiener', 'Aufstocker'],
        monthlyAmount: 'bis 563€',
        icon: Euro,
        requiredDocuments: [
            'Personalausweis oder Pass',
            'Mietvertrag und Mietbescheinigung',
            'Kontoauszüge der letzten 3 Monate',
            'Einkommensnachweise (falls vorhanden)',
            'Vermögensnachweise',
            'Bei Kindern: Geburtsurkunden'
        ]
    },
    {
        id: 'arbeitslosengeld',
        title: 'Arbeitslosengeld I',
        description: 'Antrag auf Arbeitslosengeld nach dem SGB III - Versicherungsleistung bei Arbeitslosigkeit',
        category: 'Grundsicherung & Soziales',
        priority: 'hoch',
        downloadUrl: 'https://www.arbeitsagentur.de/vor-ort/datei/eservice-anleitung-arbeitslosengeld_ba108727.pdf',
        officialSource: 'Bundesagentur für Arbeit',
        processingTime: '1-3 Wochen',
        targetGroups: ['Arbeitslose mit Anspruch'],
        monthlyAmount: '60-67% vom Nettolohn',
        icon: Euro,
        requiredDocuments: [
            'Personalausweis',
            'Arbeitsbescheinigung vom Arbeitgeber',
            'Sozialversicherungsausweis',
            'Lebenslauf',
            'Arbeitssuchendmeldung'
        ]
    },
    {
        id: 'wohngeld',
        title: 'Wohngeld-Antrag',
        description: 'Zuschuss zu den Wohnkosten für Mieter und Eigentümer mit geringem Einkommen',
        category: 'Wohnen & Miete',
        priority: 'hoch',
        downloadUrl: 'https://www.bmas.de/SharedDocs/Downloads/DE/Formulare/wohngeldantrag.pdf',
        officialSource: 'Bundesministerium für Arbeit und Soziales',
        processingTime: '4-8 Wochen',
        targetGroups: ['Geringverdiener', 'Rentner', 'Studenten'],
        monthlyAmount: 'durchschnittlich 190€',
        icon: Home,
        requiredDocuments: [
            'Einkommensnachweise aller Haushaltsmitglieder',
            'Mietvertrag oder Eigentumsnachweis',
            'Mietbescheinigung',
            'Personalausweise aller Antragsteller'
        ]
    },
    {
        id: 'sozialhilfe',
        title: 'Sozialhilfe (SGB XII)',
        description: 'Grundsicherung für nicht erwerbsfähige Personen und Hilfe in besonderen Lebenslagen',
        category: 'Grundsicherung & Soziales',
        priority: 'mittel',
        downloadUrl: 'https://www.bmas.de/SharedDocs/Downloads/DE/Formulare/sozialhilfeantrag.pdf',
        officialSource: 'Sozialamt',
        processingTime: '3-6 Wochen',
        targetGroups: ['Nicht erwerbsfähige Personen', 'Schwerbehinderte'],
        monthlyAmount: 'nach Bedarf',
        icon: Heart,
        requiredDocuments: [
            'Personalausweis',
            'Einkommensnachweise',
            'Vermögensnachweise',
            'Mietvertrag',
            'Ärztliche Bescheinigungen'
        ]
    },
    {
        id: 'grundsicherung_alter',
        title: 'Grundsicherung im Alter',
        description: 'Existenzsicherung für Rentner und Erwerbsgeminderte ab 65 Jahren',
        category: 'Rente & Alter',
        priority: 'mittel',
        downloadUrl: 'https://www.deutsche-rentenversicherung.de/SharedDocs/Formulare/DE/_pdf/G0200.pdf',
        officialSource: 'Deutsche Rentenversicherung',
        processingTime: '4-6 Wochen',
        targetGroups: ['Rentner ab 65', 'Erwerbsgeminderte'],
        monthlyAmount: 'bis 563€ + Miete',
        icon: Heart,
        requiredDocuments: [
            'Rentenbescheid',
            'Einkommensnachweise',
            'Mietvertrag',
            'Kontoauszüge'
        ]
    },

    // === FAMILIE & KINDER ===
    {
        id: 'kindergeld',
        title: 'Kindergeld-Antrag',
        description: 'Monatliche Zahlung für Kinder bis 18 Jahre (in Ausbildung bis 25 Jahre)',
        category: 'Familie & Kinder',
        priority: 'sehr_hoch',
        downloadUrl: 'https://www.arbeitsagentur.de/datei/kindergeldantrag_ba013086.pdf',
        officialSource: 'Familienkasse der Bundesagentur für Arbeit',
        processingTime: '2-6 Wochen',
        targetGroups: ['Alle Eltern', 'Alleinerziehende'],
        monthlyAmount: '250€ pro Kind',
        icon: Baby,
        requiredDocuments: [
            'Geburtsurkunde des Kindes',
            'Personalausweis der Eltern',
            'Steuer-ID des Kindes',
            'Bei ausländischen Staatsangehörigen: Aufenthaltstitel'
        ]
    },
    {
        id: 'kinderzuschlag',
        title: 'Kinderzuschlag (KiZ)',
        description: 'Zusätzliche Unterstützung für Familien mit geringem Einkommen',
        category: 'Familie & Kinder',
        priority: 'hoch',
        downloadUrl: 'https://www.arbeitsagentur.de/datei/kiz1-hauptantrag_ba016462.pdf',
        officialSource: 'Familienkasse der Bundesagentur für Arbeit',
        processingTime: '4-8 Wochen',
        targetGroups: ['Geringverdiener-Familien', 'Alleinerziehende'],
        monthlyAmount: 'bis 292€ pro Kind',
        icon: Baby,
        requiredDocuments: [
            'Einkommensnachweise der letzten 6 Monate',
            'Kindergeldbescheid',
            'Mietvertrag',
            'Kontoauszüge'
        ]
    },
    {
        id: 'elterngeld',
        title: 'Elterngeld-Antrag',
        description: 'Finanzielle Unterstützung für Eltern in den ersten Lebensmonaten des Kindes',
        category: 'Familie & Kinder',
        priority: 'hoch',
        downloadUrl: 'https://www.bmfsfj.de/resource/blob/93614/elterngeldantrag.pdf',
        officialSource: 'Elterngeldstelle',
        processingTime: '3-5 Wochen',
        targetGroups: ['Neue Eltern', 'Alleinerziehende'],
        monthlyAmount: '300-1.800€',
        icon: Baby,
        requiredDocuments: [
            'Geburtsurkunde des Kindes',
            'Einkommensnachweise vor der Geburt',
            'Arbeitgeberbescheinigung über Elternzeit',
            'Krankenversicherungsnachweis'
        ]
    },
    {
        id: 'unterhaltsvorschuss',
        title: 'Unterhaltsvorschuss',
        description: 'Staatliche Leistung wenn der andere Elternteil keinen/unregelmäßigen Unterhalt zahlt',
        category: 'Familie & Kinder',
        priority: 'hoch',
        downloadUrl: 'https://www.zbfs.bayern.de/formulare/uvg/uv1.pdf',
        officialSource: 'Jugendamt',
        processingTime: '2-4 Wochen',
        targetGroups: ['Alleinerziehende'],
        monthlyAmount: '187-338€ pro Kind',
        icon: Baby,
        requiredDocuments: [
            'Geburtsurkunde des Kindes',
            'Nachweis über Vaterschaft',
            'Einkommensnachweise',
            'Unterhaltsbescheid oder Negativbescheinigung'
        ]
    },

    // === BILDUNG & AUSBILDUNG ===
    {
        id: 'bafoeg',
        title: 'BAföG-Antrag',
        description: 'Ausbildungsförderung für Schüler und Studenten',
        category: 'Bildung & Ausbildung',
        priority: 'hoch',
        downloadUrl: 'https://www.bafög.de/bafoeg/de/antrag-stellen/formblatt-1---antrag-auf-ausbildungsfoerderung/formblatt-1---antrag-auf-ausbildungsfoerderung_node.html',
        officialSource: 'Studentenwerk / BAföG-Amt',
        processingTime: '4-6 Wochen',
        targetGroups: ['Studenten', 'Schüler'],
        monthlyAmount: 'bis 812€',
        icon: GraduationCap,
        requiredDocuments: [
            'Immatrikulationsbescheinigung',
            'Einkommensnachweise der Eltern',
            'Vermögensnachweise',
            'Mietvertrag (bei eigener Wohnung)'
        ]
    },
    {
        id: 'bab',
        title: 'Berufsausbildungsbeihilfe (BAB)',
        description: 'Finanzielle Unterstützung während der Berufsausbildung',
        category: 'Bildung & Ausbildung',
        priority: 'hoch',
        downloadUrl: 'https://www.arbeitsagentur.de/datei/bab-antrag_ba036520.pdf',
        officialSource: 'Bundesagentur für Arbeit',
        processingTime: '4-8 Wochen',
        targetGroups: ['Auszubildende'],
        monthlyAmount: 'bis 723€',
        icon: GraduationCap,
        requiredDocuments: [
            'Ausbildungsvertrag',
            'Einkommensnachweise der Eltern',
            'Mietvertrag',
            'Personalausweis'
        ]
    },

    // === GESUNDHEIT & PFLEGE ===
    {
        id: 'schwerbehindertenausweis',
        title: 'Schwerbehindertenausweis',
        description: 'Nachweis einer Behinderung ab einem Grad von 50 für Nachteilsausgleiche',
        category: 'Gesundheit & Pflege',
        priority: 'mittel',
        downloadUrl: 'https://www.zbfs.bayern.de/formulare/behinderung/index.php', // Beispiel Bayern
        officialSource: 'Versorgungsamt',
        processingTime: '3-6 Monate',
        targetGroups: ['Menschen mit Behinderung'],
        monthlyAmount: 'Steuervorteile & Vergünstigungen',
        icon: Heart,
        requiredDocuments: [
            'Ärztliche Befunde und Gutachten',
            'Personalausweis',
            'Passbild',
            'Vorherige Bescheide (falls vorhanden)'
        ]
    },
    {
        id: 'pflegegeld',
        title: 'Pflegegeld-Antrag',
        description: 'Monatliche Zahlung für pflegebedürftige Personen',
        category: 'Gesundheit & Pflege',
        priority: 'hoch',
        downloadUrl: 'https://www.aok.de/pk/leistungen/pflege/pflegegeld/',
        officialSource: 'Pflegekasse',
        processingTime: '25 Arbeitstage',
        targetGroups: ['Pflegebedürftige', 'Angehörige'],
        monthlyAmount: '316-901€',
        icon: Heart,
        requiredDocuments: [
            'Ärztliche Bescheinigungen',
            'Personalausweis',
            'Krankenversicherungsnachweis',
            'Nachweis über häusliche Pflege'
        ]
    },

    // === STEUERLICHE ENTLASTUNG ===
    {
        id: 'rundfunkbeitrag_befreiung',
        title: 'Rundfunkbeitrag-Befreiung',
        description: 'Befreiung von der Rundfunkbeitragspflicht (17,50€/Monat) bei geringem Einkommen',
        category: 'Steuerliche Entlastung',
        priority: 'mittel',
        downloadUrl: 'https://www.rundfunkbeitrag.de/formulare/befreiung_oder_ermaessigung_beantragen/index_ger.html',
        officialSource: 'ARD ZDF Deutschlandradio Beitragsservice',
        processingTime: '2-4 Wochen',
        targetGroups: ['Bürgergeld-Bezieher', 'BAföG-Empfänger', 'Geringverdiener'],
        monthlyAmount: '210€ Ersparnis/Jahr',
        icon: Zap,
        requiredDocuments: [
            'Leistungsbescheid (Bürgergeld, BAföG, etc.)',
            'Personalausweis',
            'Aktueller Rundfunkbeitragsbescheid'
        ]
    },

    // === RENTE & ALTER ===
    {
        id: 'altersrente',
        title: 'Altersrente',
        description: 'Antrag auf reguläre Altersrente der gesetzlichen Rentenversicherung',
        category: 'Rente & Alter',
        priority: 'mittel',
        downloadUrl: 'https://www.deutsche-rentenversicherung.de/SharedDocs/Formulare/DE/_pdf/R0100.pdf',
        officialSource: 'Deutsche Rentenversicherung',
        processingTime: '1-3 Monate',
        targetGroups: ['Rentner ab 63-67 Jahren'],
        monthlyAmount: 'nach Beitragsjahren',
        icon: Heart,
        requiredDocuments: [
            'Personalausweis',
            'Sozialversicherungsausweis',
            'Geburtsurkunde',
            'Nachweise über Beschäftigungszeiten'
        ]
    },
    {
        id: 'erwerbsminderungsrente',
        title: 'Erwerbsminderungsrente',
        description: 'Rente bei verminderter Erwerbsfähigkeit aus gesundheitlichen Gründen',
        category: 'Rente & Alter',
        priority: 'hoch',
        downloadUrl: 'https://www.deutsche-rentenversicherung.de/SharedDocs/Formulare/DE/_pdf/R0210.pdf',
        officialSource: 'Deutsche Rentenversicherung',
        processingTime: '3-6 Monate',
        targetGroups: ['Erwerbsgeminderte Personen'],
        monthlyAmount: 'nach Grad der Erwerbsminderung',
        icon: Heart,
        requiredDocuments: [
            'Ärztliche Befunde und Gutachten',
            'Sozialversicherungsausweis',
            'Beschäftigungsnachweise',
            'Personalausweis'
        ]
    }
];

const ApplicationCard = ({ app, user, onDownload, searchTerm }) => {
    const isEligible = checkEligibility(app, user);

    // Search highlighting
    const highlightSearch = (text, term) => {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-900">$1</mark>');
    };

    return (
        <Card className="shadow-xl border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 card-3d">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                                app.priority === 'sehr_hoch' ? 'bg-gradient-to-br from-red-600 to-pink-600' :
                                app.priority === 'hoch' ? 'bg-gradient-to-br from-red-500 to-orange-500' :
                                'bg-gradient-to-br from-blue-500 to-indigo-500'
                            }`}>
                                <app.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">
                                    <span dangerouslySetInnerHTML={{
                                        __html: highlightSearch(app.title, searchTerm)
                                    }} />
                                </CardTitle>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <Badge className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                                        {app.category}
                                    </Badge>
                                    {app.monthlyAmount && (
                                        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs">
                                            <Euro className="w-3 h-3 mr-1" />
                                            {app.monthlyAmount}
                                        </Badge>
                                    )}
                                    {isEligible ? (
                                        <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Empfohlen für Sie
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            Profil prüfen
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            <span dangerouslySetInnerHTML={{
                                __html: highlightSearch(app.description, searchTerm)
                            }} />
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Key Information */}
                <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-50/60 dark:bg-slate-700/30 rounded-xl">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                            {app.processingTime}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                            {app.officialSource}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                            {app.targetGroups.length} Zielgruppen
                        </span>
                    </div>
                </div>

                {/* Required Documents Preview */}
                <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">
                        📋 Benötigte Unterlagen:
                    </h4>
                    <div className="space-y-1 max-h-32 overflow-hidden">
                        {app.requiredDocuments.slice(0, 3).map((doc, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                                <span>{doc}</span>
                            </div>
                        ))}
                        {app.requiredDocuments.length > 3 && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 italic ml-4">
                                +{app.requiredDocuments.length - 3} weitere Dokumente
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons - FIXED: Direct PDF access */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {(app.id === 'buergergeld' || app.id === 'wohngeld') && (
                        <Link to={createPageUrl(`PdfAutofill?type=${app.id}`)} className="flex-1">
                            <Button
                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                PDF ausfüllen (MVP)
                            </Button>
                        </Link>
                    )}
                    <Button
                        onClick={() => onDownload(app)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Direkt zur offiziellen Quelle
                    </Button>

                    <Link to={createPageUrl(`PdfAusfuellhilfe?type=${app.id}`)} className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        >
                            <Bot className="w-4 h-4 mr-2" />
                            KI-Ausfüllhilfe
                        </Button>
                    </Link>
                </div>

                {/* Smart Recommendation */}
                {isEligible && (
                    <div className="p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/80 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">
                                KI-Empfehlung
                            </span>
                        </div>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300">
                            Basierend auf Ihrem Profil haben Sie gute Chancen auf diese Leistung.
                            Nutzen Sie unseren KI-Assistenten für optimale Antragstellung.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Helper function to check eligibility based on user profile
const checkEligibility = (app, user) => {
    if (!user?.lebenssituation) return false;

    const { beschaeftigungsstatus, monatliches_nettoeinkommen, kinder_anzahl, familienstand } = user.lebenssituation;

    // Simple eligibility rules
    switch(app.id) {
        case 'buergergeld':
            return beschaeftigungsstatus === 'arbeitslos' || (monatliches_nettoeinkommen && monatliches_nettoeinkommen < 1200);
        case 'arbeitslosengeld':
            return beschaeftigungsstatus === 'arbeitslos';
        case 'kindergeld':
            return kinder_anzahl > 0;
        case 'kinderzuschlag':
            return kinder_anzahl > 0 && monatliches_nettoeinkommen > 0 && monatliches_nettoeinkommen < 2000;
        case 'elterngeld':
            return kinder_anzahl > 0; // Simplified
        case 'unterhaltsvorschuss':
            return familienstand === 'ledig' && kinder_anzahl > 0;
        case 'bafoeg':
            return beschaeftigungsstatus === 'student';
        case 'bab':
            return beschaeftigungsstatus === 'student'; // Simplified (BAB is for vocational training, not necessarily student status)
        case 'wohngeld':
            return monatliches_nettoeinkommen > 0 && monatliches_nettoeinkommen < 3000;
        default:
            return false;
    }
};

export default function Antraege() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('alle');

    useEffect(() => {
        User.me().then(user => {
            setUser(user);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, []);

    // FIXED: Simple direct URL opening instead of problematic downloads
    const handleDownload = (app) => {
        console.log(`Opening official source: ${app.title}`);
        // Open the official government source in a new tab
        window.open(app.downloadUrl, '_blank');
    };

    // Get unique categories
    const categories = ['alle', ...new Set(applicationData.map(app => app.category))];

    // Filter applications
    const filteredApplications = applicationData.filter(app => {
        const matchesSearch = !searchTerm ||
            app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'alle' || app.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Sort by priority and eligibility
    const sortedApplications = filteredApplications.sort((a, b) => {
        const aEligible = checkEligibility(a, user);
        const bEligible = checkEligibility(b, user);

        if (aEligible && !bEligible) return -1;
        if (!aEligible && bEligible) return 1;

        const priorityOrder = { 'sehr_hoch': 4, 'hoch': 3, 'mittel': 2, 'niedrig': 1 };
        return (priorityOrder[b.priority] || 1) - (priorityOrder[a.priority] || 1);
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">Lade Anträge...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                        <FileText className="w-10 h-10 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4 humanistic-serif">
                    Deutsche Antrags-Bibliothek
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                    **{applicationData.length} offizielle Antragsformulare** mit direkten Links zu den Behörden.
                    **Intelligente Empfehlungen** basierend auf Ihrem Profil + **KI-Ausfüllhilfe**.
                </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                        placeholder="Suchen Sie nach Anträgen... (z.B. Kindergeld, Wohngeld, BAföG)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-slate-500" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'alle' ? 'Alle Kategorien' : category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Profile Completion Prompt */}
            {!user?.lebenssituation?.plz && (
                <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                            <div className="flex-1">
                                <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
                                    🎯 Profil vervollständigen für **personalisierte Empfehlungen**
                                </h3>
                                <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
                                    Mit einem vollständigen Profil zeigen wir Ihnen **automatisch die besten Anträge** für Ihre Situation und füllen sie **intelligent vor**.
                                </p>
                                <Link to={createPageUrl('Lebenslagen')}>
                                    <Button className="bg-amber-600 hover:bg-amber-700 text-white text-sm">
                                        <UserIcon className="w-4 h-4 mr-2" />
                                        Jetzt vervollständigen
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-white dark:bg-slate-800 border-none shadow-lg">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{applicationData.length}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Verfügbare Anträge</div>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-800 border-none shadow-lg">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-600 mb-1">
                            {sortedApplications.filter(app => checkEligibility(app, user)).length}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Empfohlen für Sie</div>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-800 border-none shadow-lg">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">{categories.length - 1}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Kategorien</div>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-800 border-none shadow-lg">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">KI-Unterstützung</div>
                    </CardContent>
                </Card>
            </div>

            {/* Applications Grid */}
            {sortedApplications.length === 0 ? (
                <Card className="text-center py-20 shadow-none border-dashed bg-white dark:bg-slate-800 dark:border-slate-700">
                    <CardContent>
                        <FileText className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                            Keine Anträge gefunden
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            Versuchen Sie andere Suchbegriffe oder wählen Sie eine andere Kategorie.
                        </p>
                        <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('alle'); }}>
                            Alle Anträge anzeigen
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-8">
                    {sortedApplications.map(app => (
                        <ApplicationCard
                            key={app.id}
                            app={app}
                            user={user}
                            onDownload={handleDownload}
                            searchTerm={searchTerm}
                        />
                    ))}
                </div>
            )}

            {/* Additional Help */}
            <Card className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200/60 dark:border-blue-800/60">
                <CardContent className="p-8 text-center">
                    <Bot className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <h3 className="font-bold text-blue-800 dark:text-blue-200 text-xl mb-3">
                        🤖 Brauchen Sie Hilfe beim Ausfüllen?
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 mb-6 max-w-3xl mx-auto">
                        Unser **KI-Assistent** hilft Ihnen beim korrekten Ausfüllen **aller {applicationData.length} Anträge**
                        basierend auf Ihren Profildaten. **Automatische Vorausfüllung, rechtliche Prüfung und Optimierung**.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link to={createPageUrl('Assistent')}>
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                                <Bot className="w-5 h-5 mr-2" />
                                KI-Assistent fragen
                            </Button>
                        </Link>
                        <Link to={createPageUrl('Lebenslagen')}>
                            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                                <UserIcon className="w-5 h-5 mr-2" />
                                Profil vervollständigen
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
