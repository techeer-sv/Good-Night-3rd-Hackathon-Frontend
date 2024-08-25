import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import MainPage from './components/mainPage/MainPage';
import WishPage from './components/wish/WishPage';
import WishFruit from './components/wishFruit/WishFruit';
import AllowPage from './components/allow/AllowPage';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'User']}>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wish"
            element={
              <ProtectedRoute allowedRoles={['User']}>
                <WishPage />
              </ProtectedRoute>
            }
          />
          <Route />
          <Route
            path="/wish-fruit"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'User']}>
                <WishFruit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wish-fruit/allow"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AllowPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  </StrictMode>,
);
