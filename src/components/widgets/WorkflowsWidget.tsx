
import React from 'react';
import { AppleWidget } from '@/components/icloud/AppleWidget';
import { Button } from '@/components/ui/button';
import { Workflow, Play, Pause, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const workflows = [
  { id: 1, name: "Lead Capture", status: "active", lastRun: "2 hours ago", description: "Captures leads from website forms and adds to CRM" },
  { id: 2, name: "TikTok Promo Generator", status: "paused", lastRun: "1 day ago", description: "Creates promotional TikTok videos for new inventory" },
  { id: 3, name: "Customer Follow-up", status: "active", lastRun: "30 minutes ago", description: "Sends follow-up emails to customers after visits" }
];

const WorkflowsWidget: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const handleToggleWorkflow = (id: number) => {
    const workflow = workflows.find(w => w.id === id);
    if (workflow) {
      toast.success(`${workflow.name} ${workflow.status === 'active' ? 'paused' : 'activated'}`, {
        description: `Workflow status updated successfully`
      });
    }
  };
  
  const handleNavigateToWorkflows = () => {
    navigate('/workflows');
  };

  return (
    <AppleWidget 
      title="Workflows"
      icon={<Workflow className="h-5 w-5 text-blue-400" />}
      className="row-span-1 md:col-span-2 glass"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium">Active Automations</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs flex items-center gap-1 h-7"
            onClick={() => toast.info("Create workflow", { duration: 1500 })}
          >
            <PlusCircle className="h-3 w-3" />
            Create New
          </Button>
        </div>
        
        <div className="space-y-3 mb-3">
          {workflows.map(workflow => (
            <div 
              key={workflow.id}
              className={cn(
                "p-3 rounded-lg transition-all",
                isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
              )}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    workflow.status === 'active' ? "bg-green-500" : "bg-amber-500"
                  )}></div>
                  <h4 className="font-medium text-sm">{workflow.name}</h4>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleToggleWorkflow(workflow.id)}
                >
                  {workflow.status === 'active' ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                {workflow.description}
              </p>
              
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-gray-500">Last run: {workflow.lastRun}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full",
                  workflow.status === 'active' 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-amber-500/20 text-amber-400"
                )}>
                  {workflow.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleNavigateToWorkflows}
        >
          Manage Workflows
        </Button>
      </div>
    </AppleWidget>
  );
};

export default WorkflowsWidget;
