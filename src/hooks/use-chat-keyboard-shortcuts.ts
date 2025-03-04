
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export function useChatKeyboardShortcuts() {
  const [showHeroParallax, setShowHeroParallax] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' && e.ctrlKey) {
        setShowHeroParallax(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleHeroParallax = (value: boolean) => {
    setShowHeroParallax(value);
    toast({
      title: "Parallax Effect",
      description: value ? "Hero parallax effect activated" : "Hero parallax effect deactivated",
    });
  };

  return {
    showHeroParallax,
    setShowHeroParallax,
    toggleHeroParallax
  };
}
