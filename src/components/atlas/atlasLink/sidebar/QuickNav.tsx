
import React from 'react';
import { Button } from "@/components/ui/button";

interface QuickNavProps {
  buttons: {
    icon: React.ReactNode;
    ariaLabel: string;
  }[];
}

const QuickNav: React.FC<QuickNavProps> = ({ buttons }) => {
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
