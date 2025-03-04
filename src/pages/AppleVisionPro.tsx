
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, Terminal, Sparkles, Compass, Globe2, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

import ARBackground from '@/components/applevision/ARBackground';
import ARFloatingElements from '@/components/applevision/ARFloatingElements';
import ARHeader from '@/components/applevision/ARHeader';
import ARFooter from '@/components/applevision/ARFooter';
import VideoLoop from '@/components/applevision/VideoLoop';
import FeatureCard from '@/components/applevision/FeatureCard';
import VisionProSpecs from '@/components/applevision/VisionProSpecs';
import { LampEffect } from '@/components/ui/LampEffect';
import { UniverseComponentProps } from '@/lib/types';

const AppleVisionPro: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={cn(
      "min-h-screen w-full overflow-x-hidden",
      isDarkMode ? "text-white" : "text-black"
    )}>
      <ARBackground scrollY={scrollY} />
      <ARFloatingElements scrollY={scrollY} />
      <ARHeader scrollY={scrollY} />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-24">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <span className={cn(
                "inline-block text-sm font-medium tracking-wider px-3 py-1 rounded-full mb-6",
                isDarkMode 
                  ? "bg-white/10 text-white backdrop-blur-sm"
                  : "bg-black/5 text-gray-800 backdrop-blur-sm"
              )}>
                INTRODUCING APPLE VISION PRO
              </span>
            </motion.div>
            
            <LampEffect>
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Experience the Future of
                <br />
                <span className={cn(
                  "inline-block mt-2 bg-clip-text text-transparent bg-gradient-to-r",
                  isDarkMode 
                    ? "from-blue-400 via-indigo-400 to-purple-400"
                    : "from-blue-600 via-indigo-600 to-purple-600"
                )}>
                  Augmented Reality
                </span>
              </motion.h1>
            </LampEffect>
            
            <motion.p 
              className={cn(
                "mt-6 text-lg sm:text-xl max-w-3xl mx-auto",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Your Portal to a New Dimension. Seamlessly blend digital content with your physical space, 
              creating unlimited possibilities for work, play, and connection.
            </motion.p>
            
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.button
                className={cn(
                  "px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2",
                  "transition-all duration-300 group",
                  isDarkMode 
                    ? "bg-white text-black hover:bg-opacity-90" 
                    : "bg-black text-white hover:bg-opacity-80"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Discover More
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </div>
          
          <div className="w-full max-w-4xl mt-20">
            <VideoLoop />
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Unlock New Capabilities
              </motion.h2>
              <motion.p 
                className={cn(
                  "mt-4 text-lg max-w-3xl mx-auto",
                  isDarkMode ? "text-white/70" : "text-black/70"
                )}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Apple Vision Pro redefines what's possible with cutting-edge 
                features that transform how you work, play, and connect.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Sparkles className="w-6 h-6" />}
                title="Immersive Experiences"
                description="Step into fully immersive environments that blend seamlessly with your surroundings, creating new dimensions for entertainment and productivity."
                index={0}
              />
              <FeatureCard 
                icon={<Terminal className="w-6 h-6" />}
                title="Advanced Computing"
                description="Powered by Apple's most advanced technology, Vision Pro processes complex AR operations in real-time with unparalleled efficiency."
                index={1}
              />
              <FeatureCard 
                icon={<Headphones className="w-6 h-6" />}
                title="Spatial Audio"
                description="Experience sound like never before with revolutionary spatial audio that places sounds precisely in your environment."
                index={2}
              />
              <FeatureCard 
                icon={<Compass className="w-6 h-6" />}
                title="Intuitive Control"
                description="Navigate with natural gestures, eye movements, and voice commands for a truly intuitive computing experience."
                index={3}
              />
              <FeatureCard 
                icon={<Globe2 className="w-6 h-6" />}
                title="Universe Integration"
                description="Seamlessly connect with U-N-I-Verse to access all your digital content, communications, and tools in one immersive environment."
                index={4}
              />
              <FeatureCard 
                icon={<Sparkles className="w-6 h-6" />}
                title="Developer Platform"
                description="Create breakthrough AR experiences with powerful developer tools designed to unlock the full potential of spatial computing."
                index={5}
              />
            </div>
          </div>
        </section>
        
        {/* U-N-I-Verse Integration Section */}
        <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
          <div 
            className={cn(
              "absolute inset-0",
              isDarkMode 
                ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20" 
                : "bg-gradient-to-r from-blue-100 to-purple-100"
            )} 
          />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className={cn(
                  "inline-block text-sm font-medium tracking-wider px-3 py-1 rounded-full mb-4",
                  isDarkMode 
                    ? "bg-white/10 text-white backdrop-blur-sm"
                    : "bg-black/5 text-gray-800 backdrop-blur-sm"
                )}>
                  SEAMLESS INTEGRATION
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                U-N-I-Verse & Vision Pro
              </motion.h2>
              
              <motion.p 
                className={cn(
                  "mt-4 text-lg max-w-3xl mx-auto",
                  isDarkMode ? "text-white/70" : "text-black/70"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Experience U-N-I-Verse in a whole new dimension with Apple Vision Pro integration. 
                Access all your digital world in an immersive spatial environment.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-2xl font-bold mb-4">Your Digital World, Reimagined</h3>
                <p className={cn(
                  "mb-6",
                  isDarkMode ? "text-white/70" : "text-black/70"
                )}>
                  U-N-I-Verse transforms how you interact with your digital life. 
                  When paired with Vision Pro, it creates an unparalleled experience 
                  that puts you at the center of your connected world.
                </p>
                
                <div className="space-y-4">
                  <div className={cn(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-white/5" : "bg-black/5"
                  )}>
                    <h4 className="font-medium">Floating Widgets</h4>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-white/70" : "text-black/70"
                    )}>
                      Access Live Link-Ups, Mobility Status, and Atlas Vision Globe as floating panels in your AR space.
                    </p>
                  </div>
                  
                  <div className={cn(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-white/5" : "bg-black/5"
                  )}>
                    <h4 className="font-medium">Vision AI Assistant</h4>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-white/70" : "text-black/70"
                    )}>
                      Your intelligent assistant travels with you in AR, providing context-aware information and assistance.
                    </p>
                  </div>
                  
                  <div className={cn(
                    "p-4 rounded-lg",
                    isDarkMode ? "bg-white/5" : "bg-black/5"
                  )}>
                    <h4 className="font-medium">3D Interactive Objects</h4>
                    <p className={cn(
                      "text-sm",
                      isDarkMode ? "text-white/70" : "text-black/70"
                    )}>
                      Interact with virtual objects that represent your data, communications, and content.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className={cn(
                  "rounded-xl overflow-hidden relative",
                  "aspect-[4/3]",
                  "border",
                  isDarkMode ? "border-white/10" : "border-black/10"
                )}>
                  <img 
                    src="/lovable-uploads/c9ad08ff-68c3-4635-af88-f133d638efc9.png" 
                    alt="U-N-I-Verse Integration" 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-t from-black/50 to-transparent"
                  )}>
                    {/* Overlay for floating U-N-I-Verse elements */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className={cn(
                        "p-3 rounded-lg backdrop-blur-md mb-3",
                        "border border-white/20",
                        "bg-black/30"
                      )}>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-white">Vision AI Assistant</h4>
                            <p className="text-xs text-white/70">How may I help you today?</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 overflow-x-auto pb-2">
                        <div className={cn(
                          "flex-shrink-0 p-3 rounded-lg backdrop-blur-md",
                          "border border-white/20",
                          "bg-black/30",
                          "w-40"
                        )}>
                          <h4 className="text-xs font-medium text-white">Live Link-Ups</h4>
                          <p className="text-xs text-white/70 mt-1">3 active connections</p>
                        </div>
                        
                        <div className={cn(
                          "flex-shrink-0 p-3 rounded-lg backdrop-blur-md",
                          "border border-white/20",
                          "bg-black/30",
                          "w-40"
                        )}>
                          <h4 className="text-xs font-medium text-white">Mobility Status</h4>
                          <p className="text-xs text-white/70 mt-1">Vehicle charged: 82%</p>
                        </div>
                        
                        <div className={cn(
                          "flex-shrink-0 p-3 rounded-lg backdrop-blur-md",
                          "border border-white/20",
                          "bg-black/30",
                          "w-40"
                        )}>
                          <h4 className="text-xs font-medium text-white">Atlas Globe</h4>
                          <p className="text-xs text-white/70 mt-1">12 active connections</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Technical Specifications */}
        <section id="specs" className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Technical Specifications
              </motion.h2>
              <motion.p 
                className={cn(
                  "mt-4 text-lg max-w-3xl mx-auto",
                  isDarkMode ? "text-white/70" : "text-black/70"
                )}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Engineered with Apple's most advanced technology for an unparalleled spatial computing experience.
              </motion.p>
            </div>
            
            <VisionProSpecs />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 relative">
          <div 
            className={cn(
              "absolute inset-0",
              isDarkMode 
                ? "bg-gradient-to-b from-transparent to-black/50" 
                : "bg-gradient-to-b from-transparent to-white/50"
            )} 
          />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Step Into the Future?
            </motion.h2>
            
            <motion.p 
              className={cn(
                "text-lg mb-10 max-w-2xl mx-auto",
                isDarkMode ? "text-white/80" : "text-black/80"
              )}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join the waitlist to be among the first to experience the revolutionary Apple Vision Pro
              with full U-N-I-Verse integration.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.button
                className={cn(
                  "px-8 py-3 rounded-full text-lg font-medium",
                  isDarkMode 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "bg-black text-white hover:bg-black/90",
                  "transition-colors"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Pre-Order Now
              </motion.button>
              
              <motion.button
                className={cn(
                  "px-8 py-3 rounded-full text-lg font-medium",
                  "border",
                  isDarkMode 
                    ? "border-white text-white hover:bg-white/10" 
                    : "border-black text-black hover:bg-black/10",
                  "transition-colors"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <ARFooter />
    </div>
  );
};

export default AppleVisionPro;
