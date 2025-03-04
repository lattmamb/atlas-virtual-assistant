
import { useRef } from 'react';

interface SwipeableOptions {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
  threshold?: number;
}

export function useSwipeable({
  onSwipedLeft,
  onSwipedRight,
  onSwipedUp,
  onSwipedDown,
  threshold = 50
}: SwipeableOptions) {
  const touchStart = useRef<[number, number] | null>(null);
  
  const handlers = {
    onTouchStart: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      touchStart.current = [touch.clientX, touch.clientY];
    },
    
    onTouchMove: (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      
      const touch = e.touches[0];
      const [startX, startY] = touchStart.current;
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      
      // Prevent scrolling when swiping horizontally
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
      }
    },
    
    onTouchEnd: (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      
      const touch = e.changedTouches[0];
      const [startX, startY] = touchStart.current;
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > threshold) {
          onSwipedRight?.();
        } else if (deltaX < -threshold) {
          onSwipedLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > threshold) {
          onSwipedDown?.();
        } else if (deltaY < -threshold) {
          onSwipedUp?.();
        }
      }
      
      touchStart.current = null;
    }
  };
  
  return handlers;
}
