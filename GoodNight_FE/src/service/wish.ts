import axios from 'axios';

export interface WishData {
  title: string;
  category: string;
  content: string;
}

export async function createWish(data: WishData) {
  const { title, category, content } = data;

  try {
    const response = await axios.post(`http://localhost:8080/wishes`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error('서버 응답 오류:', response.status);
      return null;
    }
  } catch (error) {
    console.error(
      '소원 생성 요청 실패:',
      error.response?.data || error.message,
    );
    throw error;
  }
}
