
import React, { useEffect } from 'react';
import { useAtlasLink } from './AtlasLinkContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const ChatTab: React.FC = () => {
  const { messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();
  const { isDarkMode } = useTheme();

  // Apply iOS blur effect style based on theme
  const backgroundStyle = isDarkMode 
    ? 'bg-black/80 backdrop-blur-lg' 
    : 'bg-white/80 backdrop-blur-lg';

  return (
    <motion.div 
      className={`h-full flex flex-col relative transition-colors duration-300 ${backgroundStyle} rounded-xl overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <MessageList messages={messages} />
      <MessageInput 
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </motion.div>
  );
};

export default ChatTab;
