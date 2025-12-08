import { motion } from 'framer-motion';

/**
 * Floating Orbs - SUPER VISIBLE VERSION
 * Inspired by: Linear, Notion, Superhuman, YC Startups 2024/2025
 */
export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Orb 1 - Emerald - Top Left */}
      <motion.div
        className="absolute -top-20 -left-20 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.15) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb 2 - Teal - Top Right */}
      <motion.div
        className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.35) 0%, rgba(20,184,166,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, 120, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Orb 3 - Cyan - Bottom Left */}
      <motion.div
        className="absolute bottom-20 -left-20 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, -100, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Orb 4 - Purple - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
      />

      {/* Orb 5 - Pink - Bottom Right */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-[550px] h-[550px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -90, 0],
          y: [0, 70, 0],
          scale: [1, 1.18, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8,
        }}
      />
    </div>
  );
}
