// 소원 열매 페이지(소원 상세 페이지)
import React, { useEffect, useState } from 'react';
import Header from '../Header';

import fruitBg from '../../asset/FruitBg.svg';
import RoleSwitcher from '../RoleSwitcher';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteWishById, getWishById } from '../../service/fruitWish';
import { Wish } from '../../service/getWishes';
import { useUserContext } from '../../context/UserContext';

const WishFruit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wish, setWish] = useState<Wish | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { role } = useUserContext();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (!id || isNaN(Number(id))) return;

    setDeleting(true);
    try {
      await deleteWishById(Number(id));
      alert('소원이 삭제되었습니다.');
      // 삭제 후 네비게이션 또는 다른 페이지로 리디렉션
    } catch (err) {
      setError('소원 삭제에 실패했습니다.');
      console.error('Error deleting wish:', err);
    } finally {
      setDeleting(false);
    }

    navigate('/');
  };

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
          {role === 'Admin' && ( // 관리자일 때만 삭제 버튼 표시
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </div>
      <RoleSwitcher />
    </div>
  );
};
export default WishFruit;
