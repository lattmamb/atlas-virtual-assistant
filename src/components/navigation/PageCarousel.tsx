
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "@/hooks/use-swipeable";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useTransform } from "framer-motion";

// Import refactored components
import CarouselHeader from "./carousel/CarouselHeader";
import Carousel3D from "./carousel/Carousel3D";
import NavigationControls from "./carousel/NavigationControls";
import TransitionOverlay from "./carousel/TransitionOverlay";
import { defaultPages } from "./carousel/carouselData";
import { useCarousel } from "@/hooks/use-carousel";

const PageCarousel: React.FC = () => {
  const { isDarkMode } = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const {
    activePageIndex,
    isExpanded,
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
  } = useCarousel(defaultPages);

  // For the 3D transform effect
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextPage(),
    onSwipedRight: () => handlePreviousPage(),
    onSwipedUp: () => setIsExpanded(true),
    onSwipedDown: () => setIsExpanded(false)
  });

  // Handle carousel card click
  const handleCardClick = (path: string, index: number) => {
    handlePageChange(index);
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-40 pointer-events-auto transition-colors duration-300",
        isExpanded ? "bg-black/50 backdrop-blur-md" : "bg-transparent pointer-events-none"
      )}
      {...swipeHandlers}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: 1, 
          y: isExpanded ? 0 : window.innerHeight - 120 
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "absolute bottom-0 left-0 right-0 rounded-t-3xl backdrop-blur-xl",
          isDarkMode 
            ? "bg-black/80 border-t border-white/10" 
            : "bg-white/80 border-t border-black/10",
          "overflow-hidden pointer-events-auto"
        )}
        style={{ height: isExpanded ? "85vh" : "120px" }}
      >
        {/* Header with page info */}
        <CarouselHeader 
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          activePage={defaultPages[activePageIndex]}
        />
        
        {/* Carousel */}
        <div className="relative overflow-hidden" style={{ height: isExpanded ? "calc(85vh - 200px)" : "0px" }}>
          {isExpanded && (
            <div className="relative h-full" ref={carouselRef}>
              <Carousel3D 
                pages={defaultPages}
                activePageIndex={activePageIndex}
                rotation={transform}
                controls={controls}
                isCarouselActive={isCarouselActive}
                handleCardClick={handleCardClick}
              />
            </div>
          )}
        </div>
        
        {/* Navigation controls */}
        <NavigationControls 
          pages={defaultPages}
          activePageIndex={activePageIndex}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          onDotClick={handlePageChange}
        />
      </motion.div>
      
      {/* Page transition animation overlay */}
      <TransitionOverlay 
        activeImg={activeImg}
        activePageIndex={activePageIndex}
        pages={defaultPages}
        onClose={() => {
          setActiveImg(null);
          setIsCarouselActive(true);
        }}
      />
    </div>
  );
};

export default PageCarousel;
