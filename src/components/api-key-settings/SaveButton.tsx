
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  loading: boolean;
  onClick: () => void;
}

const SaveButton = ({ loading, onClick }: SaveButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-full"
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <span className="animate-pulse mr-2">Saving</span>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" /> Save API Keys
        </>
      )}
    </Button>
  );
};

export default SaveButton;
