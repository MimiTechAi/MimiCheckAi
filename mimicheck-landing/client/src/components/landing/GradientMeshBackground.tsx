/**
 * Premium Animated Background - SOTA 2025
 * Inspired by: Stripe, Linear, Vercel, Lusion, Basement Studio
 * 
 * Features:
 * - Animated gradient orbs with CSS animations
 * - Floating particles
 * - Noise texture overlay
 * - Performant CSS-only animations
 */

import { useEffect, useState, useMemo } from 'react';

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

// Floating particles component
function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.5 + 0.1,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-emerald-400/30 animate-float-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
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
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0" style={{ filter: 'blur(80px)' }}>
        {/* Primary Emerald Orb - Large */}
        <div 
          className="absolute animate-orb-1"
          style={{
            width: '50vmax',
            height: '50vmax',
            top: '-10%',
            left: '-10%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        
        {/* Secondary Teal Orb */}
        <div 
          className="absolute animate-orb-2"
          style={{
            width: '45vmax',
            height: '45vmax',
            top: '20%',
            right: '-15%',
            background: 'radial-gradient(circle, rgba(20,184,166,0.35) 0%, rgba(20,184,166,0.1) 50%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        
        {/* Tertiary Cyan Orb */}
        <div 
          className="absolute animate-orb-3"
          style={{
            width: '40vmax',
            height: '40vmax',
            bottom: '-5%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        
        {/* Accent Purple Orb */}
        <div 
          className="absolute animate-orb-4"
          style={{
            width: '35vmax',
            height: '35vmax',
            top: '40%',
            left: '40%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Extra Glow Orb */}
        <div 
          className="absolute animate-orb-5"
          style={{
            width: '30vmax',
            height: '30vmax',
            top: '60%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(52,211,153,0.05) 50%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.3)_60%,rgba(2,6,23,0.7)_100%)]" />
    </div>
  );
}
