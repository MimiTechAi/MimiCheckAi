import { Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function LazySection({ 
  children, 
  fallback = <div className="h-48 w-full" />,
  className = '',
  rootMargin = '100px'
}) {
  const { targetRef, hasIntersected } = useIntersectionObserver({ 
    rootMargin,
    threshold: 0.01 
  });

  return (
    <div ref={targetRef} className={className}>
      {hasIntersected ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
