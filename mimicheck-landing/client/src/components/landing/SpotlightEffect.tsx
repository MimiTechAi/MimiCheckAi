import { useEffect, useState } from 'react';

/**
 * Spotlight Effect - SUPER VISIBLE VERSION
 * Inspired by: Vercel, Raycast, Arc Browser
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
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Main Spotlight - MUCH MORE VISIBLE */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 400,
          top: mousePosition.y - 400,
          background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Secondary Glow - Teal */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 60%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Inner Glow - Bright */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}
