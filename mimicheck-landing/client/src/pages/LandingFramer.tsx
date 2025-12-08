/**
 * LandingFramer Page - Premium Framer-Style Landing Page
 *
 * A world-class landing page with dark theme, violet/emerald accents,
 * premium animations, and professional UI mockups.
 *
 * Requirements: 1.4, 1.5, 8.1, 8.2, 8.3, 8.5
 */

import { useEffect, createContext, useContext } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import {
  FramerNavbar,
  FramerHero,
  TrustMarquee,
  ServicesSection,
  FeaturesShowcase,
  ProcessSection,
  FramerFooter,
  GlobalBackground,
} from "@/components/framer";

// Import framer theme styles
import "@/styles/framer-theme.css";

/**
 * Animation Context - Provides reduced motion preference to child components
 * Requirement: 8.5
 *
 * This context allows any child component to access the user's motion preference
 * and adjust their animations accordingly.
 */
interface AnimationContextValue {
  /** Whether the user prefers reduced motion */
  prefersReducedMotion: boolean | null;
  /** Whether animations should be enabled (inverse of prefersReducedMotion) */
  animationsEnabled: boolean;
  /** Get animation variants or empty object based on preference */
  getVariants: <T extends Variants>(variants: T) => T | undefined;
  /** Get transition or undefined based on preference */
  getTransition: <T extends object>(transition: T) => T | undefined;
}

const AnimationContext = createContext<AnimationContextValue>({
  prefersReducedMotion: false,
  animationsEnabled: true,
  getVariants: variants => variants,
  getTransition: transition => transition,
});

/**
 * Hook to access animation context
 * Requirement: 8.5
 */
export const useAnimationContext = () => useContext(AnimationContext);

/**
 * Custom hook for reduced motion support
 * Requirement: 8.5
 *
 * Provides utilities for components to easily check and respond to
 * the user's reduced motion preference.
 */
function useReducedMotionSupport(
  prefersReducedMotion: boolean | null
): AnimationContextValue {
  const animationsEnabled = !prefersReducedMotion;

  return {
    prefersReducedMotion,
    animationsEnabled,
    getVariants: <T extends Variants>(variants: T): T | undefined => {
      return animationsEnabled ? variants : undefined;
    },
    getTransition: <T extends object>(transition: T): T | undefined => {
      return animationsEnabled ? transition : undefined;
    },
  };
}

/**
 * Animation variants for scroll-triggered section reveals
 * Requirements: 8.1, 8.2, 8.3
 */
const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Fade-up variants for individual items
 * Requirement: 8.1
 */
const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Staggered container variants for lists and cards
 * Requirement: 8.2
 */
const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Staggered item variants for children in stagger containers
 * Requirement: 8.2
 */
const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Scale-in variants for cards and mockups
 * Requirement: 8.3
 */
const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * LandingFramer - Main landing page component
 *
 * Composes all Framer-style section components with proper spacing,
 * scroll-triggered animations, and reduced motion support.
 *
 * Features:
 * - Framer Motion useInView for reveal animations (Requirement: 8.1)
 * - Staggered animations for lists and cards (Requirement: 8.2)
 * - Viewport-triggered animations (Requirement: 8.3)
 * - Reduced motion support (Requirement: 8.5)
 */
export default function LandingFramer() {
  const prefersReducedMotion = useReducedMotion();
  const animationContext = useReducedMotionSupport(prefersReducedMotion);

  // Set page title and meta
  useEffect(() => {
    document.title = "MimiCheck AI - Intelligente Förderanträge";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "MimiCheck AI - Dein digitaler Assistent für Förderanträge. KI-gestützt, sicher und 100% DSGVO-konform."
      );
    }

    // Add class to body for CSS-based reduced motion support (Requirement: 8.5)
    if (prefersReducedMotion) {
      document.body.classList.add("reduce-motion");
    } else {
      document.body.classList.remove("reduce-motion");
    }

    return () => {
      document.body.classList.remove("reduce-motion");
    };
  }, [prefersReducedMotion]);

  return (
    <AnimationContext.Provider value={animationContext}>
      <div
        className="min-h-screen bg-[#050505] text-[var(--framer-text-primary)] relative"
        id="main-content"
      >
        {/* Global Animated Background - spans entire page */}
        <GlobalBackground />

        {/* Navigation - Fixed at top (Requirement: 7.1-7.6) */}
        <FramerNavbar />

        {/* Main Content */}
        <main>
          {/* Hero Section (Requirements: 2.1-2.7) */}
          <FramerHero />

          {/* Trust Marquee (Requirements: 3.1-3.5) */}
          <AnimatedSection
            prefersReducedMotion={prefersReducedMotion}
            className="pt-0"
            animationType="fade"
          >
            <TrustMarquee />
          </AnimatedSection>

          {/* Services Overview (Requirements: 4.1-4.4) */}
          <AnimatedSection
            prefersReducedMotion={prefersReducedMotion}
            animationType="fade"
          >
            <ServicesSection />
          </AnimatedSection>

          {/* Feature Sections with UI Mockups (Requirements: 5.1-5.8) */}
          <AnimatedSection
            prefersReducedMotion={prefersReducedMotion}
            animationType="stagger"
          >
            <FeaturesShowcase />
          </AnimatedSection>

          {/* Process Section (Requirements: 6.1-6.9) */}
          <AnimatedSection
            prefersReducedMotion={prefersReducedMotion}
            animationType="stagger"
          >
            <ProcessSection />
          </AnimatedSection>
        </main>

        {/* Footer (Requirements: 10.1-10.5) */}
        <AnimatedSection
          prefersReducedMotion={prefersReducedMotion}
          animationType="fade"
        >
          <FramerFooter />
        </AnimatedSection>
      </div>
    </AnimationContext.Provider>
  );
}

/**
 * AnimatedSection - Wrapper component for scroll-triggered animations
 *
 * Provides consistent animations when sections enter the viewport.
 * Supports multiple animation types and respects reduced motion preferences.
 *
 * Requirements: 8.1, 8.2, 8.3, 8.5
 */
interface AnimatedSectionProps {
  children: React.ReactNode;
  prefersReducedMotion: boolean | null;
  className?: string;
  /** Animation type: 'fade' for simple fade-up, 'stagger' for staggered children, 'scale' for scale-in */
  animationType?: "fade" | "stagger" | "scale";
  /** Custom delay before animation starts (in seconds) */
  delay?: number;
}

function AnimatedSection({
  children,
  prefersReducedMotion,
  className = "",
  animationType = "fade",
  delay = 0,
}: AnimatedSectionProps) {
  // If user prefers reduced motion, render without animation wrapper (Requirement: 8.5)
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Select appropriate variants based on animation type
  const getVariants = (): Variants => {
    switch (animationType) {
      case "stagger":
        return staggerContainerVariants;
      case "scale":
        return scaleInVariants;
      case "fade":
      default:
        return sectionVariants;
    }
  };

  // Add delay to transition if specified
  const variants = getVariants();
  const modifiedVariants: Variants =
    delay > 0
      ? {
          ...variants,
          visible: {
            ...(variants.visible as object),
            transition: {
              ...((variants.visible as { transition?: object })?.transition ||
                {}),
              delay,
            },
          },
        }
      : variants;

  return (
    <motion.div
      className={className}
      variants={modifiedVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-100px",
        amount: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Export animation variants for use in child components
 * This allows child components to use consistent animations
 */
export {
  LandingFramer,
  sectionVariants,
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  scaleInVariants,
};
