import React, { useEffect, useState } from 'react';
import BackLayout from '../component/wishall/BackLayout';
import NavBar from '../component/NavBar';
import NavBtn from '../component/NavBtn';
import ShowFruit from '../component/wishall/ShowFruits';
import axios from 'axios';
import useWishStore from '../store';

const WishTreePage: React.FC = () => {
  const [title, setTitle] = useState<String>('');
  const { wishList, findByWish, setWishList } = useWishStore();
  const [state, setState] = useState<number>(1);
  const handleShowWish = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/wish/list');
    setWishList(response.data);
    console.log(response.data[0].wishId);
  };
  const handleTest = () => {
    console.log(findByWish(1));
  };
  const handleClickWish = (id: number) => {
    setState(id);
    console.log(id);
  };
  useEffect(() => {
    //랜더링 시 모든 리스트 요청
    handleShowWish();
  }, []);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <BackLayout>
      <NavBar>
        <NavBtn buttonText="소원열매 달기" addClassName="text-[16px]"></NavBtn>
      </NavBar>
      <div className="w-[50%] h-[100%] m-auto flex">
        {wishList.map((wish, index) => (
          <ShowFruit
            key={wish.wishId}
            wishTitle={wish.title}
            wishId={wish.wishId}
            onClick={handleClickWish}
          ></ShowFruit>
        ))}
      </div>
      <button onClick={handleTest}>테스트용</button>
    </BackLayout>
  );
};

export default WishTreePage;
