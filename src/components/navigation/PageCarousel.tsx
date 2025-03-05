
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useSwipeable } from "@/hooks/use-swipeable";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface PageInfo {
  path: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

const PageCarousel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [isFullyOpened, setIsFullyOpened] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const pages: PageInfo[] = useMemo(() => [
    { 
      path: "/", 
      title: "Home", 
      description: "Your Atlas Universe Hub",
      color: "from-blue-500 to-purple-600",
      icon: "🏠"
    },
    { 
      path: "/universe", 
      title: "U-N-I-Verse", 
      description: "Explore the unified space",
      color: "from-violet-500 to-indigo-600",
      icon: "🌌"
    },
    { 
      path: "/chatroom", 
      title: "Chat Room", 
      description: "Talk to Atlas AI assistant",
      color: "from-green-500 to-teal-600",
      icon: "💬"
    },
    { 
      path: "/atlaslink", 
      title: "Atlas Link", 
      description: "Connect with Trinity Dodge",
      color: "from-amber-500 to-orange-600",
      icon: "🔗"
    },
    { 
      path: "/applevisionpro", 
      title: "Vision Pro", 
      description: "Experience Apple Vision Pro",
      color: "from-gray-700 to-gray-900",
      icon: "👁️"
    },
    { 
      path: "/settings", 
      title: "Settings", 
      description: "Configure your experience",
      color: "from-slate-500 to-slate-700",
      icon: "⚙️"
    }
  ], []);

  // Find current page index
  useEffect(() => {
    const index = pages.findIndex(page => page.path === location.pathname);
    if (index !== -1) {
      setActivePageIndex(index);
    }
  }, [location.pathname, pages]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextPage(),
    onSwipedRight: () => handlePreviousPage(),
    onSwipedUp: () => setIsExpanded(true),
    onSwipedDown: () => setIsExpanded(false)
  });

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < pages.length) {
      setActivePageIndex(index);
      navigate(pages[index].path);
      
      // Show confirmation toast
      toast.success(`Navigating to ${pages[index].title}`);
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

  // 3D Carousel setup
  const isScreenSizeSm = window.innerWidth <= 640;
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = pages.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(activePageIndex * (360 / faceCount));
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  // Update rotation when page changes
  useEffect(() => {
    rotation.set(activePageIndex * (360 / faceCount));
    controls.start({
      rotateY: activePageIndex * (360 / faceCount),
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    });
  }, [activePageIndex, controls, faceCount, rotation]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-40 pointer-events-auto",
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
        {/* Header with drag indicator */}
        <div 
          className="py-2 px-4 flex justify-center cursor-grab active:cursor-grabbing"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-12 h-1 rounded-full bg-gray-400/30" />
        </div>
        
        {/* Current page info */}
        <div className="px-6 py-2">
          <h2 className="text-lg font-medium">
            {pages[activePageIndex].icon} {pages[activePageIndex].title}
          </h2>
          {isExpanded && (
            <p className="text-sm opacity-70">
              {pages[activePageIndex].description}
            </p>
          )}
        </div>
        
        {/* Carousel */}
        <div className="relative overflow-hidden" style={{ height: isExpanded ? "calc(85vh - 200px)" : "0px" }}>
          {isExpanded && (
            <div className="relative h-full" ref={carouselRef}>
              <div 
                className="flex h-full items-center justify-center"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="relative flex h-full origin-center justify-center"
                  style={{
                    transform,
                    rotateY: rotation,
                    width: cylinderWidth,
                    transformStyle: "preserve-3d",
                  }}
                  animate={controls}
                >
                  {pages.map((page, i) => (
                    <motion.div
                      key={`page-${page.path}`}
                      className={cn(
                        "absolute flex h-full origin-center items-center justify-center rounded-xl p-2",
                        "backdrop-blur-md border border-white/10"
                      )}
                      style={{
                        width: `${faceWidth}px`,
                        transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                      }}
                      onClick={() => handlePageChange(i)}
                    >
                      <motion.div
                        className={cn(
                          "w-full h-full rounded-lg flex flex-col items-center justify-center text-white",
                          "bg-gradient-to-br", page.color
                        )}
                      >
                        <span className="text-4xl mb-4">{page.icon}</span>
                        <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                        <p className="text-sm text-center max-w-xs px-4">
                          {page.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between items-center px-6 py-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={cn(
              "p-2 rounded-full", 
              isDarkMode ? "bg-white/10" : "bg-black/10",
              "transition-all duration-300"
            )}
            onClick={handlePreviousPage}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          
          <div className="flex space-x-1">
            {pages.map((page, i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === activePageIndex 
                    ? isDarkMode ? "bg-white" : "bg-black" 
                    : isDarkMode ? "bg-white/30" : "bg-black/30"
                )}
                animate={{
                  scale: i === activePageIndex ? 1.2 : 1
                }}
              />
            ))}
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={cn(
              "p-2 rounded-full", 
              isDarkMode ? "bg-white/10" : "bg-black/10",
              "transition-all duration-300"
            )}
            onClick={handleNextPage}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
        
        {/* Swipe up indicator */}
        {!isExpanded && (
          <motion.div 
            className="absolute top-1 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 1.5 
            }}
          >
            <ChevronUp className="h-4 w-4" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PageCarousel;
