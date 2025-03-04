
import { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import "./styles/theme.css";
import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider } from "./context/ThemeContext";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Atlas from "./pages/Atlas";
import AtlasLink from "./pages/AtlasLink";
import ChatRoom from "./pages/ChatRoom";
import Workflows from "./pages/Workflows";
import { Toaster } from "./components/ui/sonner";
import LoadingScreen from "./components/ui/LoadingScreen";
import { AnimatePresence } from "framer-motion";
import { PipManager } from "./components/ui/pip-manager";
import UnifiedPage from "./pages/UnifiedPage"; // Our new unified page
import AppleVisionPro from "./pages/AppleVisionPro"; // Keep for backward compatibility

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Define available pages for the PIP manager
  const availablePages = [
    { id: "home", title: "Home", url: "/" },
    { id: "settings", title: "Settings", url: "/settings" },
    { id: "atlas", title: "Atlas", url: "/atlas" },
    { id: "atlas-link", title: "Atlas Link", url: "/atlas-link" },
    { id: "chat", title: "Chat Room", url: "/chat" },
    { id: "workflows", title: "Workflows", url: "/workflows" },
    { id: "vision-pro", title: "Vision Pro", url: "/applevisionpro" },
  ];

  return (
    <ThemeProvider>
      <ChatProvider>
        <LoadingScreen />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<UnifiedPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/atlas" element={<Atlas />} />
            <Route path="/atlas-link" element={<AtlasLink />} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/applevisionpro" element={<AppleVisionPro />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        
        {/* Global PIP Manager */}
        <PipManager availablePages={availablePages} />
        
        <Toaster 
          richColors 
          position="top-center" 
          closeButton
          toastOptions={{
            className: "frosted-glass",
            style: {
              borderRadius: '12px',
            }
          }}
        />
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
