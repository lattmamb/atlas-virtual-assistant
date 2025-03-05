
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import IOSHomeScreen from './pages/IOSHomeScreen';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="*" element={<IOSHomeScreen />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
