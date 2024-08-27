import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">Home</Link>
                <Link to="/wish-tree">Wish Tree</Link>
            </div>
            <div className="navbar-right">
                <button className="wish-button">소원 열매 달기</button>
            </div>
        </nav>
    );
};

export default Navbar;