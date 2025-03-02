
export type ActiveTab = 'dashboard' | 'chat' | 'workflow' | 'settings' | 'knowledge' | 'store' | 'api';

export interface ApiKeys {
  openai: string;
  huggingface: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}
