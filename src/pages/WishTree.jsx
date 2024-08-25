import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import wishTreeImg from '../assets/wishTree-img.png'; // 배경 이미지
import careerImg from '../assets/career.png';
import healthImg from '../assets/health.png';
import relationshipImg from '../assets/relationship.png';
import moneyImg from '../assets/money.png';
import goalsImg from '../assets/goals.png';
import studyImg from '../assets/study.png';
import othersImg from '../assets/others.png';
import { getWishes } from '../api/WishTreeApi'; // 수정된 API 호출 함수

const categoryImages = {
  CAREER: careerImg,
  HEALTH: healthImg,
  RELATIONSHIP: relationshipImg,
  MONEY: moneyImg,
  GOALS: goalsImg,
  STUDY: studyImg,
  OTHERS: othersImg
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${wishTreeImg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 20px 20px;
  color: white;
`;

const Dropdown = styled.select`
  margin-bottom: 25px;
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;

const WishesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 15px;
  width: 50%;
  height: 80%;
  justify-items: center;
  align-content: space-around;
`;

const WishCard = styled(Link)`
  width: 152px;
  height: 200px;
  background: url(${(props) => categoryImages[props.category]}) no-repeat center center;
  background-size: cover;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  text-align: center;
  color: white;
  text-decoration: none;
`;

const Title = styled.h3`
  margin: 0;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px;
  border-radius: 4px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1350px;
  position: absolute;
  top: 50%;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 2rem;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const WishTree = () => {
  const [wishes, setWishes] = useState([]);
  const [filteredWishes, setFilteredWishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWishes(currentPage);
        setWishes(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching wishes:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredWishes(wishes);
    } else {
      setFilteredWishes(wishes.filter(wish => wish.category === selectedCategory));
    }
  }, [selectedCategory, wishes]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container>
      <Dropdown value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">전체 카테고리</option>
        <option value="CAREER">진로</option>
        <option value="HEALTH">건강</option>
        <option value="RELATIONSHIP">인간관계</option>
        <option value="MONEY">돈</option>
        <option value="GOALS">목표</option>
        <option value="STUDY">학업/성적</option>
        <option value="OTHERS">기타</option>
      </Dropdown>
      <WishesContainer>
        {filteredWishes.map((wish) => (
          <WishCard 
            key={wish.wishId} 
            category={wish.category} 
            to={`/wish-fruit/${wish.wishId}`}
          >
            <Title>{wish.title}</Title>
          </WishCard>
        ))}
      </WishesContainer>
      <Pagination>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          이전
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          다음
        </Button>
      </Pagination>
    </Container>
  );
};

export default WishTree;
