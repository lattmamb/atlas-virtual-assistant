
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import Features from './pages/Features';
import AppleVisionPro from './pages/AppleVisionPro';
import Atlas from './pages/Atlas';
import AtlasLink from './pages/AtlasLink';
import ChatRoom from './pages/ChatRoom';
import Settings from './pages/Settings';
import UniverseHome from './pages/UniverseHome';
import Workflows from './pages/Workflows';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Features />} />
        <Route path="/applevisionpro" element={<AppleVisionPro />} />
        <Route path="/atlas" element={<Atlas />} />
        <Route path="/atlaslink" element={<AtlasLink />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/universe" element={<UniverseHome />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
