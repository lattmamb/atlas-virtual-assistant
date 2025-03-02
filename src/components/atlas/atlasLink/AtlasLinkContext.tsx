
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Message, ApiKeys, ActiveTab } from './types';

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
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openai: '',
    huggingface: ''
  });
  const [automationStatus, setAutomationStatus] = useState('No tasks scheduled.');
  const [selectedInstruction, setSelectedInstruction] = useState<string | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleCelestialMode = () => setCelestialMode(!celestialMode);
  
  const handleSaveApiKeys = () => {
    alert('API Keys saved securely!');
  };
  
  const handleScheduleAutomation = () => {
    if (!apiKeys.openai) {
      alert('Please provide an OpenAI API Key for automation scheduling.');
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
