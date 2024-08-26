import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import WishTree from './pages/WishTree';
import AuthChangeButton from './components/AuthChangeButton';
import AddWish from './pages/AddWish';
import PrivateRoute from './components/PrivateRoute';
import WishFruit from './pages/WishFruit';
import WishApproval from './pages/WishApproval';

const App = () => {
  const initialRole = localStorage.getItem('authRole') || "User";
  const [authRole, setAuthRole] = useState(initialRole);
 // 권한 상태가 변경될 때마다 로컬 스토리지에 저장한다.
 useEffect(() => {
  localStorage.setItem('authRole', authRole);
  // storage 이벤트를 강제로 발생시켜 Navbar의 상태를 즉시 업데이트
  window.dispatchEvent(new Event('storage'));
}, [authRole]);

  const toggleAuthRole = () => {
    setAuthRole((prevRole) => (prevRole === "User" ? "Admin" : "User"));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WishTree />} />
        <Route path="/wish-fruit/:wishId" element={<WishFruit />} />
        <Route
          path="/wish-fruit/allow"
          element={
            <PrivateRoute
              element={<WishApproval />}
              currentRole={authRole}
              requiredRole="Admin"
            />
          }
        />
        <Route
          path="/Wish"
          element={
            <PrivateRoute
              element={<AddWish />}
              currentRole={authRole}
              requiredRole="User"
            />
          }
        />
      </Routes>
      <AuthChangeButton currentRole={authRole} toggleRole={toggleAuthRole} />
    </Router>
  );
};

export default App;
