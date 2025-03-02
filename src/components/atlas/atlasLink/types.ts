
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
}

export type ActiveTab = 'dashboard' | 'chat' | 'knowledge' | 'store' | 'api' | 'settings';
