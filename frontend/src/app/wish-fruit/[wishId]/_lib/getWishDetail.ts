export default async function getWishDetail({ wishId }: { wishId: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishes/${wishId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('단일 소원 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
