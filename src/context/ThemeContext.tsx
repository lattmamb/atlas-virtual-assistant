
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sun, Moon, Laptop, Palette, Waves, Sparkles, Leaf, Flame, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Expand theme options
type ThemeNames = 'dark' | 'light' | 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'system';

interface ThemeContextType {
  currentTheme: ThemeNames;
  setTheme: (theme: ThemeNames) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  getAllThemes: () => { name: ThemeNames; label: string; color: string; icon: React.ReactNode }[];
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'dark',
  setTheme: () => {},
  isDarkMode: true,
  toggleTheme: () => {},
  getAllThemes: () => []
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeNames>('dark');
  const [systemIsDark, setSystemIsDark] = useState(false);
  
  // Define all available themes with icons
  const allThemes = [
    { name: 'system' as ThemeNames, label: 'System Default', color: '#888888', icon: <Laptop className="w-4 h-4" /> },
    { name: 'dark' as ThemeNames, label: 'Dark', color: '#1a1a1a', icon: <Moon className="w-4 h-4" /> },
    { name: 'light' as ThemeNames, label: 'Light', color: '#f5f5f7', icon: <Sun className="w-4 h-4" /> },
    { name: 'blue' as ThemeNames, label: 'Ocean', color: '#0c2d48', icon: <Waves className="w-4 h-4" /> },
    { name: 'purple' as ThemeNames, label: 'Twilight', color: '#2e1065', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'green' as ThemeNames, label: 'Forest', color: '#064e3b', icon: <Leaf className="w-4 h-4" /> },
    { name: 'orange' as ThemeNames, label: 'Sunset', color: '#7c2d12', icon: <Flame className="w-4 h-4" /> },
    { name: 'red' as ThemeNames, label: 'Ruby', color: '#7f1d1d', icon: <Heart className="w-4 h-4" /> }
  ];
  
  // Detect system color scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
      // If we're in system mode, let users know about the theme change
      if (currentTheme === 'system') {
        toast({
          title: `Theme Changed to ${e.matches ? 'Dark' : 'Light'}`,
          description: "Following your system preferences",
          duration: 2000,
        });
      }
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [currentTheme]);
  
  // Determine if the current theme is considered "dark mode"
  const isDarkMode = currentTheme === 'system' 
    ? systemIsDark 
    : (currentTheme === 'dark' || 
       currentTheme === 'blue' || 
       currentTheme === 'purple' || 
       currentTheme === 'green' ||
       currentTheme === 'orange' ||
       currentTheme === 'red');

  const setTheme = (theme: ThemeNames) => {
    const previousTheme = currentTheme;
    setCurrentTheme(theme);
    localStorage.setItem('atlas-theme', theme);
    
    // Apply theme to document for global CSS styling
    document.documentElement.classList.remove('theme-dark', 'theme-light', 'theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-red');
    document.documentElement.classList.add('theme-transition');
    
    if (theme === 'system') {
      document.documentElement.classList.add(systemIsDark ? 'theme-dark' : 'theme-light');
      toast({
        title: `Theme set to System`,
        description: `Using your ${systemIsDark ? 'Dark' : 'Light'} system preference`,
      });
    } else {
      document.documentElement.classList.add(`theme-${theme}`);
      toast({
        title: `Theme Changed`,
        description: `Theme set to ${allThemes.find(t => t.name === theme)?.label}`,
      });
    }
    
    // Apply a subtle flash effect on theme change
    const body = document.body;
    body.classList.add('theme-pulse');
    setTimeout(() => body.classList.remove('theme-pulse'), 1500);
  };
  
  const toggleTheme = () => {
    const themes = allThemes.map(t => t.name);
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };
  
  const getAllThemes = () => {
    return allThemes;
  };
  
  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('atlas-theme') as ThemeNames | null;
    if (savedTheme && allThemes.some(theme => theme.name === savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Default to system if no saved theme
      setTheme('system');
    }
  }, []);

  // Update theme when system preference changes
  useEffect(() => {
    if (currentTheme === 'system') {
      document.documentElement.classList.remove('theme-dark', 'theme-light');
      document.documentElement.classList.add(systemIsDark ? 'theme-dark' : 'theme-light');
    }
  }, [systemIsDark, currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      isDarkMode, 
      toggleTheme,
      getAllThemes
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
