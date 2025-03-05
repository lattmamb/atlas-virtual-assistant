
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
import IOSLayout from './components/ios/IOSLayout';
import SplashCursor from './components/effects/SplashCursor';
import PageCarousel from './components/navigation/PageCarousel';
import { SparklesLoader } from './components/ui/sparkles-loader';
import { Squares } from './components/ui/squares-background';

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
      
      {/* Global background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SplashCursor 
          BACK_COLOR={{ r: 0.0, g: 0.0, b: 0.15 }}
          SPLAT_RADIUS={0.25}
          DENSITY_DISSIPATION={3.0}
          TRANSPARENT={true}
        />
        <Squares className="-z-10" />
      </div>
      
      {/* Loading screen */}
      {isLoading ? (
        <SparklesLoader />
      ) : (
        <Routes>
          {/* All routes use the IOSLayout without other background effects */}
          <Route element={<IOSLayout />}>
            <Route path="/" element={<UniverseHome />} />
            <Route path="/universe" element={<UniverseHome />} />
            <Route path="/applevisionpro" element={<AppleVisionPro />} />
            <Route path="/atlaslink" element={<AtlasLink />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
      
      {/* Add the PageCarousel navigation to all routes */}
      <PageCarousel />
    </ThemeProvider>
  );
}

export default App;
