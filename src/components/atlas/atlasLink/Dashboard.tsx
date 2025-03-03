
import React from 'react';
import { Card } from "@/components/ui/card";
import { ChatInput } from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Image, MessageSquare, Workflow, Users, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtlasLink } from './AtlasLinkContext';
import { GlowingEffect } from "@/components/ui/glowing-effect";

const Dashboard: React.FC = () => {
  const { celestialMode, messages, inputMessage, setInputMessage, handleSendMessage } = useAtlasLink();

  return (
    <div className="dashboard-grid overscroll-bounce">
      {/* Calendar Tile */}
      <Card className={cn(
        celestialMode ? "dark-apple-card" : "apple-card",
        "hover-scale apple-card-hover"
      )}>
        <div className="relative h-full w-full">
          <GlowingEffect
            spread={20}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.1}
            borderWidth={1}
            className="opacity-30"
          />
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Calendar</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>June 2025<br/>No events today.</p>
          </div>
        </div>
      </Card>
      
      {/* Mail Tile */}
      <Card className={cn(
        celestialMode ? "dark-apple-card" : "apple-card",
        "hover-scale apple-card-hover"
      )}>
        <div className="relative h-full w-full">
          <GlowingEffect
            spread={20}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.1}
            borderWidth={1}
            className="opacity-30"
          />
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Mail</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Inbox is empty</p>
          </div>
        </div>
      </Card>
      
      {/* Photos Tile */}
      <Card className={cn(
        celestialMode ? "dark-apple-card" : "apple-card",
        "hover-scale apple-card-hover"
      )}>
        <div className="relative h-full w-full">
          <GlowingEffect
            spread={20}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.1}
            borderWidth={1}
            className="opacity-30"
          />
          <div className="flex items-center gap-2 mb-3">
            <Image className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Photos</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>No recent photos</p>
          </div>
        </div>
      </Card>
      
      {/* Atlas AI Assistant */}
      <Card className={cn(
        "h-[300px] flex flex-col col-span-2 row-span-2",
        celestialMode ? "dark-apple-card" : "apple-card",
        "hover-scale apple-card-hover"
      )}>
        <div className="relative h-full w-full">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={100}
            inactiveZone={0.1}
            borderWidth={2}
            className="opacity-30"
          />
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Atlas AI Assistant</h3>
          </div>
          <div className="chat-box flex-1 flex flex-col">
            <div className="chat-messages flex-1 overflow-y-auto mb-2">
              {messages.map(message => (
                <div key={message.id} className={cn(
                  "mb-2 p-2 rounded-lg max-w-[80%]",
                  message.role === 'user' 
                    ? "ml-auto bg-primary text-white" 
                    : "mr-auto bg-gray-100 dark:bg-gray-800"
                )}>
                  {message.content}
                </div>
              ))}
            </div>
            <div className="chat-input-container flex">
              <ChatInput
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage} className="ml-2 apple-button-modern">Send</Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Workflow Builder */}
      <Card className={cn(
        celestialMode ? "dark-apple-card" : "apple-card",
        "hover-scale apple-card-hover"
      )}>
        <div className="relative h-full w-full">
          <GlowingEffect
            spread={20}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.1}
            borderWidth={1}
            className="opacity-30"
          />
          <div className="flex items-center gap-2 mb-3">
            <Workflow className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Workflow Builder</h3>
          </div>
          <div className="workflow-canvas">
            <span>Drag nodes here (future feature)</span>
          </div>
        </div>
      </Card>
      
      {/* Social Feed */}
      <Card className={cn(
        celestialMode ? "dark-apple-card" : "apple-card",
        "hover-scale apple-card-hover"
      )}>
        <div className="relative h-full w-full">
          <GlowingEffect
            spread={20}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.1}
            borderWidth={1}
            className="opacity-30"
          />
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Social Feed</h3>
          </div>
          <div className="social-feed">
            <div className="social-post">User123: Checking out Atlas Link!</div>
            <div className="social-post">User456: Loving the new AI workflow features!</div>
          </div>
        </div>
      </Card>
      
      {/* Mobility & Charging */}
      <Card className={cn(
        celestialMode ? "dark-apple-card" : "apple-card",
        "hover-scale apple-card-hover"
      )}>
        <div className="relative h-full w-full">
          <GlowingEffect
            spread={20}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.1}
            borderWidth={1}
            className="opacity-30"
          />
          <div className="flex items-center gap-2 mb-3">
            <Map className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Mobility & Charging</h3>
          </div>
          <div className="mobility-map">
            <p>Live map & charging hubs coming soon...</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
