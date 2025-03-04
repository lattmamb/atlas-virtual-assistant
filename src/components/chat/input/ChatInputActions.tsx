
import { Button } from "@/components/ui/button";
import { Mic, PlusCircle, Image, Send, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatInputActionsProps {
  input: string;
  isLoading: boolean;
  selectedProvider: string | null;
  aiMode: 'atlas' | 'grok';
  onSubmit: () => void;
}

const ChatInputActions = ({ 
  input, 
  isLoading, 
  selectedProvider,
  aiMode,
  onSubmit 
}: ChatInputActionsProps) => {
  const isEmpty = !input.trim();
  
  return (
    <div className="flex items-center p-3 pt-0 justify-between">
      <div className="flex items-center gap-1">
        <div className="text-xs text-muted-foreground italic">
          {selectedProvider ? 
            `Using ${selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}` : 
            "Select a provider above"}
        </div>
        
        {isLoading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="ml-1"
          >
            {aiMode === "atlas" ? (
              <Sparkles className="h-3 w-3 text-blue-400" />
            ) : (
              <Zap className="h-3 w-3 text-purple-400" />
            )}
          </motion.div>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        {isEmpty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1"
          >
            <Button 
              type="button" 
              size="icon" 
              variant="ghost"
              className="h-8 w-8 rounded-full"
              disabled={isLoading || !selectedProvider}
            >
              <Image className="h-4 w-4 text-muted-foreground" />
            </Button>
            
            <Button 
              type="button" 
              size="icon" 
              variant="ghost"
              className="h-8 w-8 rounded-full"
              disabled={isLoading || !selectedProvider}
            >
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </Button>
            
            <Button 
              type="button" 
              size="icon" 
              variant="ghost"
              className="h-8 w-8 rounded-full"
              disabled={isLoading || !selectedProvider}
            >
              <Mic className="h-4 w-4 text-muted-foreground" />
            </Button>
          </motion.div>
        )}
        
        <Button 
          type="submit" 
          size="sm" 
          className={cn(
            "ml-auto gap-1.5",
            !isEmpty 
              ? aiMode === "atlas" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
              : "bg-muted text-muted-foreground"
          )}
          disabled={isEmpty || isLoading || !selectedProvider}
          onClick={onSubmit}
        >
          Send
          <Send className="size-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInputActions;
