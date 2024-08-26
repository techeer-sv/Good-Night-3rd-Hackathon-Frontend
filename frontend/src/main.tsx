import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import WishTreePage from './page/WishTreePage';
import WishAddPage from './page/WishAddPage';
import WishGetPage from './page/WishGetPage';
import WishConfirmPage from './page/WishConfirmPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WishTreePage />} /> {/* 기본 경로 */}
        <Route path="/add" element={<WishAddPage />} />
        <Route path="/get" element={<WishGetPage />} />
        <Route path="/confirm" element={<WishConfirmPage />} />
      </Routes>
    </Router>
  </StrictMode>,
);
