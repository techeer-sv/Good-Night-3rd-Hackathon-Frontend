'use client';

import { useEffect, useReducer } from 'react';
import WishFruit from '@/app/_component/WishFruit';
import { getWishes } from '@/app/_lib/getWishes';
import InfiniteScroll from '@/app/_component/InfiniteScroll';
import { initialState, reducer } from '@/app/_lib/reducer';

export default function WishSection() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      dispatch({ type: 'SET_LOADING', isLoading: true });

      try {
        const newWishes = await getWishes(
          'true',
          state.category,
          state.page.toString(),
          '3',
        );
        if (newWishes) {
          dispatch({ type: 'FETCH_SUCCESS', wishes: newWishes });
          dispatch({ type: 'SET_HAS_MORE', hasMore: newWishes.length > 0 });
        }
      } catch (error) {
        console.error('소원 데이터를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', isLoading: false });
      }
    };

    fetchWishes();
  }, [state.category, state.page]);

  useEffect(() => {
    dispatch({ type: 'RESET_WISHES' });
  }, [state.category]);

  const loadMore = () => {
    dispatch({ type: 'INCREMENT_PAGE' });
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <select
          id="category"
          name="category"
          className="text-yellow-300 mt-1 border-none glass bg-yellow-500 bg-opacity-50 block w-fit p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={state.category}
          onChange={(e) =>
            dispatch({ type: 'SET_CATEGORY', category: e.target.value })
          }
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
        hasMore={state.hasMore}
        isLoading={state.isLoading}
      >
        <div className="grid grid-cols-3 gap-8 overflow-y-scroll h-[60vh]">
          {state.wishes.map((wish, index) => (
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
