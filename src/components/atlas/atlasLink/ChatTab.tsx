
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';
import { RetroGrid } from '@/components/ui/retro-grid';

const ChatTab: React.FC = () => {
  const { celestialMode, messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();
  const [darkChatTheme, setDarkChatTheme] = useState(true);

  return (
    <div className="p-4 h-full relative">
      {/* Add RetroGrid with dark theme if not in celestial mode */}
      {!celestialMode && darkChatTheme && (
        <RetroGrid className="opacity-30" />
      )}
      
      <Card className={cn(
        "h-full flex flex-col relative z-10",
        celestialMode 
          ? "dark-apple-card" 
          : darkChatTheme 
            ? "dark-chat-card" 
            : "apple-card"
      )}>
        <CardContent className="flex-1 p-4 flex flex-col">
          <div className="chat-messages flex-1 overflow-y-auto mb-4">
            {messages.map(message => (
              <div key={message.id} className={cn(
                "mb-4 p-3 rounded-2xl max-w-[80%]",
                message.role === 'user' 
                  ? "ml-auto bg-primary text-primary-foreground" 
                  : darkChatTheme && !celestialMode
                    ? "mr-auto bg-gray-800 text-gray-100" 
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
              className={cn("flex-1", darkChatTheme && !celestialMode ? "bg-gray-900 text-white border-gray-700" : "")}
            />
            <Button onClick={handleSendMessage} className={darkChatTheme && !celestialMode ? "dark-apple-button" : "apple-button"}>Send</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Theme toggle button */}
      {!celestialMode && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setDarkChatTheme(!darkChatTheme)} 
          className="absolute bottom-6 right-6 z-20 bg-gray-800 text-white hover:bg-gray-700"
        >
          {darkChatTheme ? "Light Theme" : "Dark Theme"}
        </Button>
      )}
    </div>
  );
};

export default ChatTab;
