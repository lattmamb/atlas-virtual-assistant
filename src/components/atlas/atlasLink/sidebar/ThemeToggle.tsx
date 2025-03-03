
import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  celestialMode: boolean;
  toggleCelestialMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  celestialMode, 
  toggleCelestialMode 
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        onClick={toggleCelestialMode} 
        className="flex-1 flex items-center justify-center gap-2 rounded-lg border-gray-800 hover:bg-gray-900 text-sm"
      >
        {celestialMode ? <Sun size={16} /> : <Moon size={16} />}
        {celestialMode ? "Normal" : "Celestial"}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={toggleTheme} 
        className="flex-1 flex items-center justify-center gap-2 rounded-lg border-gray-800 hover:bg-gray-900 text-sm"
      >
        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        {isDarkMode ? "Light" : "Dark"}
      </Button>
    </div>
  );
};

export default ThemeToggle;
