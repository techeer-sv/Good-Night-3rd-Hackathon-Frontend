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
      className="cursor-pointer h-full flex flex-col justify-start p-4 items-center"
      onClick={onClick}
    >
      <img
        className="w-full h-auto object-contain max-h-40 items-center hover:animate-shake"
        alt={wish.title}
        src="/lamp.png"
      />
      <h2 className="text-xl font-bold text-yellow-300 text-center mt-8 bg-yellow-500 bg-opacity-50 glass w-1/2 py-2 rounded-lg shadow-xl">
        {wish.title}
      </h2>
    </div>
  );
}
