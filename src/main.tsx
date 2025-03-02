
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AtlasLinkPage from './pages/AtlasLink.tsx';
import './styles/index.css';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/atlas-link" element={<AtlasLinkPage />} />
    </Routes>
  </BrowserRouter>
);
