import { lazy, Suspense } from 'react';

// Lazy load the heavy WebGL component
const WebGLBackground = lazy(() => import('./WebGLBackground.jsx'));

/**
 * Lazy-loaded wrapper for WebGLBackground component
 * Reduces initial bundle size by ~200KB (three.js)
 * 
 * Background effect - no loading state needed (graceful degradation)
 */
export default function WebGLBackgroundLazy() {
  return (
    <Suspense fallback={null}>
      <WebGLBackground />
    </Suspense>
  );
}
