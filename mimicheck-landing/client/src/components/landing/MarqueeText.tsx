/**
 * Marquee Text Banner - Awwwards/Obys Style
 * 
 * Features:
 * - Infinite scrolling text
 * - Hover to pause
 * - Gradient fade edges
 * - Multiple speed options
 * - Reverse direction option
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MarqueeTextProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  separator?: ReactNode;
  repeat?: number;
}

export default function MarqueeText({
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className = '',
  separator = <span className="mx-8 text-emerald-500">✦</span>,
  repeat = 4,
}: MarqueeTextProps) {
  const speeds = {
    slow: 40,
    normal: 25,
    fast: 15,
  };

  const duration = speeds[speed];
  const directionMultiplier = direction === 'left' ? -1 : 1;

  const content = Array(repeat)
    .fill(null)
    .map((_, i) => (
      <span key={i} className="flex items-center whitespace-nowrap">
        {children}
        {separator}
      </span>
    ));

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex"
        animate={{
          x: [0, directionMultiplier * -50 + '%'],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
        style={{
          width: 'fit-content',
        }}
      >
        <div className="flex items-center">
          {content}
          {content}
        </div>
      </motion.div>
    </div>
  );
}

// Pre-styled variants
export function MarqueeHeadline({ text, className = '' }: { text: string; className?: string }) {
  return (
    <MarqueeText
      speed="slow"
      className={`py-8 border-y border-emerald-500/20 ${className}`}
      separator={<span className="mx-12 text-emerald-400 text-2xl">◆</span>}
    >
      <span className="text-6xl md:text-8xl font-black text-white/90 uppercase tracking-tight">
        {text}
      </span>
    </MarqueeText>
  );
}

export function MarqueeTrust({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <MarqueeText
      speed="normal"
      direction="right"
      className={`py-4 bg-emerald-500/5 ${className}`}
      separator={<span className="mx-6 text-emerald-500">•</span>}
    >
      {items.map((item, i) => (
        <span key={i} className="text-sm font-medium text-slate-400 uppercase tracking-widest">
          {item}
        </span>
      ))}
    </MarqueeText>
  );
}

export function MarqueeLogos({ logos, className = '' }: { logos: { src: string; alt: string }[]; className?: string }) {
  return (
    <MarqueeText
      speed="slow"
      className={`py-8 ${className}`}
      separator={<span className="mx-16" />}
      pauseOnHover={false}
    >
      {logos.map((logo, i) => (
        <img
          key={i}
          src={logo.src}
          alt={logo.alt}
          className="h-8 w-auto opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
        />
      ))}
    </MarqueeText>
  );
}
