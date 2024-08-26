'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import postWish from '@/app/wish/_lib/postWish';
import { useAuth } from '@/app/_component/AuthContext';

type CategoryType =
  | '진로'
  | '건강'
  | '인간 관계'
  | '돈'
  | '목표'
  | '학업/성적'
  | '기타';

export default function WishForm() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<CategoryType | ''>('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력 유효성 검사
    if (!title || !content || !category) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      await postWish({ title, content, category });

      // 등록 후 페이지 이동
      router.push('/');
    } catch (error) {
      setError('소원 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin) {
    return (
      <div className="my-auto p-6 flex items-center justify-center glass rounded-lg w-1/2">
        <p className="text-2xl text-red-600 font-bold my-auto">
          유저가 아니면 이 페이지에 접근할 권한이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-purple-800 bg-opacity-50 shadow-md rounded-lg p-8 my-auto glass">
      <h2 className="text-2xl font-bold text-center text-yellow-300 mb-6">
        소원 빌기
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-yellow-300">제목</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-yellow-300">내용</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-yellow-300">카테고리</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryType)}
          >
            <option value="">카테고리 선택</option>
            <option value="진로">진로</option>
            <option value="건강">건강</option>
            <option value="인간 관계">인간 관계</option>
            <option value="돈">돈</option>
            <option value="목표">목표</option>
            <option value="학업/성적">학업/성적</option>
            <option value="기타">기타</option>
          </select>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-yellow-300 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200"
        >
          {isLoading ? '등록 중...' : '소원 등록'}
        </button>
      </form>
    </div>
  );
}
