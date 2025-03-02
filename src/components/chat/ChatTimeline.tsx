
import React from "react";
import { cn } from "@/lib/utils";
import { CalendarClock, MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";

interface TimelineItem {
  id: string;
  time: string;
  content: string;
  type: 'message' | 'star' | 'event';
}

interface ChatTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const ChatTimeline: React.FC<ChatTimelineProps> = ({ items, className }) => {
  // Icon mapping based on item type
  const getIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'star':
        return <Star className="h-4 w-4" />;
      case 'event':
        return <CalendarClock className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("w-full py-2", className)}>
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">Timeline</h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <motion.div 
            key={item.id}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                {getIcon(item.type)}
              </div>
              {idx < items.length - 1 && (
                <div className="w-0.5 h-6 bg-muted-foreground/20 my-1" />
              )}
            </div>
            <div className="flex-1 pt-1">
              <div className="text-xs text-muted-foreground">{item.time}</div>
              <div className="text-sm">{item.content}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChatTimeline;
