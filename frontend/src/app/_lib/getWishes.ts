export const getWishes = async (confirm?: string, category?: string) => {
  try {
    // 파라미터가 존재하지 않을 경우 무시하도록 함
    const params = new URLSearchParams();
    if (confirm) {
      params.append('isConfirmed', confirm);
    }
    if (category) {
      params.append('category', category);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishes?${params.toString()}`,
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
