import { Wish } from '@/model/Wish';

type Props = {
  wish: Wish;
};

export default function WishFruit({ wish }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold text-yellow-600">{wish.title}</h2>
      <p className="text-gray-700">{wish.content}</p>
      <p className="text-sm text-gray-500">카테고리: {wish.category}</p>
    </div>
  );
}
