import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { APP_LOGO, APP_TITLE } from '@/const';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Zum Hauptinhalt springen
      </a>
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
        aria-label="Hauptnavigation"
      >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - MiMiCheck AI */}
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <img 
              src="/mimicheck-logo-nav.png" 
              alt="MiMiCheck Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              MiMiCheck
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="/#features"
              className="text-sm font-medium hover:text-emerald-400 transition-colors"
            >
              Förderungen
            </a>
            <a 
              href="/contact"
              className="text-sm font-medium hover:text-emerald-400 transition-colors"
            >
              Kontakt
            </a>

            <Button 
              asChild 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30"
            >
              <a href="/auth">Anmelden</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a 
                href="/#features"
                className="text-sm font-medium hover:text-emerald-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Förderungen
              </a>
              <a 
                href="/contact"
                className="text-sm font-medium hover:text-emerald-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kontakt
              </a>
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <a href="/auth" onClick={() => setIsMobileMenuOpen(false)}>Anmelden</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
