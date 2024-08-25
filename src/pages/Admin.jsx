import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { checkBox, rejectBox } from "../assets/image"; // React 아이콘 사용
import { fetchPendingWishes, updateWishStatus } from "../apis/wishes";

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
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPendingWishes = async () => {
    try {
      const data = await fetchPendingWishes(0, 10); // API 호출
      setWishes(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingWishes();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateWishStatus(id, status); // API 호출
      loadPendingWishes(); // 상태 업데이트 후 목록 다시 로딩
    } catch (error) {
      console.error("Error updating wish status:", error);
    }
  };

  const handleApprove = (id) => {
    handleUpdateStatus(id, "CONFIRMED");
  };

  const handleReject = (id) => {
    handleUpdateStatus(id, "REJECTED");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Title>소원 열매 승인</Title>
      {wishes.length > 0 ? (
        wishes.map((wish) => (
          <WishItem key={wish.id}>
            <WishText>{wish.title}</WishText>
            <ButtonGroup>
              <ApproveButton onClick={() => handleApprove(wish.id)}>
                <ButtonImage src={checkBox} alt="Approve" />
              </ApproveButton>
              <RejectButton onClick={() => handleReject(wish.id)}>
                <ButtonImage src={rejectBox} alt="Reject" />
              </RejectButton>
            </ButtonGroup>
          </WishItem>
        ))
      ) : (
        <div>No pending wishes.</div>
      )}
    </Container>
  );
}

export default AdminPage;
