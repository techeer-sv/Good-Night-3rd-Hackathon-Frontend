import WishSection from '@/app/_component/WishSection';
import CreateWishButton from '@/app/_component/CreateWishButton';
import ApproveButton from '@/app/_component/ApproveButton';

export default function WishTree() {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 w-screen h-screen flex flex-col items-center justify-between py-12">
      <div className="w-full h-full px-[10%] space-y-10">
        <header className="bg-white shadow-lg rounded-lg px-8 py-4 text-4xl font-bold text-yellow-600">
          Techeer Tree
        </header>
        <div className="w-full flex items-center justify-center h-fit">
          <WishSection />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <CreateWishButton />
        <ApproveButton />
      </div>
    </div>
  );
}
