
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SaveApiKeysButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const SaveApiKeysButton: React.FC<SaveApiKeysButtonProps> = ({
  onClick,
  isLoading
}) => {
  return (
    <Card className="shadow-sm col-span-full md:col-span-2">
      <CardContent className="pt-6">
        <Button 
          onClick={onClick} 
          className={cn(
            "w-full bg-blue-600 hover:bg-blue-700 text-white",
            "transition-all duration-300"
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save API Keys'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SaveApiKeysButton;
