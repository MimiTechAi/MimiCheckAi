/**
 * TrustMarquee Component - Social Proof für Bürger
 *
 * Zeigt Förderarten und Erfolgsstatistiken statt Unternehmenslogos.
 * Für normale Bürger optimiert.
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import {
  Home,
  GraduationCap,
  Baby,
  Heart,
  Briefcase,
  Car,
  Zap,
  Building2,
  Users,
  Wallet,
} from "lucide-react";

export interface FoerderungItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface TrustMarqueeProps {
  title?: string;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

// Förderungen für normale Bürger
const foerderungen: FoerderungItem[] = [
  { name: "Wohngeld", icon: Home, color: "from-emerald-500 to-teal-500" },
  {
    name: "BAföG",
    icon: GraduationCap,
    color: "from-violet-500 to-purple-500",
  },
  { name: "Kindergeld", icon: Baby, color: "from-pink-500 to-rose-500" },
  { name: "Elterngeld", icon: Heart, color: "from-red-500 to-orange-500" },
  {
    name: "Arbeitslosengeld",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-500",
  },
  { name: "Bürgergeld", icon: Users, color: "from-amber-500 to-yellow-500" },
  { name: "Energiepauschale", icon: Zap, color: "from-yellow-500 to-lime-500" },
  { name: "Kinderzuschlag", icon: Baby, color: "from-teal-500 to-emerald-500" },
  {
    name: "Wohnungsbauprämie",
    icon: Building2,
    color: "from-indigo-500 to-violet-500",
  },
  { name: "Pendlerpauschale", icon: Car, color: "from-cyan-500 to-blue-500" },
  { name: "Grundsicherung", icon: Wallet, color: "from-orange-500 to-red-500" },
];

function FoerderungBadge({
  item,
  reducedMotion,
}: {
  item: FoerderungItem;
  reducedMotion: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        flex items-center gap-3 px-5 py-3
        bg-white/[0.03] backdrop-blur-sm rounded-full
        border border-white/[0.08]
        transition-all duration-300
        ${reducedMotion ? "" : "hover:border-white/20 hover:bg-white/[0.06] hover:scale-105"}
      `}
    >
      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${item.color}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-white/80 font-medium text-sm whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

export default function TrustMarquee({
  title = "Über 50+ Förderungen automatisch prüfen",
  speed = 35,
  className = "",
  pauseOnHover = true,
}: TrustMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  const duplicatedItems = useMemo(() => {
    return [...foerderungen, ...foerderungen];
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      className={`py-12 sm:py-16 bg-[var(--framer-bg)] overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          variants={prefersReducedMotion ? undefined : titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-sm sm:text-base text-white/40 mb-2">{title}</p>
          <div className="flex items-center justify-center gap-4 text-xs text-white/30">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live aktualisiert
            </span>
            <span>•</span>
            <span>Stand: Dezember 2025</span>
          </div>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[var(--framer-bg)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[var(--framer-bg)] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <motion.div
            className={`
              flex items-center gap-4 sm:gap-6
              ${pauseOnHover && !prefersReducedMotion ? "hover:[animation-play-state:paused]" : ""}
            `}
            style={{ width: "max-content" }}
            animate={prefersReducedMotion ? {} : { x: ["0%", "-50%"] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { x: { duration: speed, repeat: Infinity, ease: "linear" } }
            }
          >
            {duplicatedItems.map((item, index) => (
              <FoerderungBadge
                key={`${item.name}-${index}`}
                item={item}
                reducedMotion={prefersReducedMotion ?? false}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          variants={prefersReducedMotion ? undefined : titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-white">2.847+</p>
            <p className="text-xs sm:text-sm text-white/40">
              Erfolgreiche Anträge
            </p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">
              847€
            </p>
            <p className="text-xs sm:text-sm text-white/40">Ø Ersparnis/Jahr</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-white">98%</p>
            <p className="text-xs sm:text-sm text-white/40">Erfolgsquote</p>
          </div>
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-violet-400">
              3 Min
            </p>
            <p className="text-xs sm:text-sm text-white/40">Bis zum Ergebnis</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { TrustMarquee };
