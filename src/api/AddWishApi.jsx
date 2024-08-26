// src/api/wishApi.js

import api from './api';

// 소원을 등록하는 함수
export const addWish = async (title, content, categoryName) => {
    try {
      const response = await api.post('/wishes', {
        title,
        content,
        categoryName // 요청 본문에 categoryName 추가
      });
  
      return response.data; // API 응답 데이터 반환
    } catch (error) {
      console.error('소원 등록 실패:', error);
      throw error; // 에러를 상위 함수로 전달
    }
  };