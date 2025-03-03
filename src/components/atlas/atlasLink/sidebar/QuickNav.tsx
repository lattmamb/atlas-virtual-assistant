
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, MessageSquare, Grid, Layers } from "lucide-react";

const QuickNav: React.FC = () => {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900">
        <Home className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900">
        <MessageSquare className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900">
        <Grid className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-gray-800 hover:bg-gray-900">
        <Layers className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuickNav;
