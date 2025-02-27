
export type ApiKeyProvider = "openai" | "anthropic" | "cohere";

export interface ApiKey {
  id: string;
  user_id: string;
  provider: ApiKeyProvider;
  api_key: string;
  created_at: string;
}

export interface User {
  id: string;
  email?: string;
}
