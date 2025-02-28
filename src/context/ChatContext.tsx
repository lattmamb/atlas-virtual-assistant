import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuid } from "uuid";
import { ApiKeyProvider } from "@/lib/types";

// Define the message type
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  createdAt: Date;
  isLoading?: boolean;
  model?: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, role: "user" | "assistant" | "system", model?: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  availableProviders: ApiKeyProvider[];
  sendMessage: (content: string) => void;
}

const initialMessages: Message[] = [];

const ChatContext = createContext<ChatContextType>({
  messages: initialMessages,
  addMessage: () => {},
  clearMessages: () => {},
  isLoading: false,
  selectedProvider: null,
  setSelectedProvider: () => {},
  availableProviders: [],
  sendMessage: () => {},
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<ApiKeyProvider | null>(null);
  const [availableProviders, setAvailableProviders] = useState<ApiKeyProvider[]>([]);

  const addMessage = (content: string, role: "user" | "assistant" | "system", model?: string) => {
    const message: Message = {
      id: uuid(),
      content,
      role,
      createdAt: new Date(),
      model,
    };
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // Add a sendMessage function to handle user messages and get AI responses
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading || !selectedProvider) return;
    
    // Add user message
    addMessage(content, "user");
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Add a placeholder for the AI response with loading indicator
      const placeholderId = uuid();
      const loadingMessage: Message = {
        id: placeholderId,
        content: "Thinking...",
        role: "assistant",
        createdAt: new Date(),
        isLoading: true,
      };
      
      setMessages(prev => [...prev, loadingMessage]);
      
      // Prepare conversation history
      const conversationMessages = messages
        .filter(msg => !msg.isLoading)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Add the new user message
      conversationMessages.push({
        role: "user",
        content
      });
      
      // Call the API via our edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          provider: selectedProvider,
          messages: conversationMessages,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error from ${selectedProvider} API`);
      }
      
      const data = await response.json();
      
      // Replace the loading message with the actual response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === placeholderId 
            ? { 
                ...msg, 
                content: data.content, 
                isLoading: false,
                model: data.model
              } 
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      
      // Remove the loading message if there was an error
      setMessages(prev => prev.filter(msg => !msg.isLoading));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase.from("api_keys").select("*");
        
        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Extract available providers based on database structure
          const providers: ApiKeyProvider[] = [];
          
          // Check if API keys exist in the data
          if (data[0].api_key && data[0].api_key.trim() !== '') {
            providers.push('openai'); // Default for api_key
          }
          
          if (data[0]["hugging face"] && data[0]["hugging face"].trim() !== '') {
            providers.push('hugging face');
          }
          
          if (data[0].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 && 
              data[0].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.trim() !== '') {
            providers.push('huggingface');
          }
          
          // For simulation, add these providers
          // We'll only keep these if you've set up the corresponding API keys
          const providerKeyMap = {
            'anthropic': false,
            'cohere': false,
            'google': false
          };
          
          // Only add these providers if we're running in production or they have keys
          Object.keys(providerKeyMap).forEach(provider => {
            if (data[0][provider] && data[0][provider].trim() !== '') {
              providers.push(provider as ApiKeyProvider);
            }
          });
          
          // Remove duplicates
          const uniqueProviders = [...new Set(providers)];
          setAvailableProviders(uniqueProviders);
          
          // Select the first provider by default if none is selected
          if (!selectedProvider && uniqueProviders.length > 0) {
            setSelectedProvider(uniqueProviders[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching API keys:", error);
        toast({
          title: "Error fetching API keys",
          description: "Please check your database connection.",
          variant: "destructive",
        });
      }
    };

    fetchApiKeys();
  }, [selectedProvider]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isLoading,
        selectedProvider,
        setSelectedProvider,
        availableProviders,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
