import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import tree from '../assets/tree.svg';
import fruit from '../assets/fruit.svg';
import Switch from '../components/ToggleSwitch';

interface Wish {
  id: number;
  title: string;
  content: string;
}

const WishListPage: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const savedRole = localStorage.getItem('isAdmin');
    return savedRole === 'true';
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/wishes?page=0&size=9999`,
      );
      const data = await response.json();
      const wishesArray = data.data.content;
      setWishes(wishesArray);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
  };

  const handleWishClick = (wishId: number) => {
    navigate(`/wish/${wishId}`);
  };

  const toggleRole = () => {
    setIsAdmin((prevRole) => {
      const newRole = !prevRole;
      localStorage.setItem('isAdmin', newRole.toString());
      return newRole;
    });
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center w-full relative">
      <TopBar />
      <div className="flex-grow w-full flex justify-center items-center relative">
        <img
          src={tree}
          alt="Tree"
          className="absolute w-auto h-auto max-w-full max-h-full object-contain"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div className="relative z-10 w-full h-full grid grid-cols-3 gap-6 pt-20">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              onClick={() => handleWishClick(wish.id)}
              className="cursor-pointer"
            >
              <img src={fruit} alt="Fruit" className="w-20 h-20" />
              <p className="text-center text-black text-sm mt-2">
                {wish.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <label htmlFor="Role" className="text-black ml-2">
          {isAdmin ? 'Admin' : 'User'}
        </label>
        <Switch id="Role" onCheckedChange={toggleRole}></Switch>
      </div>
    </div>
  );
};

export default WishListPage;
