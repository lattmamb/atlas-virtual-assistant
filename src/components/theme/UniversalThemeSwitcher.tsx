
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Palette, Check, ChevronDown, SunMoon, MoveDown } from 'lucide-react';
import { toast } from 'sonner';

interface ThemeOption {
  name: string;
  label: string;
  color: string;
  description: string;
}

const UniversalThemeSwitcher: React.FC<{
  position?: 'top-right' | 'bottom-right' | 'floating';
  variant?: 'minimal' | 'full';
  className?: string;
}> = ({ 
  position = 'top-right', 
  variant = 'full',
  className
}) => {
  const { currentTheme, setTheme, getAllThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  
  const allThemes = getAllThemes().map(theme => ({
    ...theme,
    description: getThemeDescription(theme.name)
  }));
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  
  function getThemeDescription(themeName: string): string {
    switch(themeName) {
      case 'ios18': return 'iOS 18 Dark - sleek, elegant aesthetics with deep blacks';
      case 'dark': return 'Classic Dark - minimalist dark interface';
      case 'light': return 'Light Mode - bright and clean';
      case 'blue': return 'Ocean Theme - deep blues inspired by the sea';
      case 'purple': return 'Twilight - rich purple tones for focus';
      case 'green': return 'Forest - natural green hues';
      case 'orange': return 'Sunset - warm orange tones';
      case 'red': return 'Ruby - bold and vibrant reds';
      case 'system': return 'Follows your system preferences';
      default: return 'Custom theme';
    }
  }
  
  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'floating': 'fixed bottom-20 right-4 z-50'
  };
  
  const handleThemeChange = (themeName: string) => {
    setTheme(themeName as any);
    toast.success(`Theme changed to ${allThemes.find(t => t.name === themeName)?.label || themeName}`, {
      duration: 2000,
      position: 'bottom-center'
    });
    setIsOpen(false);
  };
  
  return (
    <div 
      className={cn(positionClasses[position], className)}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div 
        className="relative"
        whileTap={{ scale: 0.97 }}
      >
        {/* Theme Selector Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-full shadow-lg flex items-center gap-2 transition-all duration-300",
            variant === 'minimal' ? 'w-10 h-10 p-0' : 'px-4 py-2',
            isOpen ? 'bg-primary text-primary-foreground' : 'bg-background border border-border'
          )}
        >
          {variant === 'minimal' ? (
            <Palette className="h-5 w-5" />
          ) : (
            <>
              <SunMoon className="h-4 w-4" />
              <span className="font-medium">Theme</span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen ? "rotate-180" : "rotate-0"
              )} />
            </>
          )}
        </Button>
        
        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
              className={cn(
                "absolute right-0 mt-2 w-64 p-2 rounded-xl shadow-xl border border-border backdrop-blur-xl",
                "bg-background/90 z-50 overflow-hidden"
              )}
            >
              <div className="py-1 px-2 text-sm font-medium text-muted-foreground mb-1">
                Select Theme
              </div>
              <div className="max-h-[70vh] overflow-y-auto pr-1">
                {allThemes.map((theme) => (
                  <motion.div
                    key={theme.name}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all",
                      hoveredTheme === theme.name ? "bg-accent/40" : "hover:bg-accent/20",
                      theme.name === currentTheme ? "bg-primary/10" : ""
                    )}
                    onClick={() => handleThemeChange(theme.name)}
                    onMouseEnter={() => setHoveredTheme(theme.name)}
                    onMouseLeave={() => setHoveredTheme(null)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-full border flex items-center justify-center"
                        style={{
                          backgroundColor: theme.color,
                          borderColor: theme.name === currentTheme ? 'var(--accent-color)' : 'transparent',
                          boxShadow: theme.name === currentTheme ? '0 0 0 2px var(--accent-color)' : 'none'
                        }}
                      >
                        {theme.name === currentTheme && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{theme.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{theme.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UniversalThemeSwitcher;
