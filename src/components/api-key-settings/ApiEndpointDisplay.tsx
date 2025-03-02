
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ApiEndpointDisplayProps {
  title: string;
  description: string;
  endpoint: string;
}

const ApiEndpointDisplay: React.FC<ApiEndpointDisplayProps> = ({ title, description, endpoint }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-3 rounded-md">
          <code className="text-sm">{endpoint}</code>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiEndpointDisplay;
