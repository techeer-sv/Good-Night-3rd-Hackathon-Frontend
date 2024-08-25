'use client';

import { useState, useEffect } from 'react';
import WishFruit from '@/app/_component/WishFruit';
import { getWishes } from '@/app/_lib/getWishes';
import { Wish } from '@/model/Wish';

export default function WishSection() {
  const [category, setCategory] = useState<string>(''); // 선택된 카테고리를 저장할 상태
  const [approveWishes, setApproveWishes] = useState<Wish[]>([]);

  // 카테고리 또는 컴포넌트가 처음 렌더링될 때 소원을 가져옴
  useEffect(() => {
    const fetchWishes = async () => {
      const wishes = await getWishes('true', category);
      if (wishes) {
        setApproveWishes(wishes);
      }
    };

    fetchWishes();
  }, [category]); // 카테고리가 변경될 때마다 소원을 다시 가져옴

  return (
    <div className="w-full">
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-lg font-medium text-gray-700"
        >
          카테고리 선택
        </label>
        <select
          id="category"
          name="category"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">모든 카테고리</option>
          <option value="진로">진로</option>
          <option value="건강">건강</option>
          <option value="인간 관계">인간 관계</option>
          <option value="돈">돈</option>
          <option value="목표">목표</option>
          <option value="학업/성적">학업/성적</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {approveWishes.map((wish: Wish) => (
          <WishFruit key={wish.id} wish={wish} />
        ))}
      </div>
    </div>
  );
}
