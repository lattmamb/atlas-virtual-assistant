
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Workflow, Plus } from "lucide-react";

const WorkflowDashboard = () => {
  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Workflow className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Automation Workflows</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center gap-2">
            <FileUp className="h-4 w-4" /> Import
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Workflow templates will go here */}
        <WorkflowCard 
          title="Text to Image" 
          description="Create images from text descriptions using AI" 
          isTemplate={true}
        />
        <WorkflowCard 
          title="Text to Video" 
          description="Generate videos from text prompts" 
          isTemplate={true}
        />
        <WorkflowCard 
          title="Image to 3D Model" 
          description="Convert images to 3D models" 
          isTemplate={true}
        />
        
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center p-6">
          <Button variant="ghost" className="h-full w-full flex flex-col items-center gap-3 py-8">
            <Plus className="h-8 w-8 text-muted-foreground" />
            <span className="text-muted-foreground">Create a new workflow</span>
          </Button>
        </Card>
      </div>
    </div>
  );
};

interface WorkflowCardProps {
  title: string;
  description: string;
  isTemplate?: boolean;
}

const WorkflowCard = ({ title, description, isTemplate = false }: WorkflowCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {isTemplate && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Template
            </span>
          )}
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mt-2">
          <Button variant="outline" size="sm" className="mr-2">
            Edit
          </Button>
          <Button size="sm">
            Run
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowDashboard;
