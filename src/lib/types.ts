
export interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  name: string;
  badge?: {
    count: number;
    color: string;
  } | string;
  onClick?: () => void;
}

export interface SubMenuSectionProps {
  items: NavItem[];
  isActive: (path: string) => boolean;
  title?: string;
  isCollapsed?: boolean;
  label?: string;
  activeItem?: string;
  onItemClick?: (path: string) => void;
  collapsible?: boolean;
  onNavItemClick?: (item: NavItem) => void;
}

export interface SidebarSectionProps {
  label?: string;
  items: NavItem[];
  isActive: (path: string) => boolean;
  isCollapsed?: boolean;
  children?: React.ReactNode;
}

export type ApiKeyProvider = "openai" | "anthropic" | "huggingface" | "google" | "cohere" | "openrouter";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  createdAt: Date;
  model?: string; // Add the model property
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, role: "user" | "assistant" | "system") => Message | void;
  clearMessages: () => void;
  isLoading: boolean;
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  availableProviders: ApiKeyProvider[];
  sendMessage: (content: string) => void;
}

export interface ApiKey {
  id: string;
  created_at: string;
  api_key: string | null;
  anthropic: string | null;
  "hugging face": string | null;
  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: string | null;
  google: string | null;
  cohere: string | null;
  openrouter: string | null;
  user_id?: string;
}

export interface UniverseComponentProps {
  scrollY: number;
}
