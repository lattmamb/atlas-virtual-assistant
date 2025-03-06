
import { useState, useEffect } from 'react';
import { useAnimation, useMotionValue } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface PageInfo {
  path: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  imageUrl?: string;
}

export const useCarousel = (pages: PageInfo[]) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  // Find current page index
  useEffect(() => {
    const index = pages.findIndex(page => page.path === location.pathname);
    if (index !== -1) {
      setActivePageIndex(index);
    }
  }, [location.pathname, pages]);

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < pages.length) {
      setActivePageIndex(index);
      setIsTransitioning(true);
      setActiveImg(pages[index].imageUrl || null);
      setIsCarouselActive(false);
      
      // Delay navigation to allow for animation
      setTimeout(() => {
        navigate(pages[index].path);
        toast.success(`Navigating to ${pages[index].title}`);
        setIsTransitioning(false);
        // Reset carousel after navigation
        setTimeout(() => {
          setActiveImg(null);
          setIsCarouselActive(true);
        }, 500);
      }, 800);
    }
  };

  const handleNextPage = () => {
    const nextIndex = (activePageIndex + 1) % pages.length;
    handlePageChange(nextIndex);
  };

  const handlePreviousPage = () => {
    const prevIndex = activePageIndex === 0 ? pages.length - 1 : activePageIndex - 1;
    handlePageChange(prevIndex);
  };

  return {
    activePageIndex,
    isExpanded,
    isTransitioning,
    activeImg,
    isCarouselActive,
    controls,
    rotation,
    setIsExpanded,
    setActiveImg,
    setIsCarouselActive,
    handlePageChange,
    handleNextPage,
    handlePreviousPage
  };
};
