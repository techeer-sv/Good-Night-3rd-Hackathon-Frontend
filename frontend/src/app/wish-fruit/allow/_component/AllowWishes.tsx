'use client';

import { useState } from 'react';
import { useAuth } from '@/app/_component/AuthContext';
import { Wish } from '@/model/Wish';
import { approveWish } from '@/app/wish-fruit/allow/_lib/approveWish';
import { rejectWish } from '@/app/wish-fruit/allow/_lib/rejectWish';

type AllowWishesProps = {
  wishes: Wish[] | null;
};

export default function AllowWishes({ wishes }: AllowWishesProps) {
  const [pendingWishes, setPendingWishes] = useState<Wish[] | null>(wishes);

  const removeWishById = (id: number) => {
    setPendingWishes(
      (prevWishes) => prevWishes?.filter((wish) => wish.id !== id) || null,
    );
  };

  const handleApprove = async (id: number) => {
    try {
      // 거절 API 호출
      await approveWish(id);

      // 승인된 소원 목록에서 제거
      removeWishById(id);
    } catch (error) {
      console.error('소원 승인 실패:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      // 거절 API 호출
      await rejectWish(id);

      // 거절된 소원 목록에서 제거
      removeWishById(id);
    } catch (error) {
      console.error('소원 거절 실패:', error);
    }
  };

  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="my-auto bg-white glass bg-opacity-50 w-1/2 mx-auto p-6 flex items-center justify-center rounded-lg">
        <p className="text-2xl text-red-600 font-bold my-auto">
          관리자가 아니면 이 페이지에 접근할 권한이 없습니다.
        </p>
      </div>
    );
  }

  if (!pendingWishes || pendingWishes.length === 0) {
    return (
      <div className="my-auto bg-white glass bg-opacity-50 w-1/2 mx-auto p-6 flex items-center justify-center rounded-lg">
        <p className="text-2xl text-gray-600 font-bold my-auto">
          승인 대기 중인 소원이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pendingWishes.map((wish) => (
        <div
          key={wish.id}
          className="bg-white glass bg-opacity-50 shadow-md rounded-lg p-4 flex flex-row justify-between items-center"
        >
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-yellow-300">{wish.title}</h2>
            <p className="text-gray-700 mt-2">{wish.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              카테고리: {wish.category}
            </p>
          </div>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => handleApprove(wish.id)}
              className="bg-yellow-500 glass text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200"
            >
              승인
            </button>
            <button
              onClick={() => handleReject(wish.id)}
              className="bg-purple-950 glass text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
            >
              거절
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
