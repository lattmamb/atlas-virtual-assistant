
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import AITools from "./AITools";

interface ToolsPanelProps {
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
}

const ToolsPanel = ({ activeTool, setActiveTool }: ToolsPanelProps) => {
  const navigate = useNavigate();

  const handleToolClick = (toolName: string) => {
    setActiveTool(toolName === activeTool ? null : toolName);
    
    // Navigate to workflows page if the Workflows tool is clicked
    if (toolName === "Workflows") {
      navigate("/workflows");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {AITools.map((tool) => (
          <TooltipProvider key={tool.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={activeTool === tool.name ? "default" : "outline"} 
                  className="flex flex-col h-20 items-center justify-center gap-2 text-xs"
                  onClick={() => handleToolClick(tool.name)}
                >
                  {tool.icon}
                  {tool.name}
                </Button>
              </TooltipTrigger>
              {tool.name !== "Workflows" && (
                <TooltipContent>
                  <p>Coming soon</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      
      {activeTool && activeTool !== "Workflows" && (
        <div className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              {AITools.find(t => t.name === activeTool)?.icon}
              {activeTool}
            </h3>
            <Button size="sm" variant="ghost" onClick={() => setActiveTool(null)}>
              <X size={14} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            This feature is coming soon. Check back later!
          </p>
        </div>
      )}
    </div>
  );
};

export default ToolsPanel;
