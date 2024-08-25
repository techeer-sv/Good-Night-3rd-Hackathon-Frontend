import WishForm from '@/app/wish/_component/WishForm';

export default function WishPostPage() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 w-screen h-screen flex flex-col items-center justify-between py-12">
      <header className="bg-white shadow-lg rounded-lg px-8 py-4 text-4xl font-bold text-yellow-600">
        Techeer Tree
      </header>
      <WishForm />
    </div>
  );
}
