
"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { Search, Maximize, Minimize } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"
import { useNavigate } from "react-router-dom"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

interface PageInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  color: string;
  imageUrl?: string;
}

interface ThreeDCarouselProps {
  pages?: PageInfo[];
  fullWidth?: boolean;
}

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
    fullWidth = false,
  }: {
    handleClick: (card: PageInfo, index: number) => void
    controls: any
    cards: PageInfo[]
    isCarouselActive: boolean
    fullWidth?: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 900 : fullWidth ? 2200 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )
    const { isDarkMode } = useTheme()

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`key-${card.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card, i)}
            >
              <motion.div
                className={cn(
                  "w-full h-full rounded-xl overflow-hidden flex flex-col items-center justify-center",
                  "bg-gradient-to-br", card.color,
                  "border", isDarkMode ? "border-white/10" : "border-black/10",
                  "shadow-lg"
                )}
                layoutId={`card-${card.id}`}
              >
                <span className="text-5xl mb-4">{card.icon}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm px-4 text-center">
                  {card.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

export function ThreeDPageCarousel({ pages, fullWidth = false }: ThreeDCarouselProps) {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const [activeCard, setActiveCard] = useState<PageInfo | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const controls = useAnimation()
  
  const defaultPages: PageInfo[] = [
    { 
      id: "home", 
      title: "Home", 
      description: "Your Atlas Universe Hub",
      color: "from-blue-500 to-purple-600",
      icon: "🏠",
      path: "/"
    },
    { 
      id: "universe", 
      title: "U-N-I-Verse", 
      description: "Explore the unified space",
      color: "from-violet-500 to-indigo-600",
      icon: "🌌",
      path: "/universe"
    },
    { 
      id: "vision", 
      title: "Vision Pro", 
      description: "Experience Apple Vision Pro",
      color: "from-gray-700 to-gray-900",
      icon: "👁️",
      path: "/applevisionpro"
    },
    { 
      id: "chat", 
      title: "Chat Room", 
      description: "Talk to Atlas AI assistant",
      color: "from-green-500 to-teal-600",
      icon: "💬",
      path: "/chatroom"
    },
    { 
      id: "atlas", 
      title: "Atlas Link", 
      description: "Connect with Trinity Dodge",
      color: "from-amber-500 to-orange-600",
      icon: "🔗",
      path: "/atlaslink"
    },
    { 
      id: "settings", 
      title: "Settings", 
      description: "Configure your experience",
      color: "from-slate-500 to-slate-700",
      icon: "⚙️",
      path: "/settings"
    }
  ]
  
  const carouselPages = pages || defaultPages

  const filteredPages = searchText 
    ? carouselPages.filter(page => 
        page.title.toLowerCase().includes(searchText.toLowerCase()) ||
        page.description.toLowerCase().includes(searchText.toLowerCase())
      )
    : carouselPages

  const handleCardClick = (card: PageInfo, index: number) => {
    setActiveCard(card)
    setIsCarouselActive(false)
    controls.stop()
    
    // Navigate to the page after a brief delay to show the transition
    setTimeout(() => {
      navigate(card.path)
      
      // Reset the active card after navigation
      setTimeout(() => {
        setActiveCard(null)
        setIsCarouselActive(true)
      }, 500)
    }, 800)
  }

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
  }

  return (
    <motion.div 
      layout 
      className={cn(
        "relative w-full",
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "z-10"
      )}
    >
      {/* Search and controls header */}
      <div className={cn(
        "flex items-center justify-between p-4",
        isDarkMode ? "bg-black/30 text-white" : "bg-white/30 text-black",
        "backdrop-blur-md border-b",
        isDarkMode ? "border-white/10" : "border-black/10"
      )}>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-60" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-full",
              isDarkMode 
                ? "bg-white/10 text-white border-white/10" 
                : "bg-black/5 text-black border-black/10",
              "border outline-none focus:ring-2",
              "focus:ring-blue-500/50"
            )}
          />
        </div>
        
        <button 
          onClick={toggleFullscreen}
          className={cn(
            "ml-4 p-2 rounded-full",
            isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20",
            "transition-colors"
          )}
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Card gallery */}
      <AnimatePresence mode="sync">
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
            onClick={() => {
              setActiveCard(null);
              setIsCarouselActive(true);
            }}
          >
            <motion.div
              layoutId={`card-${activeCard.id}`}
              className={cn(
                "w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden",
                "bg-gradient-to-br", activeCard.color
              )}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <span className="text-6xl mb-6">{activeCard.icon}</span>
                <h2 className="text-2xl text-white font-bold mb-2">{activeCard.title}</h2>
                <p className="text-white/80 text-center">
                  {activeCard.description}
                </p>
                <p className="text-white/60 text-sm mt-6">
                  Loading page...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={cn(
        "relative w-full overflow-hidden",
        isFullscreen ? "h-[calc(100vh-64px)]" : "h-[500px]"
      )}>
        <Carousel
          handleClick={handleCardClick}
          controls={controls}
          cards={filteredPages}
          isCarouselActive={isCarouselActive}
          fullWidth={isFullscreen}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel };
