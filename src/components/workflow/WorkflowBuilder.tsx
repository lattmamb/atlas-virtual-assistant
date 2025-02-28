
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftCircle, Code, FileText, Image, PenTool, Workflow, Bot, Save, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NODE_TYPES = [
  { id: 'trigger', name: 'Trigger', icon: <Bot className="h-4 w-4" /> },
  { id: 'text', name: 'Text Generation', icon: <FileText className="h-4 w-4" /> },
  { id: 'code', name: 'Code Assistant', icon: <Code className="h-4 w-4" /> },
  { id: 'image', name: 'Image Creation', icon: <Image className="h-4 w-4" /> },
  { id: 'draw', name: 'Drawing', icon: <PenTool className="h-4 w-4" /> },
  { id: 'workflow', name: 'Workflows', icon: <Workflow className="h-4 w-4" /> },
];

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    name: string;
    description?: string;
    configuration?: Record<string, any>;
  };
}

const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflowName, setWorkflowName] = useState('New Workflow');
  const [workflowDescription, setWorkflowDescription] = useState('');
  
  const handleAddNode = (type: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      position: { x: 200, y: 100 + nodes.length * 100 },
      data: {
        name: NODE_TYPES.find(t => t.id === type)?.name || '',
        description: '',
        configuration: {},
      }
    };
    
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
  };
  
  const handleUpdateNode = (id: string, data: any) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    ));
    
    if (selectedNode && selectedNode.id === id) {
      setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, ...data } });
    }
  };
  
  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    if (selectedNode && selectedNode.id === id) {
      setSelectedNode(null);
    }
  };
  
  const handleSaveWorkflow = () => {
    console.log('Saving workflow:', { name: workflowName, description: workflowDescription, nodes });
    // Here we would save to database
    navigate('/workflows');
  };
  
  return (
    <div className="flex h-full">
      {/* Left sidebar - Node types */}
      <div className="w-64 border-r bg-card p-4">
        <h2 className="text-lg font-medium mb-4">Node Types</h2>
        <div className="space-y-2">
          {NODE_TYPES.map(type => (
            <Button
              key={type.id}
              variant="outline"
              className="w-full justify-start"
              onClick={() => handleAddNode(type.id)}
            >
              <span className="mr-2">{type.icon}</span>
              {type.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Center - Canvas */}
      <div className="flex-1 bg-slate-50 p-6 overflow-auto">
        <div className="mb-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate('/workflows')}>
            <ArrowLeftCircle className="mr-2 h-4 w-4" />
            Back to Workflows
          </Button>
          <div>
            <Button onClick={handleSaveWorkflow} className="gap-2">
              <Save className="h-4 w-4" />
              Save Workflow
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-xl font-semibold mb-2"
            placeholder="Workflow Name"
          />
          <Textarea
            value={workflowDescription}
            onChange={(e) => setWorkflowDescription(e.target.value)}
            placeholder="Describe what this workflow does..."
            className="h-20"
          />
        </div>
        
        <div className="min-h-[500px] border rounded-lg bg-white p-4 relative">
          {nodes.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col">
              <Plus className="h-12 w-12 mb-2" />
              <p>Add a node from the left sidebar to start building your workflow</p>
            </div>
          ) : (
            <div className="space-y-4">
              {nodes.map(node => (
                <Card 
                  key={node.id}
                  className={`cursor-pointer ${selectedNode?.id === node.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedNode(node)}
                >
                  <CardHeader className="p-4 flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle className="text-md flex items-center gap-2">
                        {NODE_TYPES.find(t => t.id === node.type)?.icon}
                        {node.data.name}
                      </CardTitle>
                      {node.data.description && (
                        <CardDescription>{node.data.description}</CardDescription>
                      )}
                    </div>
                    <Button
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNode(node.id);
                      }}
                    >
                      Remove
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Right sidebar - Node configuration */}
      <div className="w-80 border-l bg-card p-4">
        {selectedNode ? (
          <div>
            <h2 className="text-lg font-medium mb-4">Configure Node</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={selectedNode.data.name}
                  onChange={(e) => handleUpdateNode(selectedNode.id, { name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={selectedNode.data.description || ''}
                  onChange={(e) => handleUpdateNode(selectedNode.id, { description: e.target.value })}
                  className="h-20"
                />
              </div>
              {/* Additional configuration fields would go here based on node type */}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
            <Workflow className="h-16 w-16 mb-4" />
            <p>Select a node to configure it</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilder;
