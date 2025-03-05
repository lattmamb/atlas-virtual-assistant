
export interface Message {
  id?: string;
  text: string;
  sender: string;
  created_at: string;
}

export interface PulseChatProps {
  language: string;
  atxBalance: number;
  setAtxBalance: React.Dispatch<React.SetStateAction<number>>;
}

export interface AISelectorProps {
  activeAI: string;
  setActiveAI: (ai: string) => void;
  language: string;
  atxBalance: number;
  setAtxBalance: React.Dispatch<React.SetStateAction<number>>;
}

export interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (text: string) => void;
  isListening: boolean;
  toggleListening: () => void;
  language: string;
}

export interface MessageListProps {
  messages: Message[];
  toTask: (text: string) => void;
  language: string;
}
