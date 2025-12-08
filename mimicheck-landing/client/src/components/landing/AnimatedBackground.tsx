import { lazy, Suspense } from 'react';

// Lazy load WebGL for better initial load
const WebGLBackground = lazy(() => import('./WebGLBackground'));

/**
 * Animated Background - WebGL Powered
 * Lazy loads the heavy 3D components for better performance
 */
export default function AnimatedBackground() {
  return (
    <Suspense fallback={<FallbackBackground />}>
      <WebGLBackground />
    </Suspense>
  );
}

// Simple CSS fallback while WebGL loads
function FallbackBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Simple CSS gradient orbs as fallback */}
      <div 
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div 
        className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '1s',
        }}
      />
    </div>
  );
}
