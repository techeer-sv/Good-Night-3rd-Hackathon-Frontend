'use client';

import { Wish } from '@/model/Wish';
import { useRouter } from 'next/navigation';

type Props = {
  wish: Wish;
};

export default function WishFruit({ wish }: Props) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push(`/wish-fruit/${wish.id}`);
  };
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 cursor-pointer h-full flex flex-col justify-between"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-yellow-600">{wish.title}</h2>

      <p className="text-gray-700">{wish.content}</p>
      <p className="text-sm text-gray-500">카테고리: {wish.category}</p>
    </div>
  );
}
