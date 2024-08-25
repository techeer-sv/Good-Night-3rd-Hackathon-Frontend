import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { userButton, adminButton } from "../assets/image";
import App from "../App";

const UserButton = styled.img`
  position: absolute;
  bottom: 20px; /* 아래에서 20px 떨어진 위치 */
  right: 20px; /* 오른쪽에서 20px 떨어진 위치 */
  width: 50px; /* 버튼의 너비 */
  height: 50px; /* 버튼의 높이 */
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
  z-index: 2; /* 버튼이 다른 요소들 위에 나타나도록 설정 */
  transition: transform 0.3s ease; /* 마우스를 올릴 때의 애니메이션 */

  &:hover {
    transform: scale(1.1); /* 마우스를 올리면 버튼이 약간 커지도록 설정 */
  }
`;

const Header = styled.header`
  background-color: #ff7495;
  width: 100%;
  padding: 5px 10px;
  color: white;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommonButton = styled.button`
  background-color: #ff7495;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

function NavBar() {
  const [isAdminMode, setIsAdminMode] = useState(false); // 관리 모드 상태
  const [userButtonImage, setUserButtonImage] = useState(userButton);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAdminMode) {
      navigate("/admin");
    } else {
      navigate("/create");
    }
  };

  const handleUserButtonClick = () => {
    if (userButtonImage === userButton) {
      setIsAdminMode(true); // 관리 모드로 전환
      setUserButtonImage(adminButton);
      navigate("/admin");
    } else {
      setIsAdminMode(false); // 일반 모드로 전환
      setUserButtonImage(userButton);
      navigate("/");
    }
  };

  return (
    <>
      <Header>
        Techeer Tree
        {isAdminMode ? (
          <CommonButton onClick={handleButtonClick}>
            소원 승인 하기
          </CommonButton>
        ) : (
          <CommonButton onClick={handleButtonClick}>
            소원 열매 달기
          </CommonButton>
        )}
      </Header>
      <UserButton
        src={userButtonImage}
        alt="User Button"
        onClick={handleUserButtonClick}
      />
    </>
  );
}

export default NavBar;
