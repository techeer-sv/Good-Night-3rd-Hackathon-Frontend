import React, { useEffect, useState } from 'react';
import BackLayout from '../component/wishall/BackLayout';
import NavBar from '../component/NavBar';
import NavBtn from '../component/NavBtn';
import ShowFruit from '../component/wishall/ShowFruits';
import axios from 'axios';
import useWishStore from '../store';
import { useNavigate } from 'react-router-dom';

const WishTreePage: React.FC = () => {
  const navigate = useNavigate();
  const { wishList, findByWish, setWishList, wishId, setWishId, resetAll } =
    useWishStore();
  const [state, setState] = useState<boolean>(false);

  const handleShowWish = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/wish/list');
    setWishList(response.data);
  };

  const handleTest = () => {
    console.log(findByWish(1));
  };

  const handleClickWish = (id: number) => {
    setWishId(id);
    setState(true);
  };

  useEffect(() => {
    resetAll();
    handleShowWish();
  }, [resetAll]);

  useEffect(() => {
    if (state) {
      navigate('/get');
    }
  }, [state, navigate]);

  return (
    <BackLayout>
      <NavBar>
        <div>
          <NavBtn
            buttonText="모드전환"
            addClassName="text-[16px] mr-[5px]"
          ></NavBtn>
          <NavBtn
            buttonText="소원열매 달기"
            addClassName="text-[16px]"
          ></NavBtn>
        </div>
      </NavBar>
      <div className="w-[50%] h-[100%] m-auto flex">
        {wishList.map((wish) =>
          wish.is_confirmed ? (
            <ShowFruit
              key={wish.wishId}
              wishTitle={wish.title}
              wishId={wish.wishId}
              onClick={handleClickWish}
            />
          ) : null,
        )}
      </div>
      <button onClick={handleTest}>테스트용</button>
    </BackLayout>
  );
};

export default WishTreePage;
