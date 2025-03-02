
import React from "react";
import { motion } from "framer-motion";
import { Info, PanelRightOpen, Star, Bookmark, PencilLine, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatTimeline from "@/components/chat/ChatTimeline";

interface TimelineItem {
  id: string;
  time: string;
  content: string;
  type: 'message' | 'star' | 'event';
}

interface ChatTimelinePanelProps {
  items: TimelineItem[];
  onClose: () => void;
}

const ChatTimelinePanel: React.FC<ChatTimelinePanelProps> = ({ items, onClose }) => {
  const messageActions = [
    { icon: <Star className="h-4 w-4" />, label: "Star message" },
    { icon: <Bookmark className="h-4 w-4" />, label: "Save to bookmarks" },
    { icon: <PencilLine className="h-4 w-4" />, label: "Take notes" },
    { icon: <Pin className="h-4 w-4" />, label: "Pin to dashboard" },
  ];

  return (
    <motion.div 
      className="w-72 ml-4 overflow-hidden border rounded-lg hybrid hidden md:flex md:flex-col"
      style={{ borderColor: 'var(--widget-border)' }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--widget-border)' }}>
        <h3 className="text-sm font-medium flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5" />
          Conversation Timeline
        </h3>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <PanelRightOpen className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <ChatTimeline items={items} />
      </div>
      
      <div className="p-3 border-t" style={{ borderColor: 'var(--widget-border)' }}>
        <div className="grid grid-cols-4 gap-1">
          {messageActions.map((action, i) => (
            <Button 
              key={i} 
              variant="ghost" 
              size="icon" 
              className="h-8 w-full flex flex-col items-center justify-center gap-1"
              title={action.label}
            >
              {action.icon}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatTimelinePanel;
