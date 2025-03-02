
import React from 'react';
import { useAtlasLink } from './AtlasLinkContext';
import Dashboard from './Dashboard';
import ChatTab from './ChatTab';
import KnowledgeBase from '../KnowledgeBase';
import GptStore from '../GptStore';
import ApiIntegrationManager from '../ApiIntegrationManager';
import SettingsTab from './SettingsTab';

const TabContent: React.FC = () => {
  const { activeTab, celestialMode } = useAtlasLink();

  return (
    <div className="flex-1 overflow-hidden">
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'chat' && <ChatTab />}
      {activeTab === 'knowledge' && (
        <div className="p-4 h-full">
          <KnowledgeBase isDarkMode={celestialMode} />
        </div>
      )}
      {activeTab === 'store' && (
        <div className="p-4 h-full">
          <GptStore isDarkMode={celestialMode} />
        </div>
      )}
      {activeTab === 'api' && (
        <div className="p-4 h-full">
          <ApiIntegrationManager isDarkMode={celestialMode} />
        </div>
      )}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  );
};

export default TabContent;
