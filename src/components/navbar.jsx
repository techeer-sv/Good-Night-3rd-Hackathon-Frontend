import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    // 로컬스토리지에서 권한을 불러와 초기 상태로 설정
    const [role, setRole] = useState(localStorage.getItem('userRole') || 'User');

    // 권한 변경 함수
    const toggleRole = () => {
        const newRole = role === 'User' ? 'Admin' : 'User';
        setRole(newRole);
        localStorage.setItem('userRole', newRole); // 로컬스토리지에 권한 저장
    };

    // 버튼 클릭 시 이동 경로 설정
    const handleButtonClick = () => {
        if (role === 'Admin') {
            window.location.href = '/wish-approval'; // 소원 열매 승인 경로로 이동
        } else {
            window.location.href = '/wish'; // 소원 열매 달기 경로로 이동
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/">Home</a>
                <a href="/wish-tree">Wish Tree</a>
            </div>
            <div className="navbar-right">
                <div className="toggle-container" onClick={toggleRole}>
                    <div className={`toggle-switch ${role === 'Admin' ? 'active' : ''}`}>
                        <span className="toggle-text">{role === 'Admin' ? 'Admin' : 'User'}</span>
                    </div>
                </div>
                <button className="wish-button" onClick={handleButtonClick}>
                    {role === 'Admin' ? '소원 열매 승인' : '소원 열매 달기'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;