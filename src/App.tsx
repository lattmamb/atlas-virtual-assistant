
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/theme.css";
import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Workflows from "./pages/Workflows";
import AtlasLink from "./pages/AtlasLink";
import ChatRoom from "./pages/ChatRoom";
import { Toaster } from "./components/ui/sonner";
import LoadingScreen from "./components/ui/LoadingScreen";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <ChatProvider>
        <LoadingScreen />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/atlas-link" element={<AtlasLink />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster richColors position="top-center" />
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
