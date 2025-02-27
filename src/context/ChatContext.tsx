
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { ApiKeyProvider } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

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
  availableProviders: ApiKeyProvider[];
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider) => void;
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
  const [selectedProvider, setSelectedProvider] = useState<ApiKeyProvider | null>(null);
  const [availableProviders, setAvailableProviders] = useState<ApiKeyProvider[]>([]);
  const { toast } = useToast();

  // Check for API keys in localStorage
  useEffect(() => {
    const providers: ApiKeyProvider[] = [];
    
    // Check for each provider's API key in localStorage
    if (localStorage.getItem('openai_api_key')) {
      providers.push('openai');
    }
    if (localStorage.getItem('anthropic_api_key')) {
      providers.push('anthropic');
    }
    if (localStorage.getItem('cohere_api_key')) {
      providers.push('cohere');
    }
    
    setAvailableProviders(providers);
    
    // If we have providers but none selected, select the first one
    if (providers.length > 0 && !selectedProvider) {
      setSelectedProvider(providers[0]);
    }
  }, [selectedProvider]);

  const generateResponse = useCallback(async (userMessage: string) => {
    // If no provider is selected, provide a helpful message
    if (!selectedProvider) {
      if (availableProviders.length === 0) {
        return "You need to configure an API key in Settings before I can process your requests. Click the settings icon in the top right to add your API key.";
      } else {
        return "Please select an AI provider from the dropdown above to process your request.";
      }
    }
    
    // For this demo, we'll simulate a response with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real implementation, we would call the appropriate API here
    // using the stored API key for the selected provider
    const responses = [
      `I processed your request using ${selectedProvider}. Here's what I found...`,
      `Using ${selectedProvider}'s powerful AI, I can tell you that...`,
      `Based on my analysis with ${selectedProvider}, I would recommend...`,
      `According to ${selectedProvider}'s model, the answer to your question is...`,
      `I've leveraged ${selectedProvider}'s AI capabilities to analyze your request.`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }, [selectedProvider, availableProviders]);

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
        availableProviders,
        selectedProvider,
        setSelectedProvider,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
