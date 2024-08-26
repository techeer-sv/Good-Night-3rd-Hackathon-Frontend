import React, { useEffect, useState } from 'react';
import BackLayout from '../component/wishget/Backlayout';
import NavBar from '../component/NavBar';
import useWishStore from '../wishstore';
import { GotWish } from '../interface/Wish';
import axios from 'axios';

const WishGetPage: React.FC = () => {
  const [wish, setWish] = useState<GotWish | undefined>();
  const { wishId } = useWishStore();
  const getWish = async (id: number) => {
    const response = await axios.get(`http://localhost:8080/api/v1/wish/${id}`);
    console.log(response.data);
    setWish(response.data);
  };
  useEffect(() => {
    getWish(wishId);
  }, []);
  return (
    <BackLayout>
      <NavBar></NavBar>
      <div className="m-auto mt-[17vh] w-[30%] h-[50%] flex flex-col justify-center">
        {/* 조건부 렌더링으로 undefined 예외 처리 */}
        <p className="text-[32px] font-bold">{wish?.title}</p>
        <p className="text-[16px] ">{wish?.category}</p>
        <p className="text-[20px] font-bold">{wish?.content}</p>
      </div>
    </BackLayout>
  );
};

export default WishGetPage;
