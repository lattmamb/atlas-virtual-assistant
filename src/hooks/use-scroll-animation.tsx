
import { useRef, useEffect, useState } from 'react';

// A hook that triggers animations based on scroll position
export function useScrollAnimation(options = { threshold: 0.1 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: options.threshold }
    );

    observer.observe(currentRef);
    
    const handleScroll = () => {
      if (!currentRef) return;
      
      const rect = currentRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      let progress = 0;
      
      if (rect.top <= 0) {
        // Element has scrolled up to or beyond the top of viewport
        progress = Math.min(1, Math.abs(rect.top) / rect.height);
      } else if (rect.top <= windowHeight) {
        // Element is within viewport
        progress = 1 - (rect.top / windowHeight);
      }
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    
    return () => {
      observer.unobserve(currentRef);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [options.threshold, hasAnimated]);

  return { ref, isVisible, hasAnimated, scrollProgress };
}
