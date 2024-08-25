import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 600px;
  height: 100vh;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: #ff7495;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

function WishCreate() {
  return (
    <Container>
      <Label>소원 제목</Label>
      <Input type="text" placeholder="소원 제목을 입력하세요" />

      <Label>소원 카테고리</Label>
      <Select>
        <option value="진로">진로</option>
        <option value="건강">건강</option>
        <option value="인간 관계">인간 관계</option>
        <option value="돈">돈</option>
        <option value="목표">목표</option>
        <option value="학업/성적">학업/성적</option>
        <option value="기타">기타</option>
      </Select>

      <Label>소원 본문</Label>
      <Textarea placeholder="소원 본문을 입력하세요" />

      <SubmitButton>소원 등록</SubmitButton>
    </Container>
  );
}

export default WishCreate;
