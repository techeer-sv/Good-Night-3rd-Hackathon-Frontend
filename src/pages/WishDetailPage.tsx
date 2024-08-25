import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
        </div>
      </div>
    </div>
  );
};

export default WishDetailPage;
