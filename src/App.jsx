import React from 'react';
import Navbar from './components/Navbar'; // Navbar 컴포넌트 import
import './App.css';

function App({ children }) {
  return (
    <>
      <Navbar /> {/* 네비게이션 바 추가 */}
      <main>
        {children}
      </main>
    </>
  );
}

export default App;