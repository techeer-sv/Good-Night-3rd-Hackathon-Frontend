import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled components for the Navbar
const NavbarContainer = styled.nav`
  width: 100%;
  background-color: #1872F8;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    color: #ddd;
  }
`;

const Navbar = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('authRole') || 'User');
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('authRole') || 'User');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <NavbarContainer>
      <Logo onClick={() => navigate("/")}>TeCheer Tree</Logo>
      <NavLinks>
        {userRole === 'Admin' ? (
          <NavLink onClick={() => navigate("/wish-fruit/allow")}>소원 열매 승인</NavLink>
        ) : (
          <NavLink onClick={() => navigate("/wish")}>소원 열매 달기</NavLink>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
