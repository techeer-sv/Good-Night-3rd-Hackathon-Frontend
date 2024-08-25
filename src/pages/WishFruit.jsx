import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import wishTreeImg from '../assets/wishTree-img.png'; // 배경 이미지 import
import { getWishById, deleteWishById } from '../api/WishFruitApi'; // API 호출 함수 import

// Styled components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
  background: rgba(255, 255, 255, 0.8);
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
  const [wish, setWish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWish = async () => {
      try {
        const wishData = await getWishById(wishId);
        setWish(wishData);
        setLoading(false);
      } catch (error) {
        setError('소원 정보를 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchWish();
  }, [wishId]);

  const handleDelete = async () => {
    try {
      await deleteWishById(wishId);
      navigate('/');
    } catch (error) {
      setError('소원 삭제에 실패했습니다. 나중에 다시 시도해 주세요.');
    }
  };

  if (loading) {
    return (
      <Container>
        <Content>
          <Title>로딩 중...</Title>
        </Content>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Content>
          <Title>{error}</Title>
          <Button onClick={() => navigate('/')}>메인 페이지로 돌아가기</Button>
        </Content>
      </Container>
    );
  }

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

  return (
    <Container>
      <Content>
        <Title>{wish.title}</Title>
        <Category>{wish.category}</Category> {/* 카테고리 값을 직접 표시 */}
        <Text>{wish.content}</Text>
        <Button onClick={handleDelete}>소원 삭제</Button>
      </Content>
    </Container>
  );
};

export default WishFruit;
