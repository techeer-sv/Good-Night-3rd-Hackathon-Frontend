import WishSection from '@/app/_component/WishSection';
import CreateWishButton from '@/app/_component/CreateWishButton';
import ApproveButton from '@/app/_component/ApproveButton';

export default function WishTree() {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-between py-12 bg-no-repeat"
      style={{
        backgroundImage: `url(/background_image.webp)`,
        backgroundSize: 'cover',
      }}
    >
      <div className="w-full h-full px-[10%] space-y-10">
        <header className="w-full glass bg-opacity-80 bg-yellow-500 shadow-lg rounded-lg px-8 py-4 text-4xl font-bold text-gray-100">
          Techeer Lamp
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
