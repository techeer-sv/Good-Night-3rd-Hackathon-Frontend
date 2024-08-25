import React, { useState } from "react";
import styled from "styled-components";
import { checkBox, rejectBox } from "../assets/image"; // React 아이콘 사용

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 0px;
`;

const WishItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -20px;
`;

const WishText = styled.p`
  font-size: 18px;
  flex: 1;
  margin-right: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ApproveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  display: flex;
  align-items: center;
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }
`;

const RejectButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonImage = styled.img`
  width: 30px;
  height: 30px;
`;

function AdminPage() {
  const [wishes, setWishes] = useState([
    "내일 면접 잘 보게 해 주세요!",
    "돈 잘 벌게 해 주세요~",
    "내일 고백 성공 하길..",
    "우리 가족 항상 건강!",
  ]);

  const handleApprove = (index) => {
    // 승인 버튼 클릭 시 처리 로직
    console.log(`Wish ${index + 1} approved`);
  };

  const handleReject = (index) => {
    // 거부 버튼 클릭 시 처리 로직
    console.log(`Wish ${index + 1} rejected`);
  };

  return (
    <Container>
      <Title>소원 열매 승인</Title>
      {wishes.map((wish, index) => (
        <WishItem key={index}>
          <WishText>{wish}</WishText>
          <ButtonGroup>
            <ApproveButton onClick={() => handleApprove(index)}>
              <ButtonImage src={checkBox} alt="Approve" />
            </ApproveButton>
            <RejectButton onClick={() => handleReject(index)}>
              <ButtonImage src={rejectBox} alt="Reject" />
            </RejectButton>
          </ButtonGroup>
        </WishItem>
      ))}
    </Container>
  );
}

export default AdminPage;
