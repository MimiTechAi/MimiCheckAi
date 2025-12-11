import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { User, TrendingUp, FileCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DashboardTabsMobile({ 
  tabs, 
  activeTab, 
  onTabChange, 
  profileReady, 
  recommendationsCount 
}) {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center', 
    containScroll: 'trimSnaps',
    skipSnaps: false
  });

  const tabIcons = {
    overview: TrendingUp,
    profile: User,
    antraege: FileCheck,
  };

  const tabColors = {
    overview: 'from-blue-600 to-indigo-600',
    profile: 'from-emerald-600 to-teal-600',
    antraege: 'from-purple-600 to-pink-600',
  };

  const handleTabClick = (tabValue, index) => {
    onTabChange(tabValue);
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="w-full">
      {/* Mobile Swipeable Tab Headers */}
      <div className="overflow-hidden mb-6" ref={emblaRef}>
        <div className="flex gap-3 px-1">
          {tabs.map((tab, index) => {
            const Icon = tabIcons[tab.value];
            const isActive = activeTab === tab.value;
            const colorClass = tabColors[tab.value];

            return (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value, index)}
                className={`
                  relative flex-shrink-0 w-[calc(33.333%-8px)] min-w-[100px]
                  flex flex-col items-center justify-center
                  min-h-[72px] rounded-2xl transition-all duration-300
                  ${isActive 
                    ? `bg-gradient-to-r ${colorClass} text-white shadow-lg scale-105` 
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                  }
                `}
                aria-label={t(tab.label, tab.label)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-semibold text-center px-1">
                  {t(tab.label, tab.label.split('.').pop())}
                </span>
                {tab.value === 'profile' && !profileReady && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                )}
                {tab.value === 'antraege' && recommendationsCount > 0 && (
                  <span className="absolute top-2 right-2 min-w-[20px] h-5 px-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {recommendationsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tabs.find(tab => tab.value === activeTab)?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
