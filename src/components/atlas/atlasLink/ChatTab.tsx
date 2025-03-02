
import React, { useRef, useEffect } from 'react';
import { useAtlasLink } from './AtlasLinkContext';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat-bubble';
import { ChatInput } from '@/components/ui/chat-input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const ChatTab: React.FC = () => {
  const { messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-4 space-y-4 pr-2">
        {messages.map((message) => (
          <ChatBubble 
            key={message.id} 
            variant={message.role === 'user' ? 'sent' : 'received'}
          >
            {message.role === 'assistant' && (
              <ChatBubbleAvatar fallback="AI" />
            )}
            <ChatBubbleMessage variant={message.role === 'user' ? 'sent' : 'received'}>
              {message.content}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex items-center space-x-2 pt-4 border-t">
        <ChatInput
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Message Atlas AI..."
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage} 
          size="icon"
          disabled={!inputMessage.trim()}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatTab;
