import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { tree, fruit } from "../assets/image";

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
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleWishClick = () => {
    navigate("/detail"); // 소원을 클릭하면 /detail 페이지로 이동
  };
  const wishes = [
    "취업 잘 되게 해 주세요",
    "여자친구 기원",
    "로또 1등 당첨!",
    "우리 가족 만수무강~",
    "부트캠프 1등하게 해 주세요...",
    "내일 수술 잘 마치길...",
    "9만전자 가자~!",
    "학점 4.2점 넘게 해 주세요",
    "우크라이나 전쟁 끝나게 해 주세요",
  ];

  return (
    <TreeContainer>
      <TreeImage src={tree} alt="Tree" />
      <OverlayContainer>
        <Dropdown>
          <option>전체</option>
          <option>진로</option>
          <option>건강</option>
          <option>인간 관계</option>
          <option>돈</option>
          <option>목표</option>
          <option>학업/성적</option>
          <option>기타</option>
        </Dropdown>
        <WishContainer>
          {wishes.map((wish, index) => (
            <WishItem key={index} onClick={handleWishClick}>
              <FruitImage src={fruit} alt="Fruit" />
              <WishText>{wish}</WishText>
            </WishItem>
          ))}
        </WishContainer>
      </OverlayContainer>
    </TreeContainer>
  );
};

export default App;
