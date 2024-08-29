import { Comment } from '@/model/Comment';

export default async function getComments(
  wishId: string,
): Promise<Comment | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${wishId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('댓글 조회 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
