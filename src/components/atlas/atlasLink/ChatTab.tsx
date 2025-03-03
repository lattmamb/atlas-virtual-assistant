
import React from 'react';
import { useAtlasLink } from './AtlasLinkContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatTab: React.FC = () => {
  const { messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();

  return (
    <div className="h-full flex flex-col relative">
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
