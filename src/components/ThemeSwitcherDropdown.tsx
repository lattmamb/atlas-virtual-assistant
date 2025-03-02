
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

interface ThemeSwitcherDropdownProps {
  className?: string;
}

const ThemeSwitcherDropdown: React.FC<ThemeSwitcherDropdownProps> = ({ className }) => {
  const { currentTheme, setTheme, isDarkMode, getAllThemes } = useTheme();
  
  const allThemes = getAllThemes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full transition-transform hover:scale-110 active:scale-95",
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
            className
          )}
        >
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {allThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            className="flex items-center gap-2 px-2 py-2 cursor-pointer"
            onClick={() => setTheme(theme.name)}
          >
            <div 
              className="w-5 h-5 rounded-full border"
              style={{ 
                backgroundColor: theme.color,
                borderColor: theme.name === currentTheme 
                  ? 'var(--accent-color)' 
                  : 'rgba(255,255,255,0.1)'
              }}
            />
            <span>{theme.label}</span>
            {theme.name === currentTheme && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcherDropdown;
