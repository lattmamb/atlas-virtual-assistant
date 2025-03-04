
import { useState, useEffect } from 'react';
import { Message } from '@/lib/types';

export function useTypingStatus(isLoading: boolean, messages: Message[], aiMode: 'atlas' | 'grok') {
  const [typingStatus, setTypingStatus] = useState<string>("Ready");

  // Simulate typing status changes
  useEffect(() => {
    if (isLoading) {
      setTypingStatus(aiMode === 'atlas' ? "Atlas is thinking..." : "Grok is thinking...");
    } else if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setTypingStatus("Message delivered");
      
      // Reset back to ready after a delay
      const timer = setTimeout(() => {
        setTypingStatus("Ready");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, messages, aiMode]);

  return typingStatus;
}
