
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeNames = 'dark' | 'light' | 'blue' | 'purple' | 'green';

interface ThemeContextType {
  currentTheme: ThemeNames;
  setTheme: (theme: ThemeNames) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'dark',
  setTheme: () => {},
  isDarkMode: true,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeNames>('dark');
  
  // Determine if the current theme is considered "dark mode"
  const isDarkMode = currentTheme === 'dark' || currentTheme === 'blue' || currentTheme === 'purple';

  const setTheme = (theme: ThemeNames) => {
    setCurrentTheme(theme);
    localStorage.setItem('atlas-theme', theme);
  };
  
  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('atlas-theme') as ThemeNames | null;
    if (savedTheme && ['dark', 'light', 'blue', 'purple', 'green'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
