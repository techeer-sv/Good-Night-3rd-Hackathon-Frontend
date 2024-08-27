'use client';

import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  children: ReactNode;
};
export default function InfiniteScroll({
  loadMore,
  hasMore,
  isLoading,
  children,
}: Props) {
  const observerRef = useRef<IntersectionObserver | null>(null); // IntersectionObserver 참조
  const lastElementRef = useRef<HTMLDivElement | null>(null); // 무한 스크롤을 위한 마지막 요소 감지

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    });

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    // 클린업 함수
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect(); // 관찰 중지
      }
    };
  }, [hasMore, isLoading]);

  return (
    <div className="w-full">
      {children}
      <div ref={lastElementRef} />
    </div>
  );
}
