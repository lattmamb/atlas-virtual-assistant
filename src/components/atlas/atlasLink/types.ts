
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ApiKeys {
  openai: string;
  huggingface: string;
  supabase: string;
  openrouter?: string;
  [key: string]: string | undefined; // Add index signature with optional values
}

export type ActiveTab = 'dashboard' | 'chat' | 'knowledge' | 'store' | 'api' | 'settings';
