import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fruit } from "../assets/image";
import { useParams } from "react-router-dom";
import { getWishById } from "../apis/wishes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #f8f8f8;
  position: relative;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: auto;
  opacity: 0.3;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin-left: 50px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Category = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
`;

function WishDetail() {
  const { id } = useParams(); // Extract the wish ID from the URL
  const [wish, setWish] = useState(null); // State to store the wish details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchWishDetails = async () => {
      try {
        const data = await getWishById(id); // API 호출
        setWish(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchWishDetails(); // Fetch wish details on component mount
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <BackgroundImage src={fruit} alt="Background Fruit" />
      {wish && (
        <Content>
          <Title>{wish.title}</Title>
          <Category>{wish.category}</Category>
          <Text>{wish.content}</Text>
        </Content>
      )}
    </Container>
  );
}

export default WishDetail;
