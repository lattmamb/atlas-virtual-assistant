
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppleVisionPro from './pages/AppleVisionPro';
import Atlas from './pages/Atlas';
import AtlasLink from './pages/AtlasLink';
import ChatRoom from './pages/ChatRoom';
import Settings from './pages/Settings';
import UniverseHome from './pages/UniverseHome';
import Workflows from './pages/Workflows';
import NotFound from './pages/NotFound';
import IOSHomeScreen from './pages/IOSHomeScreen';
import Trinity from './pages/Trinity';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<IOSHomeScreen />} />
        <Route path="/index" element={<IOSHomeScreen />} />
        <Route path="/universe" element={<UniverseHome />} />
        <Route path="/applevisionpro" element={<AppleVisionPro />} />
        <Route path="/atlas" element={<Atlas />} />
        <Route path="/atlaslink" element={<AtlasLink />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/trinity" element={<Trinity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
