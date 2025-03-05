
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
import { ThemeProvider } from './context/ThemeContext';
import IOSLayout from './components/ios/IOSLayout';

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <Routes>
        {/* Main routes with the immersive IOSLayout */}
        <Route element={<IOSLayout />}>
          <Route path="/" element={<UniverseHome />} />
          <Route path="/index" element={<UniverseHome />} />
          <Route path="/applevisionpro" element={<AppleVisionPro />} />
          <Route path="/atlas" element={<Atlas />} />
          <Route path="/atlaslink" element={<AtlasLink />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/universe" element={<UniverseHome />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
