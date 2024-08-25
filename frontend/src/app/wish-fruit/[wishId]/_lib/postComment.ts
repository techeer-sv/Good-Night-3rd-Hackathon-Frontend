export default async function postComment({
  wishId,
  content,
}: {
  wishId: string;
  content: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content,
          wishId: wishId,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('댓글 작성 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
