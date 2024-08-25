'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-300">
      <h1 className="text-6xl font-bold text-yellow-600">404</h1>
      <p className="text-2xl text-gray-700 mt-4">페이지를 찾을 수 없습니다.</p>
      <Link href="/">
        <div className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200">
          홈으로 돌아가기
        </div>
      </Link>
    </div>
  );
}
