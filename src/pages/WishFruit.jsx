import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import wishTreeImg from '../assets/wishTree-img.png'; // 배경 이미지 import
import { dummyWishes } from '../data'; // 데이터 파일에서 import

// 카테고리별 한글 매핑
const categoryLabels = {
  CAREER: '진로',
  HEALTH: '건강',
  RELATIONSHIP: '인간관계',
  MONEY: '돈',
  GOALS: '목표',
  STUDY: '학업/성적',
  OTHERS: '기타'
};

// Styled components
const Container = styled.div`
  width: 100vw; /* 화면의 전체 너비 */
  height: 100vh; /* 화면의 전체 높이 */
  background-image: url(${wishTreeImg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
`;

const Content = styled.div`
  background: rgba(255, 255, 255, 0.8); /* 배경 색상과 투명도 조절 */
  color: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Category = styled.span`
  display: block;
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const WishFruit = () => {
  const { wishId } = useParams();
  const navigate = useNavigate();
  
  // 더미 데이터에서 wishId로 해당 소원 찾기
  const wish = dummyWishes.find(w => w.wishId === parseInt(wishId, 10));

  if (!wish) {
    return (
      <Container>
        <Content>
          <Title>소원을 찾을 수 없습니다.</Title>
          <Button onClick={() => navigate('/')}>메인 페이지로 돌아가기</Button>
        </Content>
      </Container>
    );
  }

  // 카테고리 값을 한글로 변환
  const categoryLabel = categoryLabels[wish.category] || '기타';

  const handleDelete = () => {
    // 실제로는 API 연동을 통해 소원 삭제 처리
    console.log(`소원 ${wishId} 삭제`);
    navigate('/');
  };

  return (
    <Container>
      <Content>
        <Title>{wish.title}</Title>
        <Category>{categoryLabel}</Category>
        <Text>소원 내용이 여기에 표시됩니다. (더미 데이터이므로 본문은 없음)</Text>
        <Button onClick={handleDelete}>소원 삭제</Button>
      </Content>
    </Container>
  );
};

export default WishFruit;
