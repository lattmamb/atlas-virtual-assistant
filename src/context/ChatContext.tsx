
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  isLoading?: boolean;
};

type ChatContextType = {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello, I'm Atlas. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = useCallback(async (userMessage: string) => {
    // Simulate a delay for the AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simple responses for demo purposes
    const responses = [
      "I understand what you're asking. Let me think about that for a moment.",
      "That's an interesting question. Here's what I found.",
      "I'm here to help with that. Based on my knowledge, I would suggest the following.",
      "Let me analyze that for you. From my perspective, here's what you should consider.",
      "I've processed your request, and here's my response.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: "user",
        timestamp: new Date(),
      };

      // Add assistant message as loading placeholder
      const assistantMessageId = (Date.now() + 1).toString();
      const loadingMessage: Message = {
        id: assistantMessageId,
        content: "",
        role: "assistant",
        timestamp: new Date(),
        isLoading: true,
      };

      setMessages((prev) => [...prev, userMessage, loadingMessage]);
      setIsLoading(true);

      try {
        // Generate AI response
        const response = await generateResponse(content);

        // Update assistant message with response
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: response,
                  isLoading: false,
                }
              : msg
          )
        );
      } catch (error) {
        // Handle error
        console.error("Error generating response:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: "I'm having trouble processing that right now. Could you try again?",
                  isLoading: false,
                }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [generateResponse]
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        content: "Hello, I'm Atlas. How can I assist you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
