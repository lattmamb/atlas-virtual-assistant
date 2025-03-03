
import React, { useState } from 'react';
import AtlasLink from '@/components/atlas/AtlasLink';
import ChatRoom from '@/pages/ChatRoom';
import Workflows from '@/pages/Workflows';
import Settings from '@/pages/Settings';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  ShieldIcon, 
  MessageSquareIcon, 
  WorkflowIcon, 
  SettingsIcon 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import EnhancedWidget from '@/components/widgets/EnhancedWidget';

export default function Index() {
  const [activeSection, setActiveSection] = useState<string>('atlas');
  const { isDarkMode } = useTheme();
  
  const sections = [
    { id: 'atlas', title: 'Atlas Link', icon: <ShieldIcon className="h-5 w-5" />, component: <AtlasLink /> },
    { id: 'chat', title: 'Chat Room', icon: <MessageSquareIcon className="h-5 w-5" />, component: <ChatRoom /> },
    { id: 'workflows', title: 'Workflows', icon: <WorkflowIcon className="h-5 w-5" />, component: <Workflows /> },
    { id: 'settings', title: 'Settings', icon: <SettingsIcon className="h-5 w-5" />, component: <Settings /> }
  ];
  
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleScrollToNext = (currentIndex: number) => {
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1].id;
      setActiveSection(nextSection);
      const element = document.getElementById(nextSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  const handleScrollToPrevious = (currentIndex: number) => {
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1].id;
      setActiveSection(prevSection);
      const element = document.getElementById(prevSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Navigation Bar */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center p-2",
        "bg-gradient-to-b",
        isDarkMode 
          ? "from-black to-transparent" 
          : "from-white to-transparent"
      )}>
        <div className={cn(
          "flex space-x-2 p-2 rounded-full",
          isDarkMode 
            ? "bg-gray-900/80 backdrop-blur-md" 
            : "bg-white/80 backdrop-blur-md shadow-md"
        )}>
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigate(section.id)}
              className={cn(
                "flex items-center gap-1 rounded-full",
                activeSection === section.id && "bg-primary text-primary-foreground"
              )}
            >
              {section.icon}
              <span className="hidden sm:inline">{section.title}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="flex flex-col w-full pt-16">
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="min-h-screen w-full relative flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Section Navigation Controls */}
            <div className="absolute top-4 right-4 z-30 flex flex-col space-y-2">
              {index > 0 && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleScrollToPrevious(index)}
                  className="rounded-full bg-background/50 backdrop-blur-sm"
                >
                  <ArrowUpIcon className="h-4 w-4" />
                </Button>
              )}
              {index < sections.length - 1 && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleScrollToNext(index)}
                  className="rounded-full bg-background/50 backdrop-blur-sm"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Section Content */}
            <EnhancedWidget 
              style={section.id === 'atlas' ? 'hybrid' : 'glass'}
              hoverEffect="none"
              className="flex-1 m-4 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full"
                >
                  {section.component}
                </motion.div>
              </AnimatePresence>
            </EnhancedWidget>
            
            {/* Section Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {sections.map((s, i) => (
                <div 
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeSection === s.id 
                      ? "bg-primary w-4" 
                      : isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  )}
                  onClick={() => handleNavigate(s.id)}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
