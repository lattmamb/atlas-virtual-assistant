
"use client"

import React, { useState } from "react";
import { AnimatePresence, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import refactored components and hooks
import { useMediaQuery } from "@/hooks/use-media-query";
import PageCarouselContainer from "./carousel/PageCarouselContainer";
import CarouselSearch from "./carousel/CarouselSearch";
import ActiveCardOverlay from "./carousel/ActiveCardOverlay";
import { getDefaultPages } from "./carousel/defaultPages";
import { PageInfo } from "./carousel/types";

interface ThreeDCarouselProps {
  pages?: PageInfo[];
  fullWidth?: boolean;
}

export function ThreeDPageCarousel({ pages, fullWidth = false }: ThreeDCarouselProps) {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeCard, setActiveCard] = useState<PageInfo | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const controls = useAnimation();
  
  const defaultPages = getDefaultPages();
  const carouselPages = pages || defaultPages;

  const filteredPages = searchText 
    ? carouselPages.filter(page => 
        page.title.toLowerCase().includes(searchText.toLowerCase()) ||
        page.description.toLowerCase().includes(searchText.toLowerCase())
      )
    : carouselPages;

  const handleCardClick = (card: PageInfo, index: number) => {
    setActiveCard(card);
    setIsCarouselActive(false);
    controls.stop();
    
    // Navigate to the page after a brief delay to show the transition
    setTimeout(() => {
      navigate(card.path);
      
      // Reset the active card after navigation
      setTimeout(() => {
        setActiveCard(null);
        setIsCarouselActive(true);
      }, 500);
    }, 800);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 900 : fullWidth ? 2200 : 1800;

  return (
    <motion.div 
      layout 
      className={cn(
        "relative w-full",
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "z-10"
      )}
    >
      {/* Search and controls header */}
      <CarouselSearch 
        isDarkMode={isDarkMode}
        searchText={searchText}
        setSearchText={setSearchText}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />
      
      {/* Card gallery */}
      <AnimatePresence mode="sync">
        <ActiveCardOverlay 
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          setIsCarouselActive={setIsCarouselActive}
        />
      </AnimatePresence>
      
      <div className={cn(
        "relative w-full overflow-hidden",
        isFullscreen ? "h-[calc(100vh-64px)]" : "h-[500px]"
      )}>
        <div
          className="flex h-full items-center justify-center"
          style={{
            perspective: "1400px",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <PageCarouselContainer
            handleClick={handleCardClick}
            controls={controls}
            cards={filteredPages}
            isCarouselActive={isCarouselActive}
            isDarkMode={isDarkMode}
            cylinderWidth={cylinderWidth}
          />
        </div>
      </div>
    </motion.div>
  );
}

export { ThreeDPageCarousel, useMediaQuery };
