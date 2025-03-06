
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Suspense, useState, useEffect } from 'react';
import AppleVisionPro from './pages/AppleVisionPro';
import AtlasLink from './pages/AtlasLink';
import ChatRoom from './pages/ChatRoom';
import Settings from './pages/Settings';
import UniverseHome from './pages/UniverseHome';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './components/HomeScreen';
import { SparklesLoader } from './components/ui/sparkles-loader';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time when route changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      
      {/* Loading screen */}
      {isLoading ? (
        <SparklesLoader />
      ) : (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/universe" element={<UniverseHome />} />
          <Route path="/applevisionpro" element={<AppleVisionPro />} />
          <Route path="/atlaslink" element={<AtlasLink />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
