import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const navigate = useNavigate();

  // 소원 열매 달기 버튼 클릭 시 소원 등록 페이지로 이동
  const handleAddWishClick = () => {
    navigate('/wish');
  };
  return (
    <header className="bg-pink-300 w-full py-4 flex justify-between items-center px-8">
      {/* 왼쪽: 제목 */}
      <div className="text-white text-xl font-bold">Techeer Tree</div>

      {/* 중앙: 드롭다운 */}
      <div className="flex-1 flex justify-center">
        <select className="bg-white text-black py-2 px-4 rounded-md">
          <option value="전체">전체</option>
          {/* 추가 옵션 필요 시 여기에 추가 */}
        </select>
      </div>

      {/* 오른쪽: 버튼 */}
      <div className="flex-shrink-0">
        <button
          onClick={handleAddWishClick} // 버튼 클릭 시 호출
          className="bg-pink-300 text-white px-4 py-2 rounded-full border border-white"
        >
          소원 열매 달기
        </button>
      </div>
    </header>
  );
};

export default TopBar;
