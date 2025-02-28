
export type ApiKeyProvider = "openai" | "anthropic" | "cohere" | "huggingface" | "google" | "hugging face";

export interface ApiKey {
  id?: string;
  user_id?: string;
  api_key?: string;
  created_at?: string;
  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?: string;
  "hugging face"?: string;
  // Add these missing properties
  anthropic?: string;
  google?: string;
  cohere?: string;
}

export interface User {
  id: string;
  email?: string;
}

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  createdAt: Date;
  isLoading?: boolean;
  model?: string;
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, role: "user" | "assistant" | "system") => void;
  clearMessages: () => void;
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  availableProviders: ApiKeyProvider[];
  sendMessage: (content: string) => void;
}
