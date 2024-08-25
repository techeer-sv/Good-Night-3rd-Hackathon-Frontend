import React from "react";
import styled from "styled-components";
import { fruit } from "../assets/image";

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
  return (
    <Container>
      <BackgroundImage src={fruit} alt="Background Fruit" />
      <Content>
        <Title>취업 잘 되게 해 주세요</Title>
        <Category>진로</Category>
        <Text>
          취업 하기 위해 여러 회사에 원서를 넣고 있습니다. 제발 취업 잘 되게 해
          주세요!!
        </Text>
      </Content>
    </Container>
  );
}

export default WishDetail;
