
import React from 'react';
import { useAtlasLink } from './AtlasLinkContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useTheme } from '@/context/ThemeContext';

const ChatTab: React.FC = () => {
  const { messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();
  const { isDarkMode } = useTheme();

  return (
    <div className={`h-full flex flex-col relative transition-colors duration-300 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'}`}>
      <MessageList messages={messages} />
      <MessageInput 
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default ChatTab;
