
import { useEffect } from 'react';
import { Message } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface MessageEffectsProps {
  messages: Message[];
  toggleHeroParallax: (value: boolean) => void;
  setAIMode: (mode: 'atlas' | 'grok') => void;
}

export function useMessageEffects({ 
  messages, 
  toggleHeroParallax, 
  setAIMode 
}: MessageEffectsProps) {
  const { toast } = useToast();

  // Toggle theme on specific message patterns
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        if (lastMessage.content.toLowerCase().includes('dark mode') || 
            lastMessage.content.toLowerCase().includes('night mode')) {
          document.documentElement.classList.add('dark');
          toast({
            title: "Theme changed",
            description: "Dark mode activated",
          });
        } else if (lastMessage.content.toLowerCase().includes('light mode') || 
                 lastMessage.content.toLowerCase().includes('day mode')) {
          document.documentElement.classList.remove('dark');
          toast({
            title: "Theme changed",
            description: "Light mode activated",
          });
        } else if (lastMessage.content.toLowerCase().includes('show parallax')) {
          toggleHeroParallax(true);
        } else if (lastMessage.content.toLowerCase().includes('hide parallax')) {
          toggleHeroParallax(false);
        } else if (lastMessage.content.toLowerCase().includes('switch to grok') ||
                 lastMessage.content.toLowerCase().includes('use grok')) {
          setAIMode('grok');
          toast({
            title: "AI Mode Changed",
            description: "Switched to Grok AI mode",
          });
        } else if (lastMessage.content.toLowerCase().includes('switch to atlas') ||
                 lastMessage.content.toLowerCase().includes('use atlas')) {
          setAIMode('atlas');
          toast({
            title: "AI Mode Changed",
            description: "Switched to Atlas AI mode",
          });
        }
      }
    }
  }, [messages, toast, toggleHeroParallax, setAIMode]);
}
