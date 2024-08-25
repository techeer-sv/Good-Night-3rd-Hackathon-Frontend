import React from 'react';
import styled from 'styled-components';
import userIcon from '../assets/user-icon.png';
import adminIcon from '../assets/admin-icon.png';

// Styled component for the button
const Button = styled.button`
  width: 50px; // 버튼의 너비
  height: 50px; // 버튼의 높이
  background-color: #FFF;
  border: none;
  border-radius: 50%; // 버튼을 동그랗게 만듭니다.
  color: white;
  font-size: 16px;
  cursor: pointer;
  position: fixed; // 화면의 고정된 위치에 배치합니다.
  bottom: 20px; // 화면 하단에서 20px 떨어진 위치에 배치합니다.
  right: 20px; // 화면 오른쪽에서 20px 떨어진 위치에 배치합니다.
  z-index: 1000; // 다른 요소보다 위에 표시되도록 설정합니다;
  display: flex; // 버튼 내 아이콘을 중앙에 배치합니다.
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1872F8;
  }
`;

const AuthChangeButton = ({ currentRole, toggleRole }) => {
    // 현재 역할에 따라 아이콘을 선택합니다.
    const iconSrc = currentRole === "User" ? userIcon : adminIcon;
  
    return (
      <Button onClick={toggleRole}>
        <img src={iconSrc} alt={currentRole} style={{ width: '30px', height: '30px' }} />
      </Button>
    );
  };
  
export default AuthChangeButton;
