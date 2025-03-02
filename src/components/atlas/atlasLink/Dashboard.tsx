
import React from 'react';
import { Card } from "@/components/ui/card";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Image, MessageSquare, Workflow, Users, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';

const Dashboard: React.FC = () => {
  const { celestialMode, messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();

  return (
    <div className="dashboard-grid overscroll-bounce">
      {/* Calendar Tile */}
      <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Calendar</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>June 2025<br/>No events today.</p>
        </div>
      </Card>
      
      {/* Mail Tile */}
      <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Mail</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Inbox is empty</p>
        </div>
      </Card>
      
      {/* Photos Tile */}
      <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
        <div className="flex items-center gap-2 mb-3">
          <Image className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Photos</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>No recent photos</p>
        </div>
      </Card>
      
      {/* Atlas AI Assistant */}
      <Card className={cn(
        "h-[300px] flex flex-col col-span-2 row-span-2",
        celestialMode ? "dark-apple-card" : "apple-card"
      )}>
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Atlas AI Assistant</h3>
        </div>
        <div className="chat-box flex-1">
          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={message.role === 'user' ? 'user-message' : 'ai-message'}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <ChatInput
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button size="sm" onClick={handleSendMessage} className="ml-2">Send</Button>
          </div>
        </div>
      </Card>
      
      {/* Workflow Builder */}
      <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
        <div className="flex items-center gap-2 mb-3">
          <Workflow className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Workflow Builder</h3>
        </div>
        <div className="workflow-canvas">
          <span>Drag nodes here (future feature)</span>
        </div>
      </Card>
      
      {/* Social Feed */}
      <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Social Feed</h3>
        </div>
        <div className="social-feed">
          <div className="social-post">User123: Checking out Atlas Link!</div>
          <div className="social-post">User456: Loving the new AI workflow features!</div>
        </div>
      </Card>
      
      {/* Mobility & Charging */}
      <Card className={celestialMode ? "dark-apple-card" : "apple-card"}>
        <div className="flex items-center gap-2 mb-3">
          <Map className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Mobility & Charging</h3>
        </div>
        <div className="mobility-map">
          <p>Live map & charging hubs coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
