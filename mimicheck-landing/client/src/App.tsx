import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation, Router as BaseRouter } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SupabaseAuthProvider } from "./contexts/SupabaseAuthContext";
import LandingFramer from "./pages/LandingFramer";
import LandingPagePremium from "./pages/LandingPagePremium";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SupabaseDashboard from "./pages/SupabaseDashboard";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";

function InnerRouter() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Switch location={location}>
          {/* Landing Page - Framer-Style Premium Edition (Requirement: 1.4) */}
          <Route path="/" component={LandingFramer} />
          <Route path="/landingpage" component={LandingFramer} />
          <Route path="/index.html" component={LandingFramer} />

          {/* Legacy Landing Page - Premium 2025 Edition */}
          <Route path="/landing-legacy" component={LandingPagePremium} />

          {/* Auth & Contact */}
          <Route path="/auth" component={Auth} />
          <Route path="/contact" component={Contact} />

          {/* Dashboard (Protected) */}
          <Route path="/dashboard" component={SupabaseDashboard} />
          <Route path="/dashboard-old" component={Dashboard} />

          {/* About & Blog pages */}
          <Route
            path="/about"
            component={() => (
              <PagePlaceholder
                title="Über uns"
                description="Erfahre mehr über MimiCheck AI und unser Team."
              />
            )}
          />
          <Route
            path="/blog"
            component={() => (
              <PagePlaceholder
                title="Blog"
                description="Neuigkeiten und Tipps rund um Förderanträge."
              />
            )}
          />

          {/* Legal pages */}
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/agb" component={AGB} />
          <Route
            path="/barrierefreiheit"
            component={() => <PagePlaceholder title="Barrierefreiheit" />}
          />
          <Route
            path="/hilfe"
            component={() => <PagePlaceholder title="Hilfe & FAQ" />}
          />
          <Route
            path="/ki-transparenz"
            component={() => <PagePlaceholder title="KI-Transparenz" />}
          />

          {/* 404 */}
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function Router() {
  const rawBase =
    (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ??
    "/";
  const base = String(rawBase).replace(/\/$/, "");
  return (
    <BaseRouter base={base}>
      <InnerRouter />
    </BaseRouter>
  );
}

// Placeholder component for pages under construction
function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4 text-white">{title}</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          {description ?? "Diese Seite wird in Kürze verfügbar sein."}
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SupabaseAuthProvider>
        <ThemeProvider defaultTheme="light" switchable>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </SupabaseAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
