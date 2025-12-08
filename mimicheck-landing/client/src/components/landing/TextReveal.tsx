/**
 * Text Reveal Animation - Locomotive/Obys Style
 * 
 * Features:
 * - Character-by-character reveal
 * - Word-by-word reveal
 * - Line-by-line reveal with mask
 * - Scroll-triggered animations
 * - Multiple animation styles
 */

/* eslint-disable no-undef */
import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// Character by character reveal
interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function CharReveal({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: CharRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: '1000px' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className="inline-block"
          style={{ 
            transformStyle: 'preserve-3d',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Word by word reveal
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  highlightWords?: string[];
  highlightClassName?: string;
}

export function WordReveal({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.08,
  once = true,
  highlightWords = [],
  highlightClassName = 'text-emerald-400',
}: WordRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const words = text.split(' ');

  return (
    <motion.span
      ref={ref}
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, i) => {
        const isHighlighted = highlightWords.some(hw => 
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] ${isHighlighted ? highlightClassName : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

// Line reveal with mask effect
interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function LineReveal({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.8,
  once = true,
  direction = 'up',
}: LineRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: '100%' };
      case 'down': return { y: '-100%' };
      case 'left': return { x: '100%' };
      case 'right': return { x: '-100%' };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down': return { y: 0 };
      case 'left':
      case 'right': return { x: 0 };
    }
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={getInitialPosition()}
        animate={isInView ? getFinalPosition() : getInitialPosition()}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Split text with stagger - Premium headline effect
interface SplitTextProps {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function SplitText({ 
  text, 
  className = '', 
  lineClassName = '',
  delay = 0,
  staggerDelay = 0.1,
  once = true,
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  // Split by newlines or treat as single line
  const lines = text.includes('\n') ? text.split('\n') : [text];

  return (
    <div ref={ref} className={className}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="overflow-hidden">
          <motion.div
            className={lineClassName}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + lineIndex * staggerDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// Scramble text effect - Matrix/Hacker style
interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  once?: boolean;
}

export function ScrambleText({ 
  text, 
  className = '',
  scrambleSpeed = 30,
  once = true,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    if (!isInView || !ref.current) return;

    let iteration = 0;
    const originalText = text;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (!ref.current) return;

      ref.current.innerText = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [isInView, text, scrambleSpeed]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {text}
    </span>
  );
}

// Gradient reveal - Text appears with gradient wipe
interface GradientRevealProps {
  text: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function GradientReveal({
  text,
  className = '',
  gradientFrom = '#10b981',
  gradientTo = '#06b6d4',
  delay = 0,
  duration = 1.5,
  once = true,
}: GradientRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Background text (gray) */}
      <span className="text-slate-700">{text}</span>
      
      {/* Gradient overlay that reveals */}
      <motion.span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}
