
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Message, ApiKeys, ActiveTab } from './types';
import { toast } from "sonner";

interface AtlasLinkContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  celestialMode: boolean;
  setCelestialMode: (mode: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  messages: Message[];
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  apiKeys: ApiKeys;
  setApiKeys: (keys: ApiKeys) => void;
  automationStatus: string;
  setAutomationStatus: (status: string) => void;
  selectedInstruction: string | null;
  setSelectedInstruction: (instruction: string | null) => void;
  handleSendMessage: () => void;
  handleSaveApiKeys: () => void;
  handleScheduleAutomation: () => void;
  toggleSidebar: () => void;
  toggleCelestialMode: () => void;
}

const AtlasLinkContext = createContext<AtlasLinkContextType | undefined>(undefined);

// Helper function to load API keys from localStorage
const loadApiKeysFromStorage = (): ApiKeys => {
  try {
    const openai = localStorage.getItem('atlas_openai_key') || '';
    const huggingface = localStorage.getItem('atlas_huggingface_key') || '';
    
    return { openai, huggingface };
  } catch (error) {
    console.error('Error loading API keys from localStorage:', error);
    return { openai: '', huggingface: '' };
  }
};

// Helper function to save API keys to localStorage
const saveApiKeysToStorage = (keys: ApiKeys) => {
  try {
    if (keys.openai) {
      localStorage.setItem('atlas_openai_key', keys.openai);
    }
    if (keys.huggingface) {
      localStorage.setItem('atlas_huggingface_key', keys.huggingface);
    }
  } catch (error) {
    console.error('Error saving API keys to localStorage:', error);
  }
};

export const AtlasLinkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [celestialMode, setCelestialMode] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Atlas AI. Ask me anything, or explore the iCloud-style dashboard.",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [apiKeys, setApiKeys] = useState<ApiKeys>(loadApiKeysFromStorage());
  const [automationStatus, setAutomationStatus] = useState('No tasks scheduled.');
  const [selectedInstruction, setSelectedInstruction] = useState<string | null>(null);

  // Load API keys on initial mount
  useEffect(() => {
    const storedApiKeys = loadApiKeysFromStorage();
    setApiKeys(storedApiKeys);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleCelestialMode = () => setCelestialMode(!celestialMode);
  
  const handleSaveApiKeys = () => {
    saveApiKeysToStorage(apiKeys);
    toast.success('API Keys saved securely to your device!');
  };
  
  const handleScheduleAutomation = () => {
    if (!apiKeys.openai) {
      toast.error('Please provide an OpenAI API Key for automation scheduling.');
      return;
    }
    
    setAutomationStatus('Scheduling...');
    addMessage('Scheduling an automation task...', 'user');
    
    setTimeout(() => {
      setAutomationStatus('Task scheduled successfully!');
      addMessage('Automation task scheduled via Atlas Link workflow!', 'assistant');
    }, 1000);
  };
  
  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add selected instruction context if any is selected
    let messageToSend = inputMessage;
    if (selectedInstruction) {
      messageToSend = `[Instruction: ${selectedInstruction}] ${inputMessage}`;
    }
    
    addMessage(messageToSend, 'user');
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = !apiKeys.openai
        ? 'Please provide an OpenAI API key in the sidebar first.'
        : `AI: You said "${messageToSend}". This is a placeholder response.`;
      
      addMessage(aiResponse, 'assistant');
    }, 600);
  };

  const value = {
    sidebarOpen,
    setSidebarOpen,
    celestialMode,
    setCelestialMode,
    activeTab,
    setActiveTab,
    messages,
    addMessage,
    inputMessage,
    setInputMessage,
    apiKeys,
    setApiKeys,
    automationStatus,
    setAutomationStatus,
    selectedInstruction,
    setSelectedInstruction,
    handleSendMessage,
    handleSaveApiKeys,
    handleScheduleAutomation,
    toggleSidebar,
    toggleCelestialMode
  };

  return (
    <AtlasLinkContext.Provider value={value}>
      {children}
    </AtlasLinkContext.Provider>
  );
};

export const useAtlasLink = () => {
  const context = useContext(AtlasLinkContext);
  if (context === undefined) {
    throw new Error('useAtlasLink must be used within an AtlasLinkProvider');
  }
  return context;
};
