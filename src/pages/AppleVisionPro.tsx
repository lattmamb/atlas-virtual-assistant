
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { ParallaxBackground } from '@/components/effects/ParallaxBackground';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GooeyText } from '@/components/ui/GooeyText';

const AppleVisionPro: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // Parallax effect values
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.05, 0.35], [0, -30]);
  const buttonOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);
  const buttonY = useTransform(scrollYProgress, [0.1, 0.4], [0, -20]);
  
  // Handle demo video playback
  const handlePlayDemo = () => {
    setIsVideoPlaying(true);
  };
  
  // Close video modal
  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
  };
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Immersive AR Background */}
      <ParallaxBackground />
      
      {/* Navigation Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 px-6 backdrop-blur-xl",
        "flex items-center justify-between",
        "border-b transition-colors duration-300",
        isDarkMode ? "border-white/10" : "border-black/10"
      )}>
        <div className="flex items-center">
          <motion.div 
            className="w-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg viewBox="0 0 14 17" className={cn(
              "w-full h-auto",
              isDarkMode ? "text-white" : "text-black"
            )}>
              <path
                fill="currentColor"
                d="M13.0729 5.6165C12.9799 5.6955 11.3542 6.626 11.3542 8.6919C11.3542 11.1055 13.4011 11.9422 13.4583 11.9649C13.4521 12.0314 13.0995 13.1609 12.3177 14.3043C11.6074 15.3047 10.8661 16.3051 9.7422 16.3051C8.6184 16.3051 8.3021 15.6326 7.0208 15.6326C5.7396 15.6326 5.3031 16.3051 4.2578 16.3051C3.2125 16.3051 2.4073 15.2443 1.6354 14.2439C0.742211 13.0379 0 11.106 0 9.2535C0 6.3926 1.9891 4.8952 3.9427 4.8952C5.0318 4.8952 5.9401 5.6281 6.625 5.6281C7.276 5.6281 8.2865 4.8498 9.5365 4.8498C9.9609 4.8498 11.6797 4.8952 13.0729 5.6165ZM9.1146 2.5981C9.6016 2.0156 9.9375 1.2053 9.9375 0.3951C9.9375 0.2848 9.9271 0.1745 9.9063 0.0852C9.0885 0.1155 8.112 0.6055 7.5208 1.2507C7.0781 1.7411 6.6719 2.5513 6.6719 3.3717C6.6719 3.4927 6.6927 3.6136 6.7031 3.6562C6.7552 3.6669 6.8385 3.6776 6.9219 3.6776C7.6563 3.6776 8.5938 3.2239 9.1146 2.5981Z"
              />
            </svg>
          </motion.div>
          
          <motion.nav 
            className="hidden md:flex ml-10 space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {['Explore', 'Features', 'Pricing', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  isDarkMode ? "text-white/80" : "text-black/80"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
              >
                {item}
              </motion.a>
            ))}
          </motion.nav>
        </div>
        
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Button
            variant="ghost"
            className={cn(
              "rounded-full",
              isDarkMode ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5"
            )}
            onClick={() => navigate("/")}
          >
            Sign In
          </Button>
          
          <Button
            className="rounded-full bg-primary hover:bg-primary/90"
          >
            Pre-Order
          </Button>
        </motion.div>
      </header>
      
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-32 overflow-hidden">
        <motion.div 
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.h1 
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight",
              isDarkMode 
                ? "text-gradient" 
                : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent"
            )}
            style={{ opacity: titleOpacity, y: titleY }}
          >
            <GooeyText text="Experience the Future of Augmented Reality" className="inline-block" />
          </motion.h1>
          
          <motion.p 
            className={cn(
              "text-lg md:text-xl mb-10",
              isDarkMode ? "text-white/80" : "text-black/80"
            )}
            style={{ opacity: subtitleOpacity, y: subtitleY }}
          >
            Introducing AppleVision Pro – Your Portal to a New Dimension.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ opacity: buttonOpacity, y: buttonY }}
          >
            <Button 
              size="lg" 
              className={cn(
                "rounded-full px-8 py-6 text-base font-medium",
                "bg-primary hover:bg-primary/90 text-white",
                "flex items-center gap-2 group"
              )}
            >
              Discover More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "rounded-full px-8 py-6 text-base font-medium",
                "border-primary/30 bg-transparent backdrop-blur-sm",
                isDarkMode ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5",
                "flex items-center gap-2"
              )}
              onClick={handlePlayDemo}
            >
              <Play className="w-4 h-4" /> Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 30 }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-4 right-4 z-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handleCloseVideo}
            >
              ✕
            </Button>
            <div className="w-full h-full">
              {/* This is a placeholder for video content */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <p className="text-white/80">AppleVision Pro Demo Video</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Subtle footer */}
      <footer className={cn(
        "fixed bottom-0 left-0 right-0 z-40 py-4 px-6",
        "backdrop-blur-md border-t",
        "flex items-center justify-between text-sm",
        isDarkMode ? "border-white/10 text-white/60" : "border-black/10 text-black/60"
      )}>
        <div>© {new Date().getFullYear()} Apple Inc. All rights reserved.</div>
        <div className="flex space-x-6">
          {['Privacy', 'Terms', 'Legal', 'Site Map'].map(item => (
            <a 
              key={item} 
              href="#" 
              className="hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default AppleVisionPro;
