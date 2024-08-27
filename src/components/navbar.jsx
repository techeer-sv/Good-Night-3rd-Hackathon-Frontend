import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const handleButtonClick = () => {
        window.location.href = '/wish'; // /wish 경로로 이동 (새로고침 발생)
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/">Home</a>
                <a href="/wish-tree">Wish Tree</a>
            </div>
            <div className="navbar-right">
                <button className="wish-button" onClick={handleButtonClick}>소원 열매 달기</button>
            </div>
        </nav>
    );
};

export default Navbar;