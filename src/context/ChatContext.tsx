
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
    if (localStorage.getItem('huggingface_api_key')) {
      providers.push('huggingface');
    }
    
    setAvailableProviders(providers);
    
    // If we have providers but none selected, select the first one
    if (providers.length > 0 && !selectedProvider) {
      setSelectedProvider(providers[0]);
    }
  }, [selectedProvider]);

  const generateHuggingFaceResponse = async (userMessage: string) => {
    const token = localStorage.getItem('huggingface_api_key');
    if (!token) {
      throw new Error("No Hugging Face API token found");
    }

    try {
      // Using a different model that's more likely to be available
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-small",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: userMessage }),
        }
      );

      if (!response.ok) {
        // Better error handling
        const errorText = await response.text();
        console.error("Hugging Face API Error:", errorText);
        
        // Check if the model is still loading
        if (errorText.includes("Model is currently loading")) {
          return "The AI model is still loading. Please try again in a few moments.";
        }
        
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data[0]?.generated_text || data.generated_text || "I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error("Error in Hugging Face API call:", error);
      // More user-friendly error message
      return "There was an issue connecting to Hugging Face. Please check your API token or try again later.";
    }
  };

  const generateOpenAIResponse = async (userMessage: string) => {
    const token = localStorage.getItem('openai_api_key');
    if (!token) {
      throw new Error("No OpenAI API token found");
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userMessage }
          ],
          max_tokens: 150
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API Error:", errorData);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error in OpenAI API call:", error);
      return "There was an issue connecting to OpenAI. Please check your API token or try again later.";
    }
  };

  const generateAnthropicResponse = async (userMessage: string) => {
    const token = localStorage.getItem('anthropic_api_key');
    if (!token) {
      throw new Error("No Anthropic API token found");
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": token,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-2",
          messages: [
            { role: "user", content: userMessage }
          ],
          max_tokens: 150
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Anthropic API Error:", errorData);
        throw new Error(`Anthropic API error: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error("Error in Anthropic API call:", error);
      return "There was an issue connecting to Anthropic. Please check your API token or try again later.";
    }
  };

  const generateCohereResponse = async (userMessage: string) => {
    const token = localStorage.getItem('cohere_api_key');
    if (!token) {
      throw new Error("No Cohere API token found");
    }

    try {
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          model: "command",
          prompt: userMessage,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cohere API Error:", errorData);
        throw new Error(`Cohere API error: ${response.status}`);
      }

      const data = await response.json();
      return data.generations[0].text;
    } catch (error) {
      console.error("Error in Cohere API call:", error);
      return "There was an issue connecting to Cohere. Please check your API token or try again later.";
    }
  };

  const generateResponse = useCallback(async (userMessage: string) => {
    // If no provider is selected, provide a helpful message
    if (!selectedProvider) {
      if (availableProviders.length === 0) {
        return "You need to configure an API key in Settings before I can process your requests. Click the settings icon in the top right to add your API key.";
      } else {
        return "Please select an AI provider from the dropdown above to process your request.";
      }
    }
    
    try {
      // Call the appropriate API based on the selected provider
      switch (selectedProvider) {
        case 'huggingface':
          return await generateHuggingFaceResponse(userMessage);
        case 'openai':
          return await generateOpenAIResponse(userMessage);
        case 'anthropic':
          return await generateAnthropicResponse(userMessage);
        case 'cohere':
          return await generateCohereResponse(userMessage);
        default:
          return "Unknown provider selected. Please check your settings.";
      }
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "API Error",
        description: "There was an error communicating with the AI provider. Please check your API key and try again.",
        variant: "destructive",
      });
      return "I encountered an error communicating with the AI provider. Please check your API key and try again.";
    }
  }, [selectedProvider, availableProviders, toast]);

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
