
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import themeDefaults from '@/config/themeDefaults.json';

type ThemeType = 'ios18' | 'atlas' | 'light' | string;

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  // Added properties to match the components' expectations
  currentTheme: ThemeType;
  toggleTheme: () => void;
  getAllThemes: () => ThemeOption[];
}

interface ThemeOption {
  name: string;
  label: string;
  color: string;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'ios18',
  setTheme: () => {},
  isDarkMode: true,
  toggleDarkMode: () => {},
  currentTheme: 'ios18',
  toggleTheme: () => {},
  getAllThemes: () => [],
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

  // Alias for toggleDarkMode to match component expectations
  const toggleTheme = toggleDarkMode;

  // Function to get all available themes
  const getAllThemes = (): ThemeOption[] => {
    return themeDefaults.themes.map(theme => ({
      name: theme.id,
      label: theme.name,
      color: theme.colors.primary
    }));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isDarkMode, 
      toggleDarkMode,
      // Added properties to match component expectations
      currentTheme: theme,
      toggleTheme,
      getAllThemes
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
