import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import MainPage from './components/mainPage/MainPage';
import WishPage from './components/wish/WishPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/wish" element={<WishPage />} />
      </Routes>
    </Router>
  </StrictMode>,
);
