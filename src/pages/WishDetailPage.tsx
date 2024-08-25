import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import flower from '../assets/flower.svg'; // SVG 배경 이미지 파일

interface WishDetail {
  title: string;
  content: string;
  category: string;
}

const WishDetailPage: React.FC = () => {
  const { wishId } = useParams<{ wishId: string }>();
  const [wishDetail, setWishDetail] = useState<WishDetail | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const savedRole = localStorage.getItem('isAdmin');
    return savedRole === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (wishId) {
      fetchWishDetail();
    }
  }, [wishId]);

  const fetchWishDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/wishes/${wishId}`);
      const data = await response.json();
      setWishDetail(data.data);
    } catch (error) {
      console.error('Error fetching wish detail:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/wishes/${wishId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('소원 삭제 성공');
        navigate('/'); // 삭제 후 목록 페이지로 이동
      } else {
        console.error('소원 삭제 실패:', response.statusText);
      }
    } catch (error) {
      console.error('소원 삭제 중 오류 발생:', error);
    }
  };

  if (!wishDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center w-full relative">
      <TopBar />
      <div className="flex-grow w-full flex justify-center items-center relative">
        <img
          src={flower}
          alt="Flower"
          className="absolute w-auto h-auto max-w-full max-h-full object-contain"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* 소원 내용 */}
        <div className="relative z-10 w-full max-w-2xl p-8 text-center bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-black mb-4">
            {wishDetail.title}
          </h1>
          <p className="text-xl text-gray-700 mb-2">{wishDetail.category}</p>
          <p className="text-lg text-gray-600">{wishDetail.content}</p>

          {/* 삭제 버튼 (Admin 권한일 때만 보임) */}
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="mt-6 bg-red-500 text-white px-6 py-3 rounded-full shadow"
            >
              소원 삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishDetailPage;
