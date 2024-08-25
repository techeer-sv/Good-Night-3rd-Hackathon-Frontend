import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchPendingWishes, approveWish, rejectWish } from '../api/WishApprovalApi';

// 소원 상태에 따른 색상 매핑
const statusColors = {
  PENDING: '#f39c12', // 보류
  APPROVED: '#2ecc71', // 승인
  REJECTED: '#e74c3c'  // 거절
};

// Styled components
const Container = styled.div`
  width: 100vw; /* 화면의 전체 너비 */
  height: 100vh; /* 화면의 전체 높이 */
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2rem;
  margin-top: 60px;
  color: black;
`;

const WishesList = styled.div`
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
`;

const WishItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const WishTitle = styled.span`
  font-size: 1.2rem;
  color: black;
`;

const Status = styled.span`
  background-color: ${(props) => statusColors[props.status] || '#bdc3c7'};
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 10px;

  &:first-child {
    background-color: #2ecc71; /* 승인 버튼 색상 */
    color: white;
  }

  &:last-child {
    background-color: #e74c3c; /* 거절 버튼 색상 */
    color: white;
  }
`;

// 스타일이 적용된 메시지 컴포넌트
const NoPendingWishesMessage = styled.p`
  color: black;
  font-size: 1rem;
`;

const WishApproval = () => {
  const [pendingWishes, setPendingWishes] = useState([]);

  useEffect(() => {
    const loadPendingWishes = async () => {
      try {
        const wishes = await fetchPendingWishes();
        setPendingWishes(wishes);
        console.log(wishes);
      } catch (error) {
        console.error('Failed to fetch pending wishes', error);
      }
    };

    loadPendingWishes();
  }, []);

  const handleApproval = async (wishId) => {
    try {
      await approveWish(wishId);
      setPendingWishes(prevWishes =>
        prevWishes.filter(wish => wish.wishId !== wishId)
      );
    } catch (error) {
      console.error('Failed to approve wish', error);
    }
  };

  const handleRejection = async (wishId) => {
    try {
      await rejectWish(wishId);
      setPendingWishes(prevWishes =>
        prevWishes.filter(wish => wish.wishId !== wishId)
      );
    } catch (error) {
      console.error('Failed to reject wish', error);
    }
  };

  return (
    <Container>
      <Title>소원 승인 페이지</Title>
      <WishesList>
        {pendingWishes.length > 0 ? (
          pendingWishes.map((wish) => (
            <WishItem key={wish.wishId}>
              <WishTitle>{wish.title}</WishTitle>
              <div>
                <Button onClick={() => handleApproval(wish.wishId)}>승인</Button>
                <Button onClick={() => handleRejection(wish.wishId)}>거절</Button>
              </div>
            </WishItem>
          ))
        ) : (
          <NoPendingWishesMessage>보류 상태의 소원이 없습니다.</NoPendingWishesMessage>
        )}
      </WishesList>
    </Container>
  );
};

export default WishApproval;
