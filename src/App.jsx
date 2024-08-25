import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import Navbar from './components/Navbar';
import WishTree from './pages/WishTree'
import AuthChangeButton from './components/AuthChangeButton';

const App = () => {
  const [authRole, setAuthRole] = useState("User"); // 인증 상태를 관리하는 상태

  const toggleAuthRole = () => {
    setAuthRole((prevRole) => (prevRole === "User" ? "Admin" : "User"));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WishTree />} />
      </Routes>
      <AuthChangeButton currentRole={authRole} toggleRole={toggleAuthRole} />
    </Router>
  );
};

export default App
