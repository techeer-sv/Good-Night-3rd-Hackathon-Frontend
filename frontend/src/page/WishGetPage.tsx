import react from '@vitejs/plugin-react-swc';
import BackLayout from '../component/wishget/Backlayout';
import NavBar from '../component/NavBar';
import { useState } from 'react';

const WishGetPage: React.FC = () => {
  return (
    <BackLayout>
      <NavBar></NavBar>
      <div className="m-auto mt-[17vh] w-[30%] h-[50%] flex flex-col justify-center">
        <p className="text-[32px] font-bold">취업 잘 되게 해주세요</p>
        <p className="text-[16px] ">진로</p>
        <p className="text-[20px] font-bold">
          ㅁㄴ엄ㄴ어ㅏ안머아ㅓㅁ너ㅏㅁㄴ어ㅏㅇㄴ마ㅓdd,ld
        </p>
      </div>
    </BackLayout>
  );
};

export default WishGetPage;
