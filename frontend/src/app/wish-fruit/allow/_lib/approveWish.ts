import { Wish } from '@/model/Wish';

export const approveWish = async (wishId: number): Promise<Wish | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishes/${wishId}/approve`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('소원 승인 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
