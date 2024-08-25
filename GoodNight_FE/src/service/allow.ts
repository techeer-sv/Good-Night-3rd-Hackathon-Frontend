import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/wishes';

// 소원 목록을 가져오는 함수
export const fetchWishes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}?confirm=PENDING`);
    return response.data.data.content;
  } catch (error) {
    console.error('Error fetching wishes:', error);
    throw error;
  }
};

// 소원 상태를 업데이트하는 함수
export const updateWishStatus = async (
  wishId: number,
  status: 'APPROVED' | 'REJECTED',
) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${wishId}`, {
      isConfirm: status,
    });

    if (response.status === 200) {
      return true;
    } else {
      console.error(`실패: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error(`에러: ${error}`);
    throw error;
  }
};
