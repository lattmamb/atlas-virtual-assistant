
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKeyInputProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const ApiKeyInput = ({ 
  id, 
  label, 
  value, 
  placeholder, 
  onChange 
}: ApiKeyInputProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        type="password"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ApiKeyInput;
