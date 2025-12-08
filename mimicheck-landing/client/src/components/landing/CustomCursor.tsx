/**
 * Custom Cursor with Physics - Cuberto/Lusion Style
 * 
 * Features:
 * - Blob that follows mouse with spring physics
 * - Changes size/shape on hover over interactive elements
 * - Magnetic effect on buttons
 * - Blend mode for premium look
 */

/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  hoverType: 'default' | 'button' | 'link' | 'text' | 'media';
  text?: string;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    hoverType: 'default',
  });
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation - Cuberto style
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Outer ring with more lag
  const outerSpringConfig = { damping: 20, stiffness: 100, mass: 1 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for buttons
      if (target.closest('button, [role="button"], .magnetic-btn')) {
        setCursorState(prev => ({ ...prev, isHovering: true, hoverType: 'button' }));
        return;
      }
      
      // Check for links
      if (target.closest('a')) {
        setCursorState(prev => ({ ...prev, isHovering: true, hoverType: 'link' }));
        return;
      }
      
      // Check for media
      if (target.closest('video, img, .media-hover')) {
        setCursorState(prev => ({ ...prev, isHovering: true, hoverType: 'media' }));
        return;
      }
      
      // Check for text selection areas
      if (target.closest('p, h1, h2, h3, h4, h5, h6, span, .text-hover')) {
        setCursorState(prev => ({ ...prev, isHovering: true, hoverType: 'text' }));
        return;
      }

      setCursorState(prev => ({ ...prev, isHovering: false, hoverType: 'default' }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleElementHover);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleElementHover);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  const getCursorSize = () => {
    if (cursorState.isClicking) return 8;
    switch (cursorState.hoverType) {
      case 'button': return 60;
      case 'link': return 40;
      case 'media': return 80;
      case 'text': return 4;
      default: return 16;
    }
  };

  const getOuterSize = () => {
    if (cursorState.isClicking) return 30;
    switch (cursorState.hoverType) {
      case 'button': return 100;
      case 'link': return 60;
      case 'media': return 120;
      default: return 40;
    }
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: getCursorSize(),
          height: getCursorSize(),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-white"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: outerX,
          y: outerY,
        }}
        animate={{
          width: getOuterSize(),
          height: getOuterSize(),
          opacity: isVisible ? (cursorState.hoverType === 'text' ? 0 : 0.5) : 0,
          borderWidth: cursorState.isHovering ? 1 : 2,
        }}
        transition={{
          width: { type: 'spring', damping: 15, stiffness: 150 },
          height: { type: 'spring', damping: 15, stiffness: 150 },
          opacity: { duration: 0.3 },
        }}
      >
        <div 
          className="w-full h-full rounded-full border-emerald-400/50"
          style={{
            transform: 'translate(-50%, -50%)',
            borderWidth: 'inherit',
            borderStyle: 'solid',
            borderColor: 'rgba(16, 185, 129, 0.5)',
          }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
