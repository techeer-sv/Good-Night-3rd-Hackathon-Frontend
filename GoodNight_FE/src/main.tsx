import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import MainPage from './components/mainPage/MainPage';
import WishPage from './components/wish/WishPage';
import WishFruit from './components/wishFruit/WishFruit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/wish" element={<WishPage />} />
        <Route path="/wish-fruit" element={<WishFruit />} />
      </Routes>
    </Router>
  </StrictMode>,
);
