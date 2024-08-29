import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Image
        className="-z-10"
        src="/background_image.webp"
        alt="not_fround_background"
        fill
      />
      <div className="flex flex-col items-center justify-center h-1/2 w-1/2 bg-white rounded-lg bg-opacity-60 glass">
        <h1 className="text-6xl font-bold text-yellow-600">404</h1>
        <p className="text-2xl text-white mt-4">페이지를 찾을 수 없습니다.</p>
        <Link href="/">
          <div className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200">
            홈으로 돌아가기
          </div>
        </Link>
      </div>
    </div>
  );
}
