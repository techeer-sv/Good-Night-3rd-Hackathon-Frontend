import { Suspense } from 'react';
import AllowWishes from '@/app/wish-fruit/allow/_component/AllowWishes';
import { getWishes } from '@/app/_lib/getWishes';

export default async function Allow() {
  const pendingWishes = await getWishes('pending');

  return (
    <div
      className="min-h-screen bg-yellow-50 p-6 flex flex-col"
      style={{
        backgroundImage: `url(/wish_background.webp)`,
        backgroundSize: 'cover',
      }}
    >
      <h1 className="text-4xl font-bold text-yellow-300 mb-8">
        소원 열매 승인
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        <AllowWishes wishes={pendingWishes} />
      </Suspense>
    </div>
  );
}
