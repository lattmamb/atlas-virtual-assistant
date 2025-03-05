import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

type ThemeType = 'ios18' | 'atlas' | 'light' | string;

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'ios18',
  setTheme: () => {},
  isDarkMode: true,
  toggleDarkMode: () => {}
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { preferences, updatePreferences } = useUserPreferences();
  const [theme, setThemeState] = useState<ThemeType>(preferences.theme || 'ios18');
  
  // Update theme when preferences change
  useEffect(() => {
    if (preferences.theme) {
      setThemeState(preferences.theme);
    }
  }, [preferences.theme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    updatePreferences({ theme: newTheme });
  };

  const isDarkMode = theme !== 'light';

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'ios18';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isDarkMode, 
      toggleDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
