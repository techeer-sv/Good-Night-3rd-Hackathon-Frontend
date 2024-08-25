import WishForm from '@/app/wish/_component/WishForm';

export default function WishPostPage() {
  return (
    <div
      className="bg-gradient-to-b from-yellow-50 to-yellow-100 w-screen h-screen flex flex-col items-center justify-between py-12"
      style={{
        backgroundImage: `url(/wish_background.webp)`,
        backgroundSize: 'cover',
      }}
    >
      <WishForm />
    </div>
  );
}
