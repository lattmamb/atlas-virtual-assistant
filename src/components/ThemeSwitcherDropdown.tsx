
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
import { Palette, Moon, Sun, Monitor, Cloud, Sparkles, Leaf, Flame, Heart, Apple } from 'lucide-react';

interface ThemeSwitcherDropdownProps {
  className?: string;
}

const ThemeSwitcherDropdown: React.FC<ThemeSwitcherDropdownProps> = ({ className }) => {
  const { currentTheme, setTheme, isDarkMode, getAllThemes } = useTheme();
  
  const allThemes = getAllThemes();
  
  const getIconForTheme = (name: string) => {
    switch (name) {
      case 'system': return <Monitor className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      case 'light': return <Sun className="h-4 w-4" />;
      case 'blue': return <Cloud className="h-4 w-4" />;
      case 'purple': return <Sparkles className="h-4 w-4" />;
      case 'green': return <Leaf className="h-4 w-4" />;
      case 'orange': return <Flame className="h-4 w-4" />;
      case 'red': return <Heart className="h-4 w-4" />;
      case 'ios18': return <Apple className="h-4 w-4" />;
      default: return <Palette className="h-4 w-4" />;
    }
  };

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
      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="mb-2 px-2 py-1.5 text-xs font-medium text-muted-foreground">
          Choose theme
        </div>
        {allThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            className={cn(
              "flex items-center gap-2 px-2 py-2 cursor-pointer rounded-lg transition-colors",
              theme.name === currentTheme 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-accent"
            )}
            onClick={() => setTheme(theme.name)}
          >
            <div 
              className="w-5 h-5 rounded-full border flex items-center justify-center"
              style={{ 
                backgroundColor: theme.color,
                borderColor: theme.name === currentTheme 
                  ? 'var(--accent-color)' 
                  : 'rgba(255,255,255,0.1)'
              }}
            >
              {theme.name === currentTheme && (
                <div className="w-2.5 h-2.5 rounded-full bg-white/80"></div>
              )}
            </div>
            <span className="flex-1">{theme.label}</span>
            <span className="text-muted-foreground">
              {getIconForTheme(theme.name)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcherDropdown;
