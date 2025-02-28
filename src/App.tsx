
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChatProvider } from "@/context/ChatContext";
import AtlasChatBot from "@/components/AtlasChatBot";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import WorkflowDashboard from "./components/workflow";
import WorkflowBuilder from "./components/workflow/WorkflowBuilder";

const queryClient = new QueryClient();

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChatProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/workflows" element={<WorkflowDashboard />} />
                <Route path="/workflows/builder" element={<WorkflowBuilder />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AtlasChatBot />
            </BrowserRouter>
          </div>
        </ChatProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
