import { lazy, Suspense } from 'react';

// Lazy load the heavy 3D component
const Scene3D = lazy(() => import('./Scene3D.jsx'));

// Loading fallback
function Scene3DFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading 3D Scene...</p>
      </div>
    </div>
  );
}

/**
 * Lazy-loaded wrapper for Scene3D component
 * Reduces initial bundle size by ~500KB (three.js + react-three-fiber)
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.reducedMotion - Disable animations for accessibility
 */
export default function Scene3DLazy(props) {
  return (
    <Suspense fallback={<Scene3DFallback />}>
      <Scene3D {...props} />
    </Suspense>
  );
}
