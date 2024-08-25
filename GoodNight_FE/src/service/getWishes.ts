import axios from 'axios';

export interface Pageable {
  page: number;
  size: number;
}

export interface Wish {
  id: number;
  title: string;
  category: string;
  content: string;
  createdAt: string;
}

export async function getWishes(
  pageable: Pageable = { page: 0, size: 1 },
  confirm?: string,
): Promise<Wish[]> {
  try {
    // 쿼리 파라미터 구성
    const params: any = {
      page: pageable.page,
      size: pageable.size,
      ...(confirm ? { confirm } : {}),
    };

    const response = await axios.get('http://localhost:8080/wishes', {
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data.content;
  } catch (error) {
    console.error('소원 조회 요청 실패:', error);
    throw error;
  }
}
