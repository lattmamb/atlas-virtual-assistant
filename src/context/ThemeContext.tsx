
import React, { createContext, useContext, useState, useEffect } from 'react';

// Expand theme options
type ThemeNames = 'dark' | 'light' | 'blue' | 'purple' | 'green' | 'orange' | 'red';

interface ThemeContextType {
  currentTheme: ThemeNames;
  setTheme: (theme: ThemeNames) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  getAllThemes: () => { name: ThemeNames; label: string; color: string }[];
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
  
  // Define all available themes
  const allThemes = [
    { name: 'dark' as ThemeNames, label: 'Dark', color: '#1a1a1a' },
    { name: 'light' as ThemeNames, label: 'Light', color: '#f5f5f7' },
    { name: 'blue' as ThemeNames, label: 'Ocean', color: '#0c2d48' },
    { name: 'purple' as ThemeNames, label: 'Twilight', color: '#2e1065' },
    { name: 'green' as ThemeNames, label: 'Forest', color: '#064e3b' },
    { name: 'orange' as ThemeNames, label: 'Sunset', color: '#7c2d12' },
    { name: 'red' as ThemeNames, label: 'Ruby', color: '#7f1d1d' }
  ];
  
  // Determine if the current theme is considered "dark mode"
  const isDarkMode = currentTheme === 'dark' || 
                     currentTheme === 'blue' || 
                     currentTheme === 'purple' || 
                     currentTheme === 'green' ||
                     currentTheme === 'orange' ||
                     currentTheme === 'red';

  const setTheme = (theme: ThemeNames) => {
    setCurrentTheme(theme);
    localStorage.setItem('atlas-theme', theme);
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
      setCurrentTheme(savedTheme);
    }
  }, []);

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
