export default async function deleteComment(commentId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('댓글 삭제 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
