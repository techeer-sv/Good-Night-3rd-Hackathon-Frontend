import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WishListPage from './pages/WishListPage';
import WishDetailPage from './pages/WishDetailPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WishListPage />} />
        <Route path="/wish/:wishId" element={<WishDetailPage />} />
        {/* 필요에 따라 다른 경로와 페이지를 추가할 수 있습니다. */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
