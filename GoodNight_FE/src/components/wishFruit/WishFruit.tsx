// 소원 열매 페이지(소원 상세 페이지)
import React, { useEffect, useState } from 'react';
import Header from '../Header';

import fruitBg from '../../asset/FruitBg.svg';
import RoleSwitcher from '../RoleSwitcher';
import { useParams } from 'react-router-dom';
import { getWishById } from '../../service/fruitWish';
import { Wish } from '../../service/getWishes';

const WishFruit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wish, setWish] = useState<Wish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetchWish 호출
    const fetchWish = async () => {
      if (!id || isNaN(Number(id))) {
        setError('Invalid ID');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const wishData = await getWishById(Number(id));
        console.log('Fetched wish data:', wishData);
        setWish(wishData);
      } catch (err) {
        setError('소원 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWish();
  }, [id]);

  if (!wish) {
    return <div>No wish found</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div
        className="flex-1 flex justify-center items-center w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${fruitBg})`,
          backgroundSize: 'contain', // 이미지가 컨테이너에 맞게 조정되도록 설정
          backgroundRepeat: 'no-repeat', // 이미지가 반복되지 않도록 설정
          backgroundPosition: 'center', // 이미지가 컨테이너의 중앙에 배치되도록 설정
        }}
      >
        <div className="text-center p-6 bg-opacity-70 rounded-lg max-w-md mx-auto">
          <h1 className="text-4xl font-extrabold mb-8">{wish.title}</h1>
          <p className="text-md text-gray-500 mb-8">{wish.category}</p>
          <p className="text-3xl">{wish.content}</p>
        </div>
      </div>
      <RoleSwitcher />
    </div>
  );
};
export default WishFruit;
