
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from '@/context/ThemeContext';

export interface SaveApiKeysButtonProps {
  onClick: () => void;
  isLoading?: boolean; // Make isLoading optional
  text?: string; // Add text prop and make it optional
}

const SaveApiKeysButton: React.FC<SaveApiKeysButtonProps> = ({ 
  onClick, 
  isLoading = false, // Default value
  text = "Save API Keys" // Default value
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="col-span-full mt-4 flex justify-end">
      <Button
        onClick={onClick}
        disabled={isLoading}
        className={cn(
          "px-6 py-2 transition-all",
          isDarkMode 
            ? "bg-blue-600 hover:bg-blue-700" 
            : "bg-blue-500 hover:bg-blue-600"
        )}
      >
        {isLoading ? (
          <>
            <span className="mr-2">Saving...</span>
            <span className="animate-spin">⟳</span>
          </>
        ) : (
          text
        )}
      </Button>
    </div>
  );
};

export default SaveApiKeysButton;
