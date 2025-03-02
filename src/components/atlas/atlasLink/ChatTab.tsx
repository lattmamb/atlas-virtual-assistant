
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';

const ChatTab: React.FC = () => {
  const { celestialMode, messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();

  return (
    <div className="p-4 h-full">
      <Card className={cn(
        "h-full flex flex-col",
        celestialMode ? "dark-apple-card" : "apple-card"
      )}>
        <CardContent className="flex-1 p-4 flex flex-col">
          <div className="chat-messages flex-1 overflow-y-auto mb-4">
            {messages.map(message => (
              <div key={message.id} className={cn(
                "mb-4 p-3 rounded-2xl max-w-[80%]",
                message.role === 'user' 
                  ? "ml-auto bg-primary text-primary-foreground" 
                  : "mr-auto bg-gray-100 dark:bg-gray-800"
              )}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <ChatInput
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="apple-button">Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatTab;
