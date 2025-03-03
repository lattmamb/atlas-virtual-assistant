
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface VehicleActionsProps {
  modelName: string;
}

const VehicleActions: React.FC<VehicleActionsProps> = ({ modelName }) => {
  const handleScheduleTestDrive = () => {
    toast.success(`Test drive scheduled for ${modelName}`, {
      description: "A Trinity Dodge representative will contact you shortly."
    });
  };
  
  return (
    <div className="mt-auto flex space-x-2">
      <Button 
        variant="outline" 
        className="flex-1"
        onClick={() => toast.info(`View details for ${modelName}`, {
          description: "Opening vehicle details page..."
        })}
      >
        View Details
      </Button>
      <Button 
        className="flex-1"
        onClick={handleScheduleTestDrive}
      >
        Schedule Test Drive
      </Button>
    </div>
  );
};

export default VehicleActions;
