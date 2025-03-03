
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const MotionButton = motion(Button);

export const ProfileButton: React.FC = () => {
  const handleProfileClick = () => {
    toast.success('Profile feature coming soon!', {
      description: 'Your Trinity Dodge profile will be available in the next update.',
      duration: 3000,
    });
  };
  
  return (
    <MotionButton 
      variant="ghost" 
      size="icon"
      onClick={handleProfileClick}
      className={cn(
        "rounded-full w-8 h-8 ml-1 transition-all",
        "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
        "hover:shadow-md hover:shadow-blue-500/20 hover:scale-110 active:scale-95",
        "border border-blue-400/30 glow-on-hover"
      )}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
    >
      <User className="h-4 w-4" />
    </MotionButton>
  );
};
