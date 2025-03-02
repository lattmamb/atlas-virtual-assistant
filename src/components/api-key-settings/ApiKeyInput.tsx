
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from '@/context/ThemeContext';

export interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  helpText?: string; // Make helpText optional
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  label,
  helpText
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>
        {label}
      </Label>
      
      <Input
        id={label.toLowerCase().replace(/\s+/g, '-')}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
      />
      
      {helpText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default ApiKeyInput;
