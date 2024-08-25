export const getWishes = async (confirm: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishes?isConfirmed=${confirm}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('전제 소원 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
