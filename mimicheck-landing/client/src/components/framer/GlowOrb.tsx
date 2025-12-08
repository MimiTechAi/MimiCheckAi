/**
 * GlowOrb Component - Framer-Style Animated Background
 *
 * A pulsing violet/emerald glow orb with floating particle effects.
 * Inspired by premium Framer landing pages like XTRACT.
 *
 * Requirements: 2.1, 2.6, 2.7
 */

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

export interface GlowOrbProps {
  /** Size of the orb in pixels (default: 400) */
  size?: number;
  /** Primary color of the orb (default: violet) */
  color?: "violet" | "emerald" | "mixed";
  /** Animation speed in seconds (default: 4) */
  pulseSpeed?: number;
  /** Blur amount in pixels (default: 100) */
  blur?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show floating particles (default: true) */
  showParticles?: boolean;
  /** Number of particles (default: 25) */
  particleCount?: number;
}

// Color configurations for different orb variants
const colorConfigs = {
  violet: {
    primary: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.4)",
    particle: "#a78bfa",
  },
  emerald: {
    primary: "#10b981",
    glow: "rgba(16, 185, 129, 0.3)",
    particle: "#34d399",
  },
  mixed: {
    primary: "#8b5cf6",
    glow: "rgba(16, 185, 129, 0.3)",
    particle: "#a78bfa",
  },
};

/**
 * Generates random particle configurations
 * Creates particles distributed in a circular pattern around the orb
 */
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    // Distribute particles in a circular pattern
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const radius = 60 + Math.random() * 100; // 60-160px from center

    return {
      id: i,
      // Position based on angle and radius for circular distribution
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      // Random size between 2-6px
      size: Math.random() * 4 + 2,
      // Staggered animation delays for wave effect
      delay: (i / count) * 4 + Math.random() * 2,
      // Random duration between 6-12s
      duration: Math.random() * 6 + 6,
      // Random opacity
      opacity: Math.random() * 0.5 + 0.3,
      // Movement direction based on angle
      moveAngle: angle,
    };
  });
}

/**
 * Single floating particle component
 * Animates with organic floating motion radiating outward from the orb
 */
function Particle({
  x,
  y,
  size,
  delay,
  duration,
  opacity,
  color,
  reducedMotion,
  moveAngle,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
  reducedMotion: boolean;
  moveAngle: number;
}) {
  // Calculate movement direction based on angle (particles float outward)
  const moveX = Math.cos(moveAngle) * 40;
  const moveY = Math.sin(moveAngle) * 40 - 30; // Slight upward bias

  if (reducedMotion) {
    return (
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          opacity: opacity * 0.5,
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none will-change-transform"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, opacity, opacity * 0.8, opacity, 0],
        scale: [0.5, 1.2, 1, 1.1, 0.5],
        x: [0, moveX * 0.5, moveX, moveX * 0.7, 0],
        y: [0, moveY * 0.5, moveY, moveY * 0.7, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/**
 * Custom hook to detect mobile viewport
 * Used for performance optimization on mobile devices
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

/**
 * GlowOrb - Animated pulsing orb with radial gradient and blur effect
 *
 * Performance optimizations for mobile (Requirement: 9.6):
 * - Reduced blur amount on mobile devices
 * - Smaller orb size on mobile
 * - Fewer particles on mobile
 * - Reduced opacity for better performance
 */
export default function GlowOrb({
  size = 400,
  color = "violet",
  pulseSpeed = 4,
  blur = 100,
  className = "",
  showParticles = true,
  particleCount = 25,
}: GlowOrbProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const colorConfig = colorConfigs[color];

  // Mobile performance optimizations (Requirement: 9.6)
  const mobileSize = isMobile ? size * 0.6 : size;
  const mobileBlur = isMobile ? Math.min(blur * 0.5, 50) : blur;
  const mobileParticleCount = isMobile
    ? Math.floor(particleCount * 0.4)
    : particleCount;
  const mobileOpacity = isMobile ? 0.4 : 0.6;

  // Memoize particles to prevent regeneration on re-renders
  const particles = useMemo(
    () => generateParticles(mobileParticleCount),
    [mobileParticleCount]
  );

  // Build the radial gradient based on color variant
  const gradient = useMemo(() => {
    if (color === "mixed") {
      return `radial-gradient(circle at center, ${colorConfig.primary} 0%, ${colorConfig.glow} 30%, rgba(16, 185, 129, 0.2) 50%, transparent 70%)`;
    }
    return `radial-gradient(circle at center, ${colorConfig.primary} 0%, ${colorConfig.glow} 30%, transparent 70%)`;
  }, [color, colorConfig]);

  // Animation variants for the orb
  const orbVariants = {
    initial: {
      scale: 1,
      opacity: mobileOpacity,
    },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [mobileOpacity, mobileOpacity + 0.2, mobileOpacity],
    },
  };

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: mobileSize * 1.5,
        height: mobileSize * 1.5,
      }}
    >
      {/* Main Glow Orb - Reduced blur on mobile for performance */}
      <motion.div
        className="absolute inset-0 rounded-full will-change-transform"
        style={{
          background: gradient,
          filter: `blur(${mobileBlur}px)`,
        }}
        variants={orbVariants}
        initial="initial"
        animate={prefersReducedMotion ? "initial" : "animate"}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary inner glow for depth - Simplified on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute rounded-full will-change-transform"
          style={{
            width: mobileSize * 0.6,
            height: mobileSize * 0.6,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle at center, ${colorConfig.primary} 0%, transparent 70%)`,
            filter: `blur(${mobileBlur * 0.5}px)`,
            opacity: 0.4,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }
          }
          transition={{
            duration: pulseSpeed * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: pulseSpeed * 0.2,
          }}
        />
      )}

      {/* Floating Particles - Reduced count on mobile, hidden if reduced motion */}
      {showParticles && !prefersReducedMotion && (
        <div className="absolute inset-0">
          {particles.map(particle => (
            <Particle
              key={particle.id}
              x={particle.x * (isMobile ? 0.6 : 1)}
              y={particle.y * (isMobile ? 0.6 : 1)}
              size={particle.size * (isMobile ? 0.8 : 1)}
              delay={particle.delay}
              duration={particle.duration}
              opacity={particle.opacity * (isMobile ? 0.7 : 1)}
              color={colorConfig.particle}
              reducedMotion={prefersReducedMotion ?? false}
              moveAngle={particle.moveAngle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Named export for convenience
export { GlowOrb };
