
import { ApiKeyProvider, Message as MessageType } from "@/lib/types";
import { ReactNode } from "react";

export interface ChatProviderProps {
  children: ReactNode;
}

export interface MessageRequest {
  role: string;
  content: string;
}

export interface ChatContextValue {
  messages: MessageType[];
  addMessage: (content: string, role: "user" | "assistant" | "system", model?: string) => void;
  clearMessages: () => void;
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  availableProviders: ApiKeyProvider[];
  sendMessage: (content: string) => void;
}
