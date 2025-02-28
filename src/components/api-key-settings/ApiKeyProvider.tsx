
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ApiKeyProviderProps {
  providerId: string;
  providerName: string;
  keyValue: string;
  onKeyChange: (value: string) => void;
  placeholder?: string;
}

const ApiKeyProvider = ({
  providerId,
  providerName,
  keyValue,
  onKeyChange,
  placeholder = "",
}: ApiKeyProviderProps) => {
  const [showKey, setShowKey] = useState(false);

  const toggleShowKey = () => {
    setShowKey((prev) => !prev);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={providerId}>{providerName} API Key</Label>
      <div className="flex gap-2">
        <Input
          id={providerId}
          type={showKey ? "text" : "password"}
          placeholder={placeholder}
          value={keyValue || ""}
          onChange={(e) => onKeyChange(e.target.value)}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={toggleShowKey}
          type="button"
        >
          {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default ApiKeyProvider;
