
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAtlasLink } from './AtlasLinkContext';

const TopBar: React.FC = () => {
  const { activeTab, toggleSidebar } = useAtlasLink();

  return (
    <div className="apple-glass border-b p-3 flex items-center justify-between z-10">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
        <Menu />
      </Button>
      <h1 className="text-xl font-medium">
        {activeTab === 'dashboard' && "Atlas Link Dashboard"}
        {activeTab === 'chat' && "AI Assistant"}
        {activeTab === 'knowledge' && "Knowledge Base"}
        {activeTab === 'store' && "GPT Store"}
        {activeTab === 'api' && "API Integrations"}
        {activeTab === 'settings' && "Settings"}
      </h1>
      <div className="flex gap-2">
        {/* Additional header actions can go here */}
      </div>
    </div>
  );
};

export default TopBar;
