import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // react-router-dom을 사용하여 페이지 네비게이션을 구현할 수 있습니다.

// Styled components for the Navbar
const NavbarContainer = styled.nav`
  width: 100%;
  background-color: #1872F8;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-sizing: border-box; // 패딩과 보더가 총 폭에 포함되도록 설정합니다.
  position: fixed; // 스크롤 시에도 고정되도록 설정합니다.
  top: 0; // 화면 상단에 위치하도록 설정합니다.
  left: 0; // 왼쪽 끝에 위치하도록 설정합니다.
  z-index: 1000; // 다른 요소보다 위에 표시되도록 설정합니다.
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
  const navigate = useNavigate(); // react-router-dom의 useNavigate 훅을 사용하여 페이지 전환을 처리합니다.

  return (
    <NavbarContainer>
      <Logo onClick={() => navigate("/")}>TeCheer Tree</Logo> {/* 로고 클릭 시 홈으로 이동 */}
      <NavLinks>
        <NavLink href="#home">소원 열매 달기</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
