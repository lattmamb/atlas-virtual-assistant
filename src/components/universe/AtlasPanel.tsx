
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { Shield, Sparkles, Globe, Cpu, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UniverseComponentProps } from '@/lib/types';

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      className={cn(
        "p-6 rounded-xl relative overflow-hidden h-full",
        "backdrop-blur-sm border",
        isDarkMode 
          ? "bg-white/5 border-white/10" 
          : "bg-black/5 border-black/10",
        "group"
      )}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
      )} />
      
      <div className="relative">
        <div className={cn(
          "mb-4 p-3 rounded-lg inline-flex",
          isDarkMode ? "bg-white/10" : "bg-black/5"
        )}>
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        
        <p className={cn(
          "text-sm",
          isDarkMode ? "text-white/70" : "text-black/70"
        )}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const AtlasPanel: React.FC<UniverseComponentProps> = ({ scrollY }) => {
  const { isDarkMode } = useTheme();
  
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: "Advanced Security",
      description: "Enterprise-grade protection for all your data and communications, powered by state-of-the-art encryption."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      title: "AI Assistant",
      description: "Contextual AI assistant that learns your preferences and helps you work more efficiently."
    },
    {
      icon: <Globe className="h-6 w-6 text-green-500" />,
      title: "Global Connectivity",
      description: "Stay connected anywhere with seamless integration across all your devices and platforms."
    },
    {
      icon: <Cpu className="h-6 w-6 text-red-500" />,
      title: "Powerful Automation",
      description: "Create custom workflows and automations that save time and reduce repetitive tasks."
    },
    {
      icon: <Users className="h-6 w-6 text-amber-500" />,
      title: "Team Collaboration",
      description: "Collaborate in real-time with your team through integrated messaging and file sharing."
    }
  ];
  
  return (
    <div className="w-full py-8 px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-block mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={cn(
            "p-3 rounded-full",
            isDarkMode ? "bg-white/10" : "bg-black/5"
          )}>
            <Shield className="h-10 w-10 text-blue-500" />
          </div>
        </motion.div>
        
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Atlas{" "}
          <span className={cn(
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-blue-500 to-purple-500"
          )}>
            Intelligent Assistant
          </span>
        </motion.h1>
        
        <motion.p
          className={cn(
            "max-w-3xl mx-auto text-lg",
            isDarkMode ? "text-white/70" : "text-black/70"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Your personal AI companion for the modern digital world. Atlas brings intelligence, security, and seamless integration to every aspect of your digital life.
        </motion.p>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <FeatureCard 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button
          className={cn(
            "px-6 py-6 rounded-full text-white font-medium",
            "bg-gradient-to-r from-blue-500 to-purple-500",
            "border border-white/10",
            "shadow-lg hover:shadow-xl hover:shadow-blue-500/20",
            "transition-all duration-300 transform hover:-translate-y-1"
          )}
          size="lg"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Get Started with Atlas
        </Button>
      </motion.div>
    </div>
  );
};

export default AtlasPanel;
