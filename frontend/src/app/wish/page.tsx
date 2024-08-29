import WishForm from '@/app/wish/_component/WishForm';
import Image from 'next/image';

export default function WishPostPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-between py-12">
      <Image
        className="-z-10"
        src="/wish_background.webp"
        alt="wish_background"
        fill
      />
      <WishForm />
    </div>
  );
}
