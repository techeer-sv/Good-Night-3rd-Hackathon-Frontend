import React, { useState } from 'react';
import styled from 'styled-components';
import addwishImg from '../assets/addwish.png'; // 배경 이미지
import { addWish } from '../api/AddWishApi'; // AddWishApi에서 함수 가져오기
import { useNavigate } from 'react-router-dom';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 20px;
  background-image: url(${addwishImg});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #ffffff;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 150px;
  font-size: 1rem;
  color: #fff;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
`;

const TextArea = styled.textarea`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  height: 100px;
  resize: vertical;
`;

const Select = styled.select`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
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

const WarningMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 20px;
`;

// AddWish component
const AddWish = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [warning, setWarning] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  const handleSubmit = async () => {
    if (!title || !category || !content) {
      setWarning('모든 항목을 입력해야 합니다.');
      return;
    }

    try {
      const result = await addWish(title, content, category);
      console.log('소원 등록 성공:', result);

      // 성공적으로 제출되었으면 입력값 초기화 및 경고 메시지 제거
      setTitle('');
      setCategory('');
      setContent('');
      setWarning('');
    } catch (error) {
      setWarning('소원 등록에 실패했습니다. 나중에 다시 시도해 주세요.');
    }

    navigate('/');

  };

  return (
    <Container>
      <Title>소원 열매 달기</Title>
      {warning && <WarningMessage>{warning}</WarningMessage>}
      
      <Row>
        <Label htmlFor="title">소원 제목</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="소원 제목을 입력하세요"
        />
      </Row>

      <Row>
        <Label htmlFor="category">소원 카테고리</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">선택하세요</option>
          <option value="진로">진로</option>
          <option value="건강">건강</option>
          <option value="인간 관계">인간 관계</option>
          <option value="돈">돈</option>
          <option value="목표">목표</option>
          <option value="학업/성적">학업/성적</option>
          <option value="기타">기타</option>
        </Select>
      </Row>

      <Row>
        <Label htmlFor="content">소원 본문</Label>
        <TextArea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="소원에 대한 자세한 내용을 입력하세요"
        />
      </Row>

      <Button onClick={handleSubmit}>소원 등록</Button>
    </Container>
  );
};

export default AddWish;
