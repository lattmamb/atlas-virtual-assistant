
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Settings, Sparkles } from "lucide-react";

interface QuickNavProps {
  buttons?: {
    icon: React.ReactNode;
    ariaLabel: string;
  }[];
}

const defaultButtons = [
  { icon: <Home size={18} />, ariaLabel: "Home" },
  { icon: <MessageSquare size={18} />, ariaLabel: "Chat" },
  { icon: <Sparkles size={18} />, ariaLabel: "Features" },
  { icon: <Settings size={18} />, ariaLabel: "Settings" }
];

const QuickNav: React.FC<QuickNavProps> = ({ buttons = defaultButtons }) => {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      {buttons.map((button, index) => (
        <Button 
          key={index}
          variant="outline" 
          size="icon" 
          className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900"
          aria-label={button.ariaLabel}
        >
          {button.icon}
        </Button>
      ))}
    </div>
  );
};

export default QuickNav;
