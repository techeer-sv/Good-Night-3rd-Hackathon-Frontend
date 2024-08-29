import React from 'react';
import './App.css';

function App({ children }) {
  return (
    <>
      <main>
        {children}
      </main>
    </>
  );
}

export default App;