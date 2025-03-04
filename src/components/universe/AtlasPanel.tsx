
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Sparkles, Globe, Users, Activity, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const AtlasPanel: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          className="mb-4 inline-block p-3 rounded-full bg-blue-500/20 text-blue-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Sparkles className="h-8 w-8" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Atlas Intelligence
        </h1>
        <p className="text-lg max-w-3xl opacity-80">
          Harness the power of Vision AI to transform your experience with intelligent automation and immersive computing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {atlasFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <Card className={cn(
              "h-full overflow-hidden backdrop-blur-lg",
              isDarkMode 
                ? "bg-white/5 border-white/10" 
                : "bg-white/60 border-gray-200/50"
            )}>
              <CardHeader>
                <div className="text-blue-400 mb-2">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-white/70" : "text-gray-600"
                )}>
                  {feature.content}
                </p>
              </CardContent>
              <CardFooter>
                <div className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  "bg-blue-500/20 text-blue-400"
                )}>
                  {feature.tag}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const atlasFeatures = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Intelligence",
    description: "Connect with worldwide data and insights",
    content: "Access real-time information from around the globe, empowering you with knowledge and actionable intelligence.",
    tag: "Real-time"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Social Connectivity",
    description: "Seamless social integration",
    content: "Connect with friends, colleagues, and communities in an immersive, intuitive way that transcends traditional social media.",
    tag: "Interactive"
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Adaptive Learning",
    description: "Evolves with your preferences",
    content: "Advanced AI that learns from your interactions, continuously improving and adapting to provide personalized experiences.",
    tag: "AI-powered"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Enhanced Performance",
    description: "Unparalleled computational power",
    content: "Leverage cutting-edge processing capabilities for complex tasks, creative endeavors, and immersive experiences.",
    tag: "High-performance"
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Creative Augmentation",
    description: "Amplify your creative potential",
    content: "Generate ideas, content, and designs with AI assistance that enhances rather than replaces your creative process.",
    tag: "Creativity"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Spatial Computing",
    description: "Redefine your digital space",
    content: "Transform any environment into a personalized workspace with virtually unlimited screen real estate and 3D capabilities.",
    tag: "Immersive"
  }
];

export default AtlasPanel;
