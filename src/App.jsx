import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import WishTree from "./pages/WishTree";
import WishCreate from "./pages/WishCreate";
import WishDetail from "./pages/WishDetail";
import Admin from "./pages/admin";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<WishTree />} />
        <Route path="/create" element={<WishCreate />} />
        <Route path="/detail" element={<WishDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
