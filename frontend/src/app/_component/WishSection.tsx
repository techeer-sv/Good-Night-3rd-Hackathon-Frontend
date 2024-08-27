'use client';

import { useState, useEffect, useRef } from 'react';
import WishFruit from '@/app/_component/WishFruit';
import { getWishes } from '@/app/_lib/getWishes';
import { Wish } from '@/model/Wish';
import InfiniteScroll from '@/app/_component/InfiniteScroll';

export default function WishSection() {
  const [category, setCategory] = useState<string>(''); // 선택된 카테고리를 저장할 상태
  const [wishes, setWishes] = useState<Wish[]>([]); // 소원 목록
  const [page, setPage] = useState<number>(1); // 현재 페이지
  const [isLoading, setIsLoading] = useState<boolean>(false); // 데이터 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 추가 데이터 여부

  const categories = [
    { value: '', label: '모든 카테고리' },
    { value: '진로', label: '진로' },
    { value: '건강', label: '건강' },
    { value: '인간 관계', label: '인간 관계' },
    { value: '돈', label: '돈' },
    { value: '목표', label: '목표' },
    { value: '학업/성적', label: '학업/성적' },
    { value: '기타', label: '기타' },
  ];

  useEffect(() => {
    const fetchWishes = async () => {
      setIsLoading(true);

      try {
        const newWishes = await getWishes(
          'true',
          category,
          page.toString(),
          '3',
        );
        if (newWishes) {
          setWishes((prevWishes: Wish[]) => [...prevWishes, ...newWishes]);
          setHasMore(newWishes.length > 0); // 더 가져올 데이터가 있는지 확인
        }
      } catch (error) {
        console.error('소원 데이터를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
      }
    };

    fetchWishes();
  }, [category, page]);

  useEffect(() => {
    // 카테고리가 변경될 때 페이지와 소원 목록 초기화
    setPage(1);
    setWishes([]);
    setHasMore(true);
  }, [category]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <select
          id="category"
          name="category"
          className="text-yellow-300 mt-1 border-none glass bg-yellow-500 bg-opacity-50 block w-fit p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
      >
        <div className="grid grid-cols-3 gap-8 overflow-y-scroll h-[60vh]">
          {wishes.map((wish, index) => (
            <div
              key={wish.id}
              className="flex flex-col justify-between min-h-[calc(60vh/2-2rem)]"
            >
              <WishFruit wish={wish} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
