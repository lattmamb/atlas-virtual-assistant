
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  value,
  onChange,
  placeholder = "Enter API key",
  label
}) => {
  const [showKey, setShowKey] = React.useState(false);
  
  const toggleShowKey = () => setShowKey(!showKey);
  
  return (
    <div className="space-y-2">
      <Label htmlFor={`input-${label.replace(/\s+/g, '-').toLowerCase()}`}>{label}</Label>
      <div className="relative">
        <Input
          id={`input-${label.replace(/\s+/g, '-').toLowerCase()}`}
          type={showKey ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <button
          type="button"
          onClick={toggleShowKey}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2",
            "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",
            "focus:outline-none"
          )}
        >
          {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyInput;
