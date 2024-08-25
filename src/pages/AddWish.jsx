import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px; /* 컨테이너의 최대 너비를 900px로 설정 */
  margin: 0 auto;
  padding: 40px 20px; /* 위아래 패딩을 40px로 설정하고 좌우는 20px로 설정 */
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 150px; /* 라벨의 너비를 150px로 설정 */
  font-size: 1rem;
  color: #333;
  font-weight: bold; /* 글자를 굵게 설정 */
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff; /* 흰색 배경 */
  color: #333; /* 텍스트 색상 */
`;

const TextArea = styled.textarea`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff; /* 흰색 배경 */
  color: #333; /* 텍스트 색상 */
  height: 100px; /* 텍스트 영역의 높이를 100px로 설정 */
  resize: vertical;
`;

const Select = styled.select`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff; /* 흰색 배경 */
  color: #333; /* 텍스트 색상 */
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

  const handleSubmit = () => {
    if (!title || !category || !content) {
      setWarning('모든 항목을 입력해야 합니다.');
      return;
    }

    // API 연동 부분은 나중에 추가할 예정입니다.
    // 예: axios.post('/api/wishes', { title, category, content });

    // 성공적으로 제출되었으면 입력값 초기화 및 경고 메시지 제거
    setTitle('');
    setCategory('');
    setContent('');
    setWarning('');
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
          <option value="CAREER">진로</option>
          <option value="HEALTH">건강</option>
          <option value="RELATIONSHIP">인간관계</option>
          <option value="MONEY">돈</option>
          <option value="GOALS">목표</option>
          <option value="STUDY">학업/성적</option>
          <option value="OTHERS">기타</option>
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
