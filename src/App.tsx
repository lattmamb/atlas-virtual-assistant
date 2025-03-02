
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/theme.css";
import { ChatProvider } from "./context/ChatContext";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Atlas from "./pages/Atlas";
import { Toaster } from "./components/ui/sonner";
import LoadingScreen from "./components/ui/LoadingScreen";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <ChatProvider>
        <LoadingScreen />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/atlas" element={<Atlas />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
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
