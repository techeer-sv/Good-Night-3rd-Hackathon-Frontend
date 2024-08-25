import React, { useEffect, useState } from 'react';
import Header from '../Header';

import okay from '../../asset/Okay.svg';
import no from '../../asset/No.svg';
import RoleSwitcher from '../RoleSwitcher';
import { fetchWishes, updateWishStatus } from '../../service/allow';

interface Wish {
  id: number;
  title: string;
}

const AllowPage: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWishes = async () => {
      try {
        const wishesArray = await fetchWishes();
        setWishes(wishesArray);
      } catch (err) {
        setError('Failed to load wishes.');
      } finally {
        setLoading(false);
      }
    };

    loadWishes();
  }, []);

  const handleUpdateWish = async (
    wishId: number,
    status: 'APPROVED' | 'REJECTED',
  ) => {
    try {
      const success = await updateWishStatus(wishId, status);
      if (success) {
        setWishes((prevWishes) =>
          prevWishes.filter((wish) => wish.id !== wishId),
        );
      } else {
        setError(
          `Failed to ${status === 'APPROVED' ? 'approve' : 'reject'} wish.`,
        );
      }
    } catch (error) {
      console.error(`Error updating wish status: ${error}`);
    }
  };
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-col items-center w-full h-full p-6">
        <h1 className="text-3xl font-bold mb-6 mt-10">소원 열매 승인</h1>
        <div className="w-full max-w-4xl">
          {wishes.map((wish) => (
            <div key={wish.id} className="flex items-center mb-4">
              <div className="flex-1 py-2 p-4 border border-gray-300 rounded-lg bg-white mr-4">
                <p className="text-lg">{wish.title}</p>
              </div>
              <div className="flex space-x-4">
                <img
                  src={okay}
                  alt="Approve"
                  className="w-10 h-10 object-cover"
                  onClick={() => handleUpdateWish(wish.id, 'APPROVED')}
                />
                <img
                  src={no}
                  alt="Reject"
                  className="w-10 h-10 object-cover"
                  onClick={() => handleUpdateWish(wish.id, 'REJECTED')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <RoleSwitcher />
    </div>
  );
};

export default AllowPage;
