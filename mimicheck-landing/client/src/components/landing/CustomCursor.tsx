/**
 * Custom Cursor with Physics - Cuberto/Lusion Style
 * PERFORMANCE OPTIMIZED
 * 
 * Features:
 * - Blob that follows mouse with spring physics
 * - Changes size/shape on hover over interactive elements
 * - Disabled on mobile/touch devices
 * - Respects prefers-reduced-motion
 */

/* eslint-disable no-undef */
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  hoverType: 'default' | 'button' | 'link' | 'text';
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    hoverType: 'default',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // Mouse position with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Check if cursor should be enabled
  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Check screen size (disable on mobile)
    const isLargeScreen = window.innerWidth >= 1024;
    
    setIsEnabled(!isTouchDevice && !prefersReducedMotion && isLargeScreen);

    const handleResize = () => {
      setIsEnabled(!isTouchDevice && !prefersReducedMotion && window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Throttled mouse move handler for performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  useEffect(() => {
    if (!isEnabled) return;

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('button, [role="button"], .magnetic-btn')) {
        setCursorState({ isHovering: true, hoverType: 'button' });
        return;
      }
      
      if (target.closest('a')) {
        setCursorState({ isHovering: true, hoverType: 'link' });
        return;
      }

      setCursorState({ isHovering: false, hoverType: 'default' });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    document.body.addEventListener('mouseenter', () => setIsVisible(true));
    document.body.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
    };
  }, [isEnabled, handleMouseMove]);

  // Don't render if not enabled
  if (!isEnabled) return null;

  const getCursorSize = () => {
    switch (cursorState.hoverType) {
      case 'button': return 50;
      case 'link': return 35;
      default: return 12;
    }
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: getCursorSize(),
          height: getCursorSize(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.15 },
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </motion.div>

      {/* Hide default cursor */}
      <style>{`
        @media (min-width: 1024px) and (hover: hover) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
