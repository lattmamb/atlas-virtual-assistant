
import { Button } from "@/components/ui/button";

interface NoProviderMessageProps {
  onNavigateToSettings: () => void;
}

const NoProviderMessage = ({ onNavigateToSettings }: NoProviderMessageProps) => {
  return (
    <div className="text-center p-2">
      <p className="text-sm text-muted-foreground mb-2">
        Please add an API key in Settings to start chatting
      </p>
      <Button
        size="sm"
        onClick={onNavigateToSettings}
        className="w-full"
      >
        Go to Settings
      </Button>
    </div>
  );
};

export default NoProviderMessage;
