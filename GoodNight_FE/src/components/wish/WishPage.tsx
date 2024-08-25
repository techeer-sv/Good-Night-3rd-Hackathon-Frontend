//소원 열매 달기 페이지(소원 등록)
import React, { useState } from 'react';
import Header from '../Header';
import RoleSwitcher from '../RoleSwitcher';
import { createWish } from '../../service/wish';
import { useNavigate } from 'react-router-dom';

const categories = [
  'CAREER',
  'HEALTH',
  'RELATIONSHIPS',
  'MONEY',
  'GOALS',
  'ACADEMICS',
  'OTHERS',
];

const WishPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CAREER');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{
    title?: string;
    category?: string;
    content?: string;
  }>({});
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 입력 검증
    if (!title) {
      setErrors((prev) => ({ ...prev, title: '소원 제목을 입력해주세요.' }));
      return;
    }
    if (!category) {
      setErrors((prev) => ({ ...prev, category: '카테고리를 선택해주세요.' }));
      return;
    }
    if (!content) {
      setErrors((prev) => ({ ...prev, content: '소원 본문을 입력해주세요.' }));
      return;
    }

    const wishData = {
      title,
      category,
      content,
    };

    try {
      const result = await createWish(wishData);
      if (result) {
        alert('소원이 성공적으로 생성되었습니다!');
        navigate('/');
      } else {
        alert('소원 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('소원 생성 요청 실패:', error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center w-full h-screen p-6">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-xl font-medium text-gray-700"
            >
              소원 제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-700"
            >
              소원 카테고리
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">선택하세요</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              소원 본문
            </label>
            <textarea
              id="description"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-2 block w-full px-3 py-20 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              required
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-400 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            소원 등록
          </button>
        </form>
      </div>
      <RoleSwitcher />
    </div>
  );
};

export default WishPage;
