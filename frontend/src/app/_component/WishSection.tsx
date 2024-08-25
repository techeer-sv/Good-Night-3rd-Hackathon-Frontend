import WishFruit from '@/app/_component/WishFruit';
import { getAllWishes } from '@/app/_lib/getAllWishes';
import { Wish } from '@/model/Wish';

export default async function WishSection() {
  const wishes = await getAllWishes();
  return (
    <div className="grid grid-cols-3 w-full px-[10%] gap-4">
      {wishes.map((wish: Wish) => (
        <WishFruit key={wish.id} wish={wish} />
      ))}
    </div>
  );
}
