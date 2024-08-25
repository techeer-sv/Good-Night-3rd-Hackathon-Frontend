'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import postWish from '@/app/wish/_lib/postWish';

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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력 유효성 검사
    if (!title || !content || !category) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await postWish({ title, content, category });

      // 등록 후 페이지 이동
      router.push('/');
    } catch (error) {
      setError('소원 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 my-auto">
      <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
        소원 열매 달기
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700">제목</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">내용</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">카테고리</label>
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
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200"
        >
          소원 등록
        </button>
      </form>
    </div>
  );
}
