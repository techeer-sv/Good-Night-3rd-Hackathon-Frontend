'use client';

import { useState, useEffect, useRef } from 'react';
import WishFruit from '@/app/_component/WishFruit';
import { getWishes } from '@/app/_lib/getWishes';
import { Wish } from '@/model/Wish';

export default function WishSection() {
  const [category, setCategory] = useState<string>(''); // 선택된 카테고리를 저장할 상태
  const [wishes, setWishes] = useState<Wish[]>([]); // 소원 목록
  const [page, setPage] = useState<number>(1); // 현재 페이지
  const [isLoading, setIsLoading] = useState<boolean>(false); // 데이터 로딩 상태
  const [hasMore, setHasMore] = useState<boolean>(true); // 추가 데이터 여부

  const observerRef = useRef<IntersectionObserver | null>(null); // IntersectionObserver 참조

  // 무한 스크롤을 위한 마지막 요소 감지
  const lastWishElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchWishes = async () => {
      setIsLoading(true);
      const newWishes = await getWishes('true', category, page.toString(), '3');
      if (newWishes) {
        setWishes((prevWishes: Wish[]) => [...prevWishes, ...newWishes]);
        setHasMore(newWishes.length > 0); // 더 가져올 데이터가 있는지 확인
      }
      setIsLoading(false);
    };

    fetchWishes();
  }, [category, page]);

  useEffect(() => {
    // 카테고리가 변경될 때 페이지와 소원 목록 초기화
    setPage(1);
    setWishes([]);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    // 새로운 IntersectionObserver를 생성하여 마지막 요소를 감지
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1); // 페이지 증가
      }
    });

    if (lastWishElementRef.current) {
      observerRef.current.observe(lastWishElementRef.current);
    }
  }, [hasMore, isLoading]);

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

      <div className="grid grid-cols-3 gap-4 overflow-y-scroll h-[60vh]">
        {wishes.map((wish, index) => (
          <div
            key={wish.id}
            ref={index === wishes.length - 1 ? lastWishElementRef : null}
            className="flex flex-col justify-between min-h-[calc(60vh/3-1rem)]"
          >
            <WishFruit wish={wish} />
          </div>
        ))}
      </div>
    </div>
  );
}
