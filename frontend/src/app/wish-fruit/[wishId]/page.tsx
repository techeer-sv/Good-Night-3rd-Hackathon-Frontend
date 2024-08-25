import getWishDetail from '@/app/wish-fruit/[wishId]/_lib/getWishDetail';
import { notFound } from 'next/navigation';
import Comments from './_component/Comments';

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
    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 w-screen h-screen flex flex-col items-center py-12">
      <header className="bg-white shadow-lg rounded-lg px-8 py-4 text-4xl font-bold text-yellow-600">
        {wish.title}
      </header>
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8 my-auto">
        <p className="text-gray-700 mb-4">{wish.content}</p>
        <p className="text-sm text-gray-500">카테고리: {wish.category}</p>
        <Comments wishId={wishId} />
      </div>
    </div>
  );
}
