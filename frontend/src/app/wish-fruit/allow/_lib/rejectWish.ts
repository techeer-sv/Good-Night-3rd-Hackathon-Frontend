export const rejectWish = async (wishId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishes/${wishId}/reject`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('소원 거절 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
