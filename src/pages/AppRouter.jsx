import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/App';
import WishTree from './WishTree';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<WishTree/>} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;