import { useEffect, useRef, useState } from 'react';

/**
 * Spotlight Effect - Following Mouse
 * Inspired by: Vercel, Raycast, Arc Browser
 * 
 * Creates a beautiful spotlight that follows the mouse cursor
 */
export default function SpotlightEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Main Spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Secondary Glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
