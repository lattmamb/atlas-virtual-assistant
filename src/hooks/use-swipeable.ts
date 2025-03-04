
import { useEffect, useState } from 'react';

interface SwipeHandlers {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
}

interface SwipeableResult {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
}

export const useSwipeable = (handlers: SwipeHandlers): SwipeableResult => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  // Minimum distance in pixels to be considered a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          handlers.onSwipedLeft?.();
        } else {
          handlers.onSwipedRight?.();
        }
      }
    } else {
      if (Math.abs(distanceY) > minSwipeDistance) {
        if (distanceY > 0) {
          handlers.onSwipedUp?.();
        } else {
          handlers.onSwipedDown?.();
        }
      }
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true);
    setTouchEnd(null);
    setTouchStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown) return;
    setTouchEnd({
      x: e.clientX,
      y: e.clientY
    });
  };

  const onMouseUp = () => {
    setMouseDown(false);
    onTouchEnd();
  };

  // Clean up event listeners if component unmounts while mouse is down
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setMouseDown(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp
  };
};
