import api from './api';

// 보류 중인 소원 목록 가져오기
export const fetchPendingWishes = async () => {
    try {
      const response = await api.get(`wishes/pending`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch pending wishes', error);
      throw error;
    }
  };

// 소원 승인
export const approveWish = async (wishId) => {
    try {
      await api.patch(`wishes/${wishId}/status`, null, {
        params: { description: '승인됨' }
      });
    } catch (error) {
      console.error('Failed to approve wish', error);
      throw error;
    }
  };
  
  // 소원 거절
  export const rejectWish = async (wishId) => {
    try {
      await api.patch(`wishes/${wishId}/status`, null, {
        params: { description: '거절됨' }
      });
    } catch (error) {
      console.error('Failed to reject wish', error);
      throw error;
    }
  };