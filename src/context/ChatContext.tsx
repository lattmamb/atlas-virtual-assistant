
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { Message, ChatContextType, ApiKeyProvider, ApiKey } from "@/lib/types";
import { extractApiKeys, getAvailableProviders } from "./chatUtils";
import { toast } from "sonner";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ApiKeyProvider | null>(null);
  const [availableProviders, setAvailableProviders] = useState<ApiKeyProvider[]>([]);
  const [apiKeys, setApiKeys] = useState<Record<ApiKeyProvider, string | null> | null>(null);

  useEffect(() => {
    const fetchApiKeys = async () => {
      const { data, error } = await supabase.from("api_keys").select("*");

      if (error) {
        console.error("Error fetching API keys:", error);
        return;
      }

      if (data && data.length > 0) {
        // Cast the data to ApiKey type to ensure it has the right properties
        const keys = data[0] as unknown as ApiKey;
        const extractedKeys = extractApiKeys([keys]);
        setApiKeys(extractedKeys);
        setAvailableProviders(getAvailableProviders(extractedKeys));
        
        // Auto-select first available provider
        const providers = getAvailableProviders(extractedKeys);
        if (providers.length > 0 && !selectedProvider) {
          setSelectedProvider(providers[0]);
        }
      }
    };

    fetchApiKeys();
  }, [selectedProvider]);

  const addMessage = (content: string, role: "user" | "assistant" | "system") => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      role,
      createdAt: new Date(),
      model: selectedProvider || undefined,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    return newMessage;
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      const userMessage = addMessage(content, "user");
      setIsLoading(true);

      if (!selectedProvider || !apiKeys) {
        setIsLoading(false);
        toast.error("No API provider selected", {
          description: "Please select an API provider in settings",
        });
        return;
      }

      // Call AI service based on selectedProvider
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          provider: selectedProvider,
          apiKey: apiKeys[selectedProvider],
          history: messages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();
      addMessage(data.response, "assistant");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value: ChatContextType = {
    messages,
    addMessage,
    clearMessages,
    isLoading,
    selectedProvider,
    setSelectedProvider,
    availableProviders,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
