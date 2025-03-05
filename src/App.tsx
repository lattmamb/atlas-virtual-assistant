
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import IOSHomeScreen from './pages/IOSHomeScreen';
import { ThemeProvider } from './context/ThemeContext';
import { PanelProvider } from './contexts/PanelContext';
import SwipeContainer from './components/Layouts/SwipeContainer';

function App() {
  return (
    <ThemeProvider>
      <PanelProvider>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="*" element={<IOSHomeScreen />} />
        </Routes>
      </PanelProvider>
    </ThemeProvider>
  );
}

export default App;
