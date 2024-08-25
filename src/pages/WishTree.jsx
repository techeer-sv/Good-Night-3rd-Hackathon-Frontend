import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { tree, fruit } from "../assets/image";
import { fetchWishesByCategory } from "../apis/wishes";

const TreeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  height: 100vh; /* 전체 화면 높이를 차지하도록 설정 */
  overflow: hidden; /* 자식 요소가 넘칠 때 숨기도록 설정 */
`;

const TreeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* 이미지를 컨테이너에 맞게 조정 */
`;

const OverlayContainer = styled.div`
  position: absolute;
  inset: 0; /* 부모 컨테이너의 모든 면에 걸쳐 배치 (top, right, bottom, left 모두 0) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 요소들을 위쪽에 정렬 */
  z-index: 1; /* 이미지 위에 오도록 설정 */
`;

const Dropdown = styled.select`
  margin-top: 10px;
  margin-bottom: 40px;
  margin-left: 400px; /* 오른쪽으로 이동 */
  padding: 7px;
  font-size: 16px;
  width: 8%; /* 드롭다운 너비를 적절히 조정 */
`;

const WishContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3x3 그리드 */
  grid-gap: 50px; /* 그리드 아이템 간의 간격 */
`;

const WishItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FruitImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%; /* 원형 이미지로 만들기 위해 */
  object-fit: cover; /* 이미지를 컨테이너에 맞게 조정 */
`;

const WishText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
`;

const App = () => {
  const navigate = useNavigate();
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("전체");
  const [page, setPage] = useState(0);
  const [size] = useState(9);

  useEffect(() => {
    const loadWishes = async () => {
      try {
        const data = await fetchWishesByCategory(category, page, size);
        setWishes(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadWishes();
  }, [category, page, size]);

  const handleWishClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <TreeContainer>
      <TreeImage src={tree} alt="Tree" />
      <OverlayContainer>
        <Dropdown value={category} onChange={handleCategoryChange}>
          <option value="전체">전체</option>
          <option value="진로">진로</option>
          <option value="건강">건강</option>
          <option value="인간 관계">인간 관계</option>
          <option value="돈">돈</option>
          <option value="목표">목표</option>
          <option value="학업/성적">학업/성적</option>
          <option value="기타">기타</option>
        </Dropdown>
        <WishContainer>
          {Array.isArray(wishes) && wishes.length > 0 ? (
            wishes.map((wish, index) => (
              <WishItem key={index} onClick={() => handleWishClick(wish.id)}>
                <FruitImage src={fruit} alt="Fruit" />
                <WishText>{wish.title}</WishText>
              </WishItem>
            ))
          ) : (
            <div>No wishes found.</div>
          )}
        </WishContainer>
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <span> Page {page + 1} </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={wishes.length < size} // 다음 페이지로 갈 수 없으면 버튼 비활성화
          >
            Next
          </button>
        </div>
      </OverlayContainer>
    </TreeContainer>
  );
};

export default App;
