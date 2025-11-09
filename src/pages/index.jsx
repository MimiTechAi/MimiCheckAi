import React from 'react';
import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Upload from "./Upload";

import Abrechnungen from "./Abrechnungen";

import Assistent from "./Assistent";

import Lebenslagen from "./Lebenslagen";

import Pruefung from "./Pruefung";

import Implementierungsplan from "./Implementierungsplan";

import WohngeldCleanup from "./WohngeldCleanup";

import DataCleanupExecution from "./DataCleanupExecution";

import FoerderPruefradar from "./FoerderPruefradar";

import Datenqualitaet from "./Datenqualitaet";

import AntragAssistent from "./AntragAssistent";

import ProductionReadiness from "./ProductionReadiness";

import Impressum from "./Impressum";

import Datenschutz from "./Datenschutz";

import AGB from "./AGB";

import Hilfe from "./Hilfe";

import Bericht from "./Bericht";

import Pricing from "./Pricing";

import Antraege from "./Antraege";

import PdfAusfuellhilfe from "./PdfAusfuellhilfe";

import LandingPage from "./LandingPage";

import StripeSetup from "./StripeSetup";

import BillingAgent from "./BillingAgent";

import BackendSetup from "./BackendSetup";

import StripeAutoSetup from "./StripeAutoSetup";

import QATests from "./QATests";

import PdfAutofill from "./PdfAutofill";

import WebAssistent from "./WebAssistent";

import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotificationProvider } from '@/components/notifications/NotificationContext.jsx';
import Onboarding from './Onboarding';
import { UserProfileProvider, useUserProfile } from '@/components/UserProfileContext.jsx';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Upload: Upload,
    
    Abrechnungen: Abrechnungen,
    
    Assistent: Assistent,
    
    Lebenslagen: Lebenslagen,
    
    Pruefung: Pruefung,
    
    Implementierungsplan: Implementierungsplan,
    
    WohngeldCleanup: WohngeldCleanup,
    
    DataCleanupExecution: DataCleanupExecution,
    
    FoerderPruefradar: FoerderPruefradar,
    
    Datenqualitaet: Datenqualitaet,
    
    AntragAssistent: AntragAssistent,
    
    ProductionReadiness: ProductionReadiness,
    
    Impressum: Impressum,
    
    Datenschutz: Datenschutz,
    
    AGB: AGB,
    
    Hilfe: Hilfe,
    
    Bericht: Bericht,
    
    Pricing: Pricing,
    
    Antraege: Antraege,
    
    PdfAusfuellhilfe: PdfAusfuellhilfe,
    
    LandingPage: LandingPage,
    
    StripeSetup: StripeSetup,
    
    BillingAgent: BillingAgent,
    
    BackendSetup: BackendSetup,
    
    StripeAutoSetup: StripeAutoSetup,
    
    QATests: QATests,
    
    PdfAutofill: PdfAutofill,
    
    WebAssistent: WebAssistent,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = _getCurrentPage(location.pathname);
    const { user } = useUserProfile();
    
    React.useEffect(() => {
        const seen = localStorage.getItem('seenOnboarding');
        const completion = (user?.profile_completeness ?? 0);
        if (completion === 0 && !seen && location.pathname.toLowerCase() !== '/onboarding') {
            localStorage.setItem('seenOnboarding', '1');
            navigate('/onboarding');
        }
    }, [user, location.pathname, navigate]);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Upload" element={<Upload />} />
                
                <Route path="/Abrechnungen" element={<Abrechnungen />} />
                
                <Route path="/Assistent" element={<Assistent />} />
                
                <Route path="/Lebenslagen" element={<Lebenslagen />} />
                
                <Route path="/Pruefung" element={<Pruefung />} />
                
                <Route path="/Implementierungsplan" element={<Implementierungsplan />} />
                
                <Route path="/WohngeldCleanup" element={<WohngeldCleanup />} />
                
                <Route path="/DataCleanupExecution" element={<DataCleanupExecution />} />
                
                <Route path="/FoerderPruefradar" element={<FoerderPruefradar />} />
                
                <Route path="/Datenqualitaet" element={<Datenqualitaet />} />
                
                <Route path="/AntragAssistent" element={<AntragAssistent />} />
                
                <Route path="/ProductionReadiness" element={<ProductionReadiness />} />
                
                <Route path="/Impressum" element={<Impressum />} />
                
                <Route path="/Datenschutz" element={<Datenschutz />} />
                
                <Route path="/AGB" element={<AGB />} />
                
                <Route path="/Hilfe" element={<Hilfe />} />
                
                <Route path="/Bericht" element={<Bericht />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/Antraege" element={<Antraege />} />
                
                <Route path="/PdfAusfuellhilfe" element={<PdfAusfuellhilfe />} />
                
                <Route path="/LandingPage" element={<LandingPage />} />
                
                <Route path="/StripeSetup" element={<StripeSetup />} />
                
                <Route path="/BillingAgent" element={<BillingAgent />} />
                
                <Route path="/BackendSetup" element={<BackendSetup />} />
                
                <Route path="/StripeAutoSetup" element={<StripeAutoSetup />} />
                
                <Route path="/QATests" element={<QATests />} />
                
                <Route path="/PdfAutofill" element={<PdfAutofill />} />
                
                <Route path="/WebAssistent" element={<WebAssistent />} />
                
                <Route path="/Onboarding" element={<Onboarding />} />
                <Route path="/onboarding" element={<Onboarding />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <UserProfileProvider>
                <NotificationProvider>
                    <PagesContent />
                </NotificationProvider>
            </UserProfileProvider>
        </Router>
    );
}