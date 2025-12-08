/**
 * Premium Gradient Mesh Background - Lusion/Stripe/Linear Style
 * 
 * Deutlich sichtbare, organische Animation die durch die ganze Seite fließt.
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-slate-950 to-teal-600/20" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* Animated Gradient Mesh Container */}
      <div className="gradient-mesh-container">
        {/* Primary Emerald Blob - Top Left */}
        <div className="gradient-blob gradient-blob-1" />
        
        {/* Secondary Teal Blob - Right */}
        <div className="gradient-blob gradient-blob-2" />
        
        {/* Tertiary Cyan Blob - Bottom */}
        <div className="gradient-blob gradient-blob-3" />
        
        {/* Accent Purple Blob - Center */}
        <div className="gradient-blob gradient-blob-4" />
        
        {/* Extra Glow - Top */}
        <div className="gradient-blob gradient-blob-5" />
      </div>

      {/* Noise texture for depth */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.4)_70%,rgba(2,6,23,0.8)_100%)]" />
    </div>
  );
}
