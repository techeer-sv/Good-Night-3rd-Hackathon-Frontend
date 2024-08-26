import getWishDetail from '@/app/wish-fruit/[wishId]/_lib/getWishDetail';
import { notFound } from 'next/navigation';
import Comments from './_component/Comments';
import Image from 'next/image';

type Props = {
  params: {
    wishId: string;
  };
};

export default async function WishFruit({ params }: Props) {
  const { wishId } = params;

  const wish = await getWishDetail({ wishId });

  if (!wish) {
    notFound();
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Image
        className="-z-10"
        src="/wish_background.webp"
        alt="wish_background"
        fill
      />
      <div className="w-1/3 bg-purple-800 shadow-md rounded-lg p-8 glass bg-opacity-50">
        <header className="w-full text-4xl font-bold text-white mb-4">
          {wish.title}
        </header>
        <p className="text-gray-50 mb-4 text-xl font-semibold">
          {wish.content}
        </p>
        <p className="text-base text-yellow-500">카테고리: {wish.category}</p>
        <Comments wishId={wishId} />
      </div>
    </div>
  );
}
