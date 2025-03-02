
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ChatProvider } from "./context/ChatContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import Index from "./pages/Index";
import Workflows from "./pages/Workflows";
import ChatRoom from "./pages/ChatRoom";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import AtlasLink from "./pages/AtlasLink";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext";

// Create a client
const queryClient = new QueryClient();

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  // This is just a placeholder, actual authentication will be implemented later
  const isAuthenticated = localStorage.getItem("atlas-auth") === "true";
  return isAuthenticated ? <>{element}</> : <Navigate to="/auth" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <ChatProvider>
              <main className="min-h-screen bg-background flex flex-col">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/workflows" element={<Workflows />} />
                  <Route path="/chat" element={<ChatRoom />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/atlas-link" element={<AtlasLink />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster position="top-right" />
              </main>
            </ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
