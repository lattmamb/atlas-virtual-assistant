
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ActiveInstructionCardProps {
  selectedInstruction: string | null;
  setSelectedInstruction: (instruction: string | null) => void;
}

const ActiveInstructionCard: React.FC<ActiveInstructionCardProps> = ({ 
  selectedInstruction, 
  setSelectedInstruction 
}) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-300">Active Instruction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-xs text-gray-400">
          {selectedInstruction ? `Using: ${selectedInstruction}` : 'No instruction selected'}
        </p>
        <Button 
          onClick={() => setSelectedInstruction(null)} 
          variant="outline" 
          size="sm"
          disabled={!selectedInstruction}
          className="w-full rounded-lg text-xs border-gray-800 hover:bg-gray-800"
        >
          Clear Instruction
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActiveInstructionCard;
