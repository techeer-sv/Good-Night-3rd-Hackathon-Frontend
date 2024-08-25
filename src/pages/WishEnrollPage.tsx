import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { useNavigate } from 'react-router-dom';

const WishEnrollPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('진로');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // 카테고리 값 변환 (필요에 따라 추가 카테고리 매핑 가능)
    const categoryMapping: { [key: string]: string } = {
      진로: 'CAREER',
      건강: 'FITNESS',
      관계: 'RELATIONSHIP',
      학업: 'STUDY',
      금전: 'MONEY',
      목표: 'GOAL',
    };

    const payload = {
      title,
      content,
      category: categoryMapping[category] || 'CAREER', // 매핑되지 않은 값은 기본적으로 'CAREER'로 처리
    };

    try {
      const response = await fetch('http://localhost:8080/wishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('소원 등록 성공:', payload);
        navigate('/'); // 등록 성공 후 목록 페이지로 이동
      } else {
        console.error('소원 등록 실패:', response.statusText);
      }
    } catch (error) {
      console.error('소원 등록 중 오류 발생:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center w-full bg-white">
      <TopBar />
      <div className="flex-grow w-full flex justify-center items-center">
        <div className="w-full max-w-2xl p-8 bg-white rounded shadow-md">
          <div className="mb-6">
            <label className="block text-black text-lg font-semibold mb-2">
              소원 제목
            </label>
            <input
              type="text"
              className="w-full border border-gray-400 p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-black text-lg font-semibold mb-2">
              소원 카테고리
            </label>
            <select
              className="w-full border border-gray-400 p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="진로">진로</option>
              <option value="건강">건강</option>
              <option value="학업">관계</option>
              <option value="학업">금전</option>
              <option value="학업">목표</option>
              {/* 추가 카테고리는 여기에 추가 */}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-black text-lg font-semibold mb-2">
              소원 본문
            </label>
            <textarea
              className="w-full border border-gray-400 p-2 rounded h-48"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="text-right">
            <button
              onClick={handleSubmit}
              className="bg-pink-300 text-white px-6 py-3 rounded-full shadow"
            >
              소원 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishEnrollPage;
