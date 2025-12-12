import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const navItems = [
  { id: 'hero', icon: TrendingUp, label: 'dashboard.bottomNav.overview' },
  { id: 'stats', icon: BarChart3, label: 'dashboard.bottomNav.stats' },
  { id: 'activity', icon: Activity, label: 'dashboard.bottomNav.activity' },
];

export default function DashboardBottomNav() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('hero');

  const getScrollContainer = () => {
    return document.getElementById('app-scroll-container') || window;
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'hero', navId: 'hero' },
        { id: 'stats', navId: 'stats' },
        { id: 'tabs', navId: 'stats' },
        { id: 'activity', navId: 'activity' }
      ];

      const container = getScrollContainer();
      const isWindow = container === window;
      const scrollTop = isWindow ? window.scrollY : container.scrollTop;
      const viewportHeight = isWindow ? window.innerHeight : container.clientHeight;
      const scrollPosition = scrollTop + viewportHeight / 2;

      const containerRect = !isWindow ? container.getBoundingClientRect() : null;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const elementTop = isWindow
            ? element.offsetTop
            : (elementRect.top - containerRect.top + scrollTop);
          const elementHeight = element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
            setActiveSection(section.navId);
            break;
          }
        }
      }
    };

    const container = getScrollContainer();
    if (container === window) {
      window.addEventListener('scroll', handleScroll);
    } else {
      container.addEventListener('scroll', handleScroll);
    }

    handleScroll();

    return () => {
      if (container === window) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const container = getScrollContainer();

      if (container === window) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top - containerRect.top + container.scrollTop;
      const targetTop = Math.max(0, elementTop - offset);

      container.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
      style={{
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      }}
      aria-label={t('dashboard.bottomNav.ariaLabel', 'Dashboard Navigation')}
    >
      <div className="flex items-center justify-around px-2 pt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative flex flex-col items-center justify-center flex-1 py-2 px-3 transition-colors min-h-[48px] min-w-[48px]"
              aria-label={t(item.label, item.label)}
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                />
              </motion.div>
              <span
                className={`text-xs mt-1 transition-colors ${
                  isActive ? 'text-emerald-400 font-semibold' : 'text-slate-500'
                }`}
              >
                {t(item.label, item.label.split('.').pop())}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
