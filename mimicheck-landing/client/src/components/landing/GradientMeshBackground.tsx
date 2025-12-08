/**
 * Gradient Mesh Background - Lusion/Basement Studio Style
 * 
 * Durchgehende, organische Animation die sich durch die ganze Seite zieht.
 * Performant durch CSS-only Animationen + GPU-Beschleunigung.
 */

import { useEffect, useState } from 'react';

// Check for reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}

export default function GradientMeshBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-slate-950 to-teal-500/5" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.03),transparent_70%)]" />
      
      {/* Animated gradient orbs */}
      <div className="gradient-mesh">
        {/* Primary orb - Emerald */}
        <div 
          className="gradient-orb gradient-orb-1"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 40%, transparent 70%)',
          }}
        />
        
        {/* Secondary orb - Teal */}
        <div 
          className="gradient-orb gradient-orb-2"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, rgba(20,184,166,0.04) 40%, transparent 70%)',
          }}
        />
        
        {/* Tertiary orb - Cyan */}
        <div 
          className="gradient-orb gradient-orb-3"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(6,182,212,0.03) 40%, transparent 70%)',
          }}
        />
        
        {/* Accent orb - Purple hint */}
        <div 
          className="gradient-orb gradient-orb-4"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}
