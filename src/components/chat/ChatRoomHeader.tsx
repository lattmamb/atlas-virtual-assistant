
import React from "react";
import { Clock, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { LampEffect } from "@/components/ui/LampEffect";
import { GooeyText } from "@/components/ui/GooeyText";
import RainbowButton from "@/components/chat/RainbowButton";
import { MessageSquarePlus, PanelRightOpen } from "lucide-react";

interface ChatRoomHeaderProps {
  typingStatus: string;
  isLoading: boolean;
  showTimeline: boolean;
  setShowTimeline: (show: boolean) => void;
  aiMode?: 'atlas' | 'grok';
}

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({
  typingStatus,
  isLoading,
  showTimeline,
  setShowTimeline,
  aiMode = 'atlas'
}) => {
  return (
    <LampEffect subtle className="w-full">
      <div className="max-w-4xl mx-auto w-full px-4 py-2 flex items-center justify-between">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs opacity-70">
              {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
          <div className="h-4 border-r border-gray-300 dark:border-gray-700" />
          <GooeyText text={typingStatus} duration={0.5} className="italic" />
          {isLoading && (
            <span className="inline-block animate-pulse ml-1">
              {aiMode === 'atlas' ? (
                <Sparkles className="h-3 w-3 text-blue-400" />
              ) : (
                <Zap className="h-3 w-3 text-purple-400" />
              )}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <RainbowButton
            size="sm" 
            subtle 
            variant="outline"
            className={cn(
              aiMode === 'grok' && "border-purple-400/30"
            )}
            onClick={() => setShowTimeline(!showTimeline)}
          >
            {showTimeline ? <MessageSquarePlus className="h-4 w-4 mr-1" /> : <PanelRightOpen className="h-4 w-4 mr-1" />}
            {showTimeline ? "Focus Chat" : "Show Timeline"}
          </RainbowButton>
        </div>
      </div>
    </LampEffect>
  );
};

export default ChatRoomHeader;
