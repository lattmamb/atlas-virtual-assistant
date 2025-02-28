
import React, { useState } from "react";
import { 
  ArrowLeft, Save, Play, Plus, Settings, 
  Trash2, MoveHorizontal, FileText, Image, Video, 
  Box, Cube, Workflow as WorkflowIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define types for our workflow nodes
interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
}

interface Connection {
  id: string;
  source: string;
  target: string;
}

const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Node categories for the sidebar
  const nodeCategories = [
    {
      name: "Triggers",
      nodes: [
        { type: "webhook", label: "Webhook", icon: <WorkflowIcon size={16} /> },
        { type: "schedule", label: "Schedule", icon: <WorkflowIcon size={16} /> },
      ]
    },
    {
      name: "Actions",
      nodes: [
        { type: "text-to-image", label: "Text to Image", icon: <Image size={16} /> },
        { type: "text-to-video", label: "Text to Video", icon: <Video size={16} /> },
        { type: "image-to-video", label: "Image to Video", icon: <Video size={16} /> },
        { type: "text-to-3d", label: "Text to 3D", icon: <Cube size={16} /> },
        { type: "image-to-3d", label: "Image to 3D", icon: <Box size={16} /> },
      ]
    },
    {
      name: "Logic",
      nodes: [
        { type: "if", label: "If Condition", icon: <WorkflowIcon size={16} /> },
        { type: "switch", label: "Switch", icon: <WorkflowIcon size={16} /> },
      ]
    }
  ];

  const addNode = (type: string) => {
    const newNode: WorkflowNode = {
      id: `node_${Date.now()}`,
      type,
      position: { x: 100, y: 100 + nodes.length * 100 },
      data: {}
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left sidebar with node types */}
      <div className="w-64 border-r bg-card p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/workflows")}
            className="h-8 w-8"
          >
            <ArrowLeft size={16} />
          </Button>
          <h2 className="text-lg font-semibold">Workflow Builder</h2>
        </div>
        
        <Tabs defaultValue="nodes">
          <TabsList className="w-full">
            <TabsTrigger value="nodes" className="flex-1">Nodes</TabsTrigger>
            <TabsTrigger value="connections" className="flex-1">Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nodes" className="space-y-4 mt-4">
            {nodeCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{category.name}</h3>
                <div className="space-y-1">
                  {category.nodes.map((node) => (
                    <Button
                      key={node.type}
                      variant="ghost"
                      className="w-full justify-start text-xs h-8"
                      onClick={() => addNode(node.type)}
                    >
                      <span className="mr-2">{node.icon}</span>
                      {node.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="connections">
            <div className="p-4 text-center text-sm text-muted-foreground">
              Connection settings will appear here
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Main workflow canvas */}
      <div className="flex-1 bg-slate-50 relative overflow-auto">
        <div className="absolute inset-0 grid grid-cols-[repeat(50,20px)] grid-rows-[repeat(50,20px)] opacity-30">
          {Array.from({ length: 50 }).map((_, y) => (
            Array.from({ length: 50 }).map((_, x) => (
              <div 
                key={`${x}-${y}`} 
                className="w-5 h-5 border-[0.5px] border-slate-200"
              />
            ))
          ))}
        </div>
        
        <div className="absolute inset-0 p-4">
          {/* This is where we'd render our node components */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute p-4 bg-white rounded-lg shadow-md border ${
                selectedNode === node.id ? 'border-primary' : 'border-slate-200'
              }`}
              style={{ 
                left: `${node.position.x}px`, 
                top: `${node.position.y}px`,
                width: '180px',
              }}
              onClick={() => setSelectedNode(node.id)}
            >
              <div className="text-sm font-medium mb-2 flex items-center">
                {node.type === 'text-to-image' && <Image size={14} className="mr-2" />}
                {node.type === 'text-to-video' && <Video size={14} className="mr-2" />}
                {node.type === 'text-to-3d' && <Cube size={14} className="mr-2" />}
                {node.type === 'image-to-video' && <Video size={14} className="mr-2" />}
                {node.type === 'image-to-3d' && <Box size={14} className="mr-2" />}
                {node.type === 'webhook' && <WorkflowIcon size={14} className="mr-2" />}
                {node.type === 'schedule' && <WorkflowIcon size={14} className="mr-2" />}
                {node.type === 'if' && <WorkflowIcon size={14} className="mr-2" />}
                {node.type === 'switch' && <WorkflowIcon size={14} className="mr-2" />}
                {node.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Node ID: {node.id.substring(0, 5)}...</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right sidebar for node properties */}
      <div className="w-72 border-l bg-card p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        {selectedNode ? (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Edit the properties of the selected node
            </p>
            <div className="space-y-4">
              {/* Node properties would go here */}
              <p className="text-xs text-muted-foreground">
                Node settings coming soon...
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a node to edit its properties
          </p>
        )}
      </div>
      
      {/* Toolbar at the top */}
      <div className="absolute top-0 left-64 right-72 h-12 border-b flex items-center justify-between px-4 bg-white/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Save size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save workflow</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Play size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Run workflow</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">Untitled Workflow</Button>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Workflow settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
