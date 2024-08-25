import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface Wish {
  id: number;
  title: string;
}

const WishConfirmPage: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/wishes?confirm=PENDING`,
      );
      const data = await response.json();
      const wishesArray = data.data.content;
      setWishes(wishesArray);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
  };

  const updateWishStatus = async (
    wishId: number,
    status: 'APPROVED' | 'REJECTED',
  ) => {
    try {
      const response = await fetch(`http://localhost:8080/wishes/${wishId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isConfirm: status }),
      });

      if (response.ok) {
        console.log(`소원 ${status === 'APPROVED' ? '승인' : '거절'} 성공`);
        setWishes((prevWishes) =>
          prevWishes.filter((wish) => wish.id !== wishId),
        );
      } else {
        console.error(
          `소원 ${status === 'APPROVED' ? '승인' : '거절'} 실패:`,
          response.statusText,
        );
      }
    } catch (error) {
      console.error(
        `소원 ${status === 'APPROVED' ? '승인' : '거절'} 중 오류 발생:`,
        error,
      );
    }
  };

  const handleApprove = (wishId: number) => {
    updateWishStatus(wishId, 'APPROVED');
  };

  const handleReject = (wishId: number) => {
    updateWishStatus(wishId, 'REJECTED');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center w-full">
      <TopBar />
      <div className="w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold mb-8">소원 열매 승인</h1>
        <ul>
          {wishes.map((wish) => (
            <li key={wish.id} className="flex items-center mb-4">
              <p className="flex-grow border-b border-gray-300 px-4 py-2">
                {wish.title}
              </p>
              <button
                onClick={() => handleApprove(wish.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-full ml-2 flex items-center justify-center"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => handleReject(wish.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-full ml-2 flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WishConfirmPage;
