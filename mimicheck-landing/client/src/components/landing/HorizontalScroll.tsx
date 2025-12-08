/**
 * Horizontal Scroll Section - Obys/Locomotive Style
 * 
 * Features:
 * - Vertical scroll triggers horizontal movement
 * - Parallax depth effects
 * - Progress indicator
 * - Snap points (optional)
 * - Mobile fallback to vertical
 */

/* eslint-disable no-undef */
import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  showProgress?: boolean;
  progressColor?: string;
}

export default function HorizontalScroll({
  children,
  className = '',
  speed = 1,
  showProgress = true,
  progressColor = '#10b981',
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate scroll width
  useEffect(() => {
    if (scrollRef.current) {
      setScrollWidth(scrollRef.current.scrollWidth - window.innerWidth);
    }
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring for x translation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollWidth * speed]);

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Mobile: render as vertical scroll
  if (isMobile) {
    return (
      <div className={`py-20 ${className}`}>
        <div className="flex flex-col gap-8 px-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${(scrollWidth / window.innerWidth) * 100 + 100}vh` }}
    >
      {/* Progress bar */}
      {showProgress && (
        <motion.div
          className="fixed top-0 left-0 h-1 z-50"
          style={{
            width: progressWidth,
            backgroundColor: progressColor,
          }}
        />
      )}

      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="flex items-center h-full"
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// Individual card for horizontal scroll
interface HorizontalCardProps {
  children: ReactNode;
  className?: string;
  width?: string;
  parallaxOffset?: number;
}

export function HorizontalCard({
  children,
  className = '',
  width = '80vw',
  parallaxOffset = 0,
}: HorizontalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={cardRef}
      className={`flex-shrink-0 px-4 md:px-8 ${className}`}
      style={{ 
        width,
        y,
        scale,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}

// Feature card designed for horizontal scroll
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  index: number;
  gradient?: string;
}

export function HorizontalFeatureCard({
  title,
  description,
  icon,
  image,
  index,
  gradient = 'from-emerald-500/20 to-teal-500/20',
}: FeatureCardProps) {
  return (
    <HorizontalCard 
      width="min(80vw, 600px)" 
      parallaxOffset={30 * (index % 2 === 0 ? 1 : -1)}
      className="h-[70vh]"
    >
      <div className={`
        relative h-full rounded-3xl overflow-hidden
        bg-gradient-to-br ${gradient}
        border border-white/10 backdrop-blur-sm
        group hover:border-emerald-500/50 transition-all duration-500
      `}>
        {/* Background image */}
        {image && (
          <div 
            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
          {/* Index number */}
          <span className="absolute top-8 right-8 text-8xl font-black text-white/5">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Icon */}
          {icon && (
            <div className="mb-6 w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              {icon}
            </div>
          )}

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h3>

          {/* Description */}
          <p className="text-lg text-slate-300 leading-relaxed max-w-md">
            {description}
          </p>

          {/* Decorative line */}
          <div className="mt-8 h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:w-32 transition-all duration-500" />
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent transition-all duration-500" />
      </div>
    </HorizontalCard>
  );
}

// Stats card for horizontal scroll
interface StatsCardProps {
  stat: string;
  label: string;
  description?: string;
  index: number;
}

export function HorizontalStatsCard({
  stat,
  label,
  description,
  index,
}: StatsCardProps) {
  return (
    <HorizontalCard 
      width="min(60vw, 400px)" 
      parallaxOffset={20}
      className="h-[50vh]"
    >
      <div className="h-full rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-center text-center group hover:border-emerald-500/30 transition-all duration-300">
        {/* Stat number */}
        <motion.span 
          className="text-6xl md:text-8xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, type: 'spring' }}
        >
          {stat}
        </motion.span>

        {/* Label */}
        <span className="mt-4 text-xl font-semibold text-white">
          {label}
        </span>

        {/* Description */}
        {description && (
          <p className="mt-2 text-sm text-slate-400">
            {description}
          </p>
        )}
      </div>
    </HorizontalCard>
  );
}
