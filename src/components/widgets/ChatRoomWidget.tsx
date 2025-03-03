
import React, { useState } from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const messages = [
  { id: 1, content: "Hello! Welcome to Trinity Dodge chat.", sender: "Atlas AI", time: "10:23 AM", isUser: false },
  { id: 2, content: "I'm interested in the Dodge Ram 1500.", sender: "You", time: "10:24 AM", isUser: true },
  { id: 3, content: "Great choice! The 2025 model has excellent towing capacity.", sender: "Atlas AI", time: "10:25 AM", isUser: false }
];

const ChatRoomWidget: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  
  const handleNavigateToChatRoom = () => {
    navigate('/chat');
  };

  return (
    <AppleWidget 
      title="Chat Room"
      icon={<MessageSquare className="h-5 w-5 text-blue-400" />}
      className={cn("col-span-1 md:col-span-2 hybrid")}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 mb-3 rounded-lg p-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium">Trinity Dodge Chat</span>
          </div>
          <span className="text-xs text-gray-400">3 users online</span>
        </div>
        
        <div className={cn(
          "flex-1 overflow-y-auto mb-3 rounded-lg p-3",
          isDarkMode ? "bg-black/20" : "bg-white/50",
          "max-h-[180px] min-h-[180px]"
        )}>
          {messages.map(message => (
            <div 
              key={message.id} 
              className={cn(
                "mb-2 max-w-[80%]", 
                message.isUser ? "ml-auto" : "mr-auto"
              )}
            >
              <div className={cn(
                "rounded-lg p-2",
                message.isUser 
                  ? "bg-blue-500 text-white rounded-tr-none" 
                  : isDarkMode ? "bg-gray-800 rounded-tl-none" : "bg-gray-200 rounded-tl-none"
              )}>
                <p className="text-xs">{message.content}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] mt-1 text-gray-500">
                <span>{message.sender}</span>
                <span>{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <div className={cn(
            "flex-1 rounded-full px-3 py-2 flex items-center",
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          )}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="text-sm w-full bg-transparent border-none outline-none"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </div>
          <Button 
            size="icon" 
            className="rounded-full"
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-3" 
          onClick={handleNavigateToChatRoom}
        >
          Open Full Chat
        </Button>
      </div>
    </AppleWidget>
  );
};

export default ChatRoomWidget;
