
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
import PerspectivePageLayout from './components/layout/PerspectivePageLayout';

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
          <Route path="/universe" element={
            <PerspectivePageLayout title="Universe">
              <UniverseHome />
            </PerspectivePageLayout>
          } />
          <Route path="/applevisionpro" element={
            <PerspectivePageLayout title="Apple Vision Pro">
              <AppleVisionPro />
            </PerspectivePageLayout>
          } />
          <Route path="/atlaslink" element={
            <PerspectivePageLayout title="Atlas Link">
              <AtlasLink />
            </PerspectivePageLayout>
          } />
          <Route path="/chatroom" element={
            <PerspectivePageLayout title="Chat Room">
              <ChatRoom />
            </PerspectivePageLayout>
          } />
          <Route path="/settings" element={
            <PerspectivePageLayout title="Settings">
              <Settings />
            </PerspectivePageLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
