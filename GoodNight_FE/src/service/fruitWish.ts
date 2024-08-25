import axios from 'axios';
import { Wish } from './getWishes';

export async function getWishById(id: number): Promise<Wish> {
  try {
    const response = await axios.get(`http://localhost:8080/wishes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.log('소원 조회 요청 실패:', error);
    throw error;
  }
}
