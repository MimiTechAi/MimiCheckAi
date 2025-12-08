import { useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin, Scale, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Impressum() {
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
                        src="/assets/images/impressum-header.png"
                        alt="Impressum Background"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-slate-950/80 to-slate-950" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6 backdrop-blur-md">
                        <Building2 className="w-4 h-4" />
                        Rechtliche Informationen
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400">
                        {t('impressumPage.title', 'Impressum')}
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {t('impressumPage.subtitle', 'Transparenz und Vertrauen sind die Basis unserer Arbeit.')}
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-20 space-y-8">
                {/* Main Contact Card */}
                <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
                    <CardContent className="p-8 md:p-12 relative">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Building2 className="w-6 h-6 text-blue-400" />
                                    {t('impressumPage.provider', 'Angaben gemäß § 5 TMG')}
                                </h2>

                                <div className="space-y-4 text-slate-300 leading-relaxed">
                                    <div>
                                        <p className="font-semibold text-white">MiMi Tech Ai UG (haftungsbeschränkt)</p>
                                        <p>Vertreten durch: Michael Bemler</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-slate-500 mt-1 shrink-0" />
                                        <p>
                                            Lindenplatz 23<br />
                                            75378 Bad Liebenzell<br />
                                            Deutschland
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 relative">
                                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -ml-6 hidden md:block" />
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Phone className="w-6 h-6 text-emerald-400" />
                                    {t('impressumPage.contact', 'Kontakt')}
                                </h2>

                                <div className="space-y-4">
                                    <a href="mailto:info@mimitechai.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 transition-all group">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400">E-Mail Adresse</p>
                                            <p className="text-white font-medium">info@mimitechai.com</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue-400 ml-auto transition-colors" />
                                    </a>

                                    <a href="tel:+4915758805737" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400">Telefon</p>
                                            <p className="text-white font-medium">+49 1575 8805737</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 ml-auto transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-slate-900/30 backdrop-blur-sm border-white/5 hover:border-white/10 transition-colors">
                        <CardContent className="p-8">
                            <Scale className="w-8 h-8 text-purple-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Registereintrag</h3>
                            <div className="space-y-2 text-slate-400">
                                <p>Eintragung im Handelsregister.</p>
                                <p>Registergericht: Amtsgericht Stuttgart</p>
                                <p>Registernummer: HRB 793448</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900/30 backdrop-blur-sm border-white/5 hover:border-white/10 transition-colors">
                        <CardContent className="p-8">
                            <Building2 className="w-8 h-8 text-amber-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Umsatzsteuer-ID</h3>
                            <div className="space-y-2 text-slate-400">
                                <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
                                <p className="font-mono text-white bg-white/5 inline-block px-2 py-1 rounded">DE367926173</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Legal Text / Disclaimer */}
                <Card className="bg-slate-900/30 border-white/5">
                    <CardContent className="p-8 space-y-6 text-sm text-slate-400 leading-relaxed text-justify">
                        <div>
                            <h4 className="text-white font-semibold mb-2">Haftung für Inhalte</h4>
                            <p>
                                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-2">Haftung für Links</h4>
                            <p>
                                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-2">Urheberrecht</h4>
                            <p>
                                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/5">
                            <h4 className="text-white font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h4>
                            <p>
                                Michael Bemler<br />
                                Lindenplatz 23<br />
                                75378 Bad Liebenzell
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}