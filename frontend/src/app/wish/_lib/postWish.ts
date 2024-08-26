import { Wish } from '@/model/Wish';

type CategoryType =
  | '진로'
  | '건강'
  | '인간 관계'
  | '돈'
  | '목표'
  | '학업/성적'
  | '기타';

type WishInput = {
  title: string;
  content: string;
  category: CategoryType;
};

export default async function postWish({
  title,
  content,
  category,
}: WishInput): Promise<Wish | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        category: category,
      }),
    });

    if (!response.ok) {
      throw new Error('소원 작성 실패');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}
