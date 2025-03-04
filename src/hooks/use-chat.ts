
import { useChatContext } from '@/context/ChatContext';

// Re-export the context hook with a simpler name
export const useChat = () => {
  return useChatContext();
};

export default useChat;
