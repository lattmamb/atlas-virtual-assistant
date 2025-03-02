
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface SaveApiKeysButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

const SaveApiKeysButton = ({ isLoading, onClick }: SaveApiKeysButtonProps) => {
  return (
    <div className="mt-6">
      <Button onClick={onClick} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save API Keys"
        )}
      </Button>
    </div>
  );
};

export default SaveApiKeysButton;
