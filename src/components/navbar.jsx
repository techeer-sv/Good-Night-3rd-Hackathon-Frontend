// components/Navbar.jsx
import React from 'react';
import '../styles/components/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>소원 나무 페이지</div>
            <a href="#">소원 열매 달기</a>
        </nav>
    );
};

export default Navbar;