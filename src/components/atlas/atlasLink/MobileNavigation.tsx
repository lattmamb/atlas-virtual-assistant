
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Book, Store, Key, Menu } from "lucide-react";
import { useAtlasLink } from './AtlasLinkContext';

const MobileNavigation: React.FC = () => {
  const { activeTab, setActiveTab, toggleSidebar } = useAtlasLink();

  return (
    <div className="md:hidden mobile-navigation" role="navigation" aria-label="Mobile Navigation">
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('dashboard')}
        aria-label="Dashboard"
        aria-current={activeTab === 'dashboard' ? 'page' : undefined}
      >
        <Home size={24} className={activeTab === 'dashboard' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('chat')}
        aria-label="Chat"
        aria-current={activeTab === 'chat' ? 'page' : undefined}
      >
        <MessageSquare size={24} className={activeTab === 'chat' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('knowledge')}
        aria-label="Knowledge Base"
        aria-current={activeTab === 'knowledge' ? 'page' : undefined}
      >
        <Book size={24} className={activeTab === 'knowledge' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('store')}
        aria-label="GPT Store"
        aria-current={activeTab === 'store' ? 'page' : undefined}
      >
        <Store size={24} className={activeTab === 'store' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('api')}
        aria-label="API Integrations"
        aria-current={activeTab === 'api' ? 'page' : undefined}
      >
        <Key size={24} className={activeTab === 'api' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="tap-highlight no-select"
        aria-label="Toggle Sidebar"
        aria-expanded={toggleSidebar ? "true" : "false"}
      >
        <Menu size={24} />
      </Button>
    </div>
  );
};

export default MobileNavigation;
