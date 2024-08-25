// src/api/wishApi.js

import api from './api';

export const getWishes = async (page) => {
    try {
      const response = await api.get('/wishes', {
        params: {
          status: 'APPROVED', // 상태를 APPROVED로 고정
          page: page, // 동적으로 페이지 설정
          size: 9, // 고정된 사이즈
          sort: 'createdDate,desc' // 고정된 정렬
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching wishes:", error);
      throw error;
    }
  };