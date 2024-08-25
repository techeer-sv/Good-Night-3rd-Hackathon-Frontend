import React from 'react';
import styled from 'styled-components';
import userIcon from '../assets/user-icon.png';
import adminIcon from '../assets/admin-icon.png';

// Styled component for the button
const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: #FFF;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1872F8;
  }
`;

const AuthChangeButton = ({ currentRole, toggleRole }) => {
  const iconSrc = currentRole === "User" ? userIcon : adminIcon;

  return (
    <Button onClick={toggleRole}>
      <img src={iconSrc} alt={currentRole} style={{ width: '30px', height: '30px' }} />
    </Button>
  );
};

export default AuthChangeButton;
