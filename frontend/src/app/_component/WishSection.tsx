import WishFruit from '@/app/_component/WishFruit';
import { getWishes } from '@/app/_lib/getWishes';
import { Wish } from '@/model/Wish';

export default async function WishSection() {
  const approveWishes = await getWishes('true');
  return (
    <div className="grid grid-cols-3 w-full px-[10%] gap-4">
      {approveWishes.map((wish: Wish) => (
        <WishFruit key={wish.id} wish={wish} />
      ))}
    </div>
  );
}
