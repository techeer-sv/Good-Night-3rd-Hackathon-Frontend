//소원 열매 달기 페이지(소원 등록)
import React, { useState } from 'react';
import Header from '../Header';
import RoleSwitcher from '../RoleSwitcher';

const categories = [
  '진로',
  '건강',
  '인간 관계',
  '돈',
  '목표',
  '학업/성적',
  '기타',
];

const WishPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{
    title?: string;
    category?: string;
    content?: string;
  }>({});
  // const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;
    const newErrors: {
      title?: string;
      category?: string;
      description?: string;
    } = {};

    if (!title) {
      newErrors.title = '소원 제목을 입력해주세요.';
      hasError = true;
    }
    if (!category) {
      newErrors.category = '소원 카테고리를 선택해주세요.';
      hasError = true;
    }
    if (!content) {
      newErrors.description = '소원 본문을 입력해주세요.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    //navigate 추가할 것
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
              id="title"
              type="text"
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
