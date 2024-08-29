import { Wish } from '@/model/Wish';
import { createQueryString } from '@/app/_util/createQueryString';

export const getWishes = async (
  confirm?: string,
  category?: string,
  page?: string,
  limit?: string,
): Promise<Wish[] | null> => {
  try {
    const params = {
      isConfirmed: confirm,
      category: category,
      page: page,
      limit: limit,
    };

    const queryString = createQueryString(params);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishes?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('소원 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
