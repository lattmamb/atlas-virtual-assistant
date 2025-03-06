
import React from 'react';
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
    ? 'bg-black/80 backdrop-blur-xl border border-white/10' 
    : 'bg-white/80 backdrop-blur-xl border border-gray-200/50';

  return (
    <motion.div 
      className={`h-full flex flex-col relative transition-colors duration-300 ${backgroundStyle} rounded-xl overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
      
      <MessageList messages={messages} />
      
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[40px] bg-gradient-to-t from-background to-transparent pointer-events-none" />
        <MessageInput 
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onSend={handleSendMessage}
        />
      </div>
    </motion.div>
  );
};

export default ChatTab;
