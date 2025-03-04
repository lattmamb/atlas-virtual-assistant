
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Smartphone, Globe, Lock, Zap, Sparkles, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0,
  gradient = 'from-blue-500/20 to-purple-500/20'
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay?: number;
  gradient?: string;
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      className={cn(
        "rounded-2xl overflow-hidden p-6 h-full",
        "border backdrop-blur-lg",
        isDarkMode 
          ? "border-white/10 bg-black/20" 
          : "border-gray-200 bg-white/60",
        `bg-gradient-to-br ${gradient}`
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="mb-4 text-blue-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={cn(
        "mb-4",
        isDarkMode ? "text-gray-300" : "text-gray-600"
      )}>
        {description}
      </p>
      <Button 
        variant="ghost" 
        className="group p-0" 
        size="sm"
      >
        <span className="text-blue-500">Learn more</span>
        <ArrowRight className="ml-1 h-4 w-4 text-blue-500 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
};

const BlurredCircle = ({ 
  className,
  size = "300px",
  color = "rgba(59, 130, 246, 0.2)",
  blur = "80px"
}: {
  className?: string;
  size?: string;
  color?: string;
  blur?: string;
}) => {
  return (
    <div 
      className={cn("rounded-full absolute", className)}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur})`,
        zIndex: 0
      }}
    />
  );
};

const FeaturesSection = () => {
  const { isDarkMode } = useTheme();
  
  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Spatial Computing",
      description: "Experience your digital world in a completely immersive way with revolutionary spatial computing technology.",
      gradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Seamless Integration",
      description: "Connects flawlessly with your existing Apple devices and services for a unified digital experience.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Privacy & Security",
      description: "Advanced security features protect your information with industry-leading encryption and privacy controls.",
      gradient: "from-indigo-500/20 to-blue-500/20"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Immersive Performance",
      description: "Powered by Apple's most advanced chips for unparalleled graphics and computational performance.",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Revolutionary Display",
      description: "Ultra-high resolution micro-OLED displays deliver stunning visuals with incredible depth and clarity.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Infinite Canvas",
      description: "Transform any space into your workspace with virtually unlimited screen real estate and 3D capabilities.",
      gradient: "from-cyan-500/20 to-blue-500/20" 
    }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background blur elements */}
      <BlurredCircle 
        className="left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2" 
        color="rgba(79, 70, 229, 0.15)"
      />
      <BlurredCircle 
        className="right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2" 
        color="rgba(236, 72, 153, 0.15)"
      />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            isDarkMode ? "text-white" : "text-gray-900"
          )}>
            Unlock New Realities
          </h2>
          <p className={cn(
            "text-xl max-w-3xl mx-auto",
            isDarkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Apple Vision Pro redefines what's possible with groundbreaking features and capabilities that enhance how you work, play, and connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
