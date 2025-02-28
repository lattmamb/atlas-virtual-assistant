
export type ApiKeyProvider = "openai" | "anthropic" | "cohere" | "huggingface" | "google" | "hugging face";

export interface ApiKey {
  id?: string;
  user_id?: string;
  api_key: string;
  created_at?: string;
  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: string;
  "hugging face": string;
}

export interface User {
  id: string;
  email?: string;
}
