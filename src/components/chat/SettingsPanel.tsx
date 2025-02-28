
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ApiKeyProvider } from "@/lib/types";

interface SettingsPanelProps {
  selectedProvider: ApiKeyProvider | null;
  setSelectedProvider: (provider: ApiKeyProvider | null) => void;
  availableProviders: ApiKeyProvider[];
}

const SettingsPanel = ({ selectedProvider, setSelectedProvider, availableProviders }: SettingsPanelProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">AI Provider</h3>
        {availableProviders.length > 0 ? (
          <select
            value={selectedProvider || ""}
            onChange={(e) => setSelectedProvider(e.target.value as ApiKeyProvider)}
            className="w-full p-2 text-sm rounded-md border"
          >
            <option value="" disabled>Select Provider</option>
            {availableProviders.map((provider) => (
              <option key={provider} value={provider}>
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-sm text-muted-foreground">
            No API keys found. Please add them in the settings page.
          </p>
        )}
      </div>
      
      <Button 
        onClick={() => navigate("/settings")} 
        className="w-full flex items-center gap-2"
      >
        <Settings size={14} />
        Manage API Keys
      </Button>
    </div>
  );
};

export default SettingsPanel;
