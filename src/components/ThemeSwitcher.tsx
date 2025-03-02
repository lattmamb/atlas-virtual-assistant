
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Palette, Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: 'dark', label: 'Dark', icon: Moon, color: '#111111' },
    { name: 'light', label: 'Light', icon: Sun, color: '#f5f5f7' },
    { name: 'blue', label: 'Ocean', icon: Palette, color: '#0c2d48' },
    { name: 'purple', label: 'Purple', icon: Palette, color: '#2e1065' },
    { name: 'green', label: 'Green', icon: Palette, color: '#064e3b' },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "rounded-full w-8 h-8 transition-transform hover:scale-110 active:scale-95",
            isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100"
          )}
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn(
        "min-w-[180px] p-2 rounded-xl",
        isDarkMode ? "bg-black/80 backdrop-blur-xl border border-white/10" : "bg-white/90 backdrop-blur-xl border border-gray-200"
      )}>
        {themes.map((theme) => {
          const ThemeIcon = theme.icon;
          return (
            <DropdownMenuItem
              key={theme.name}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer",
                isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
                currentTheme === theme.name && (isDarkMode ? "bg-white/10" : "bg-gray-100")
              )}
              onClick={() => {
                setTheme(theme.name as any);
                setIsOpen(false);
              }}
            >
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: theme.color }}
              >
                {currentTheme === theme.name && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className={isDarkMode ? "text-white" : "text-gray-800"}>
                {theme.label}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
