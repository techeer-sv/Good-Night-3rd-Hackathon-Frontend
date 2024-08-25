import React, { useState } from 'react';
import styled from 'styled-components';
import wishTreeImg from '../assets/wishTree-img.png'; // 배경 이미지
// 카테고리별 이미지 import
import careerImg from '../assets/career.png';
import healthImg from '../assets/health.png';
import relationshipImg from '../assets/relationship.png';
import moneyImg from '../assets/money.png';
import goalsImg from '../assets/goals.png';
import studyImg from '../assets/study.png';
import othersImg from '../assets/others.png';

// 카테고리별 이미지 매핑
const categoryImages = {
  CAREER: careerImg,
  HEALTH: healthImg,
  RELATIONSHIP: relationshipImg,
  MONEY: moneyImg,
  GOALS: goalsImg,
  STUDY: studyImg,
  OTHERS: othersImg
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
  justify-content: center;
  align-items: center;
  padding: 30px 20px 20px;
  color: white;
`;

const Dropdown = styled.select`
  margin-bottom: 25px;
  background-color: white; /* 배경색 흰색 */
  color: black; /* 글자색 검정색 */
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;

const WishesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 그리드 */
  justify-content: center; /* 그리드 항목을 컨테이너 내부에서 가운데 정렬 */
  gap: 15px;
  width: 50%;
  height: 80%;
  justify-items: center;
  align-content: space-around;
`;

const WishCard = styled.div`
  width: 152px; /* 고정된 너비 */
  height: 200px; /* 고정된 높이 */
  background: url(${(props) => categoryImages[props.category]}) no-repeat center center;
  background-size: cover;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  text-align: center;
  color: white;
`;

const Title = styled.h3`
  margin: 0;
  background: rgba(0, 0, 0, 0.6); /* 제목 배경색 */
  padding: 5px;
  border-radius: 4px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between; /* 양쪽 끝에 버튼 배치 */
  width: 1350px; /* 버튼들 사이의 공간 조절 */
  position: absolute; /* 위치 조정 */
  top: 50%; /* 화면 세로 중앙 */
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: white; /* 배경색 흰색 */
  color: black; /* 글자색 검정색 */
  border: 1px solid #ccc; /* 테두리 색상 */  cursor: pointer;
  font-size: 2rem;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #fffff; /* 비활성화 상태 배경색 */
    cursor: not-allowed;
  }
`;

// 더미 데이터
const dummyWishes = [
  { wishId: 1, title: "테커 가입", category: "CAREER", createdDate: "2024-08-24" },
  { wishId: 2, title: "백엔드 공부", category: "STUDY", createdDate: "2024-08-23" },
  { wishId: 3, title: "9만 전자 가자~", category: "MONEY", createdDate: "2024-08-22" },
  { wishId: 4, title: "잠만 자고싶다.", category: "OTHERS", createdDate: "2024-08-21" },
  { wishId: 5, title: "행복하자", category: "GOALS", createdDate: "2024-08-20" },
  { wishId: 6, title: "손절칠까요", category: "RELATIONSHIP", createdDate: "2024-08-19" },
  { wishId: 7, title: "3대 500", category: "HEALTH", createdDate: "2024-08-18" },
  { wishId: 8, title: "수능 공부", category: "STUDY", createdDate: "2024-08-17" }, 
  { wishId: 9, title: "1억 모으기", category: "MONEY", createdDate: "2024-08-16" },
];

const WishTree = () => {
  const [wishes, setWishes] = useState(dummyWishes); // 더미 데이터 사용
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1); // 더미 데이터이므로 페이지 수는 1로 고정
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리 상태

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === '') {
      setWishes(dummyWishes); // 카테고리가 선택되지 않았을 때 전체 데이터 표시
    } else {
      const filteredWishes = dummyWishes.filter(wish => wish.category === category);
      setWishes(filteredWishes);
    }
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
        {wishes.map((wish) => (
          <WishCard key={wish.wishId} category={wish.category}>
            <Title>{wish.title}</Title>
          </WishCard>
        ))}
      </WishesContainer>
      <Pagination>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          이전
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          다음
        </Button>
      </Pagination>
    </Container>
  );
};

export default WishTree;