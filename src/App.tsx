import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AtlasLink from './pages/AtlasLink';
import Workflows from './pages/Workflows';
import ChatRoom from './pages/ChatRoom';
import AppleVisionPro from './pages/AppleVisionPro';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useEffect(() => {
    // Optional: Add any global initialization or setup here
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster />
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/atlas-link" element={<AtlasLink />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/applevisionpro" element={<AppleVisionPro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
