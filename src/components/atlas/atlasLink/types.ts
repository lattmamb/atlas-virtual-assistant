
export type ActiveTab = 'dashboard' | 'chat' | 'settings' | 'knowledge' | 'store' | 'api';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ApiKeys {
  openai: string;
  huggingface: string;
}
