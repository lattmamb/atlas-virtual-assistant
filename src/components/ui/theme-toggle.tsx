
import * as React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Laptop } from "lucide-react";

interface ThemeToggleProps {
  iconOnly?: boolean;
  className?: string;
}

export function ThemeToggle({ iconOnly = false, className }: ThemeToggleProps) {
  const { currentTheme, isDarkMode, setTheme, getAllThemes } = useTheme();
  
  const themes = getAllThemes();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={cn(
            "gap-2 px-2 w-9 h-9 rounded-full",
            className
          )}
        >
          <motion.div
            key={currentTheme}
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {currentTheme === 'system' ? 
              (isDarkMode ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />) :
              themes.find(t => t.name === currentTheme)?.icon || <Moon className="h-[1.2rem] w-[1.2rem]" />
            }
          </motion.div>
          {!iconOnly && (
            <span className="hidden sm:inline-block text-sm font-medium">
              {themes.find(t => t.name === currentTheme)?.label || 'Theme'}
            </span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px] p-2">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => setTheme(theme.name)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 cursor-pointer",
              currentTheme === theme.name && "bg-accent"
            )}
          >
            <div className="flex items-center justify-center w-5 h-5">
              {theme.icon}
            </div>
            <span>{theme.label}</span>
            
            {currentTheme === theme.name && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto w-2 h-2 rounded-full bg-primary"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
