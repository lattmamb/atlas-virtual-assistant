
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Book, Store, Key, Menu } from "lucide-react";
import { useAtlasLink } from './AtlasLinkContext';

const MobileNavigation: React.FC = () => {
  const { activeTab, setActiveTab, toggleSidebar } = useAtlasLink();

  return (
    <div className="md:hidden mobile-navigation">
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('dashboard')}
      >
        <Home size={24} className={activeTab === 'dashboard' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('chat')}
      >
        <MessageSquare size={24} className={activeTab === 'chat' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('knowledge')}
      >
        <Book size={24} className={activeTab === 'knowledge' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('store')}
      >
        <Store size={24} className={activeTab === 'store' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="tap-highlight no-select"
        onClick={() => setActiveTab('api')}
      >
        <Key size={24} className={activeTab === 'api' ? "text-primary" : ""} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar} 
        className="tap-highlight no-select"
      >
        <Menu size={24} />
      </Button>
    </div>
  );
};

export default MobileNavigation;
