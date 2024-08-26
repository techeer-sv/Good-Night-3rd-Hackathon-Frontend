import api from './api';

// 소원 상세 정보를 가져오는 함수
export const getWishById = async (wishId) => {
    try {
      const response = await api.get(`wishes/${wishId}`);
      return response.data;
    } catch (error) {
      console.error('소원 상세 정보를 가져오는 데 실패했습니다:', error);
      throw error;
    }
  };
  
  // 소원을 삭제하는 함수
  export const deleteWishById = async (wishId) => {
    try {
      await api.delete(`wishes/${wishId}`);
    } catch (error) {
      console.error('소원 삭제에 실패했습니다:', error);
      throw error;
    }
  };