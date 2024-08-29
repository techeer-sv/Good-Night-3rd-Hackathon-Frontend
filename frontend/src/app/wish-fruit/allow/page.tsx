import { Suspense } from 'react';
import AllowWishes from '@/app/wish-fruit/allow/_component/AllowWishes';
import { getWishes } from '@/app/_lib/getWishes';
import Image from 'next/image';

export default async function Allow() {
  const pendingWishes = await getWishes('pending');

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <Image
        className="-z-10"
        src="/wish_background.webp"
        alt="wish_background"
        fill
      />
      <h1 className="text-4xl font-bold text-yellow-300 mb-8">
        소원 열매 승인
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        <AllowWishes wishes={pendingWishes} />
      </Suspense>
    </div>
  );
}
