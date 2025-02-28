
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
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
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
