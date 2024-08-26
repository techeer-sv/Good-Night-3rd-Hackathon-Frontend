import React from 'react';
import BackLayout from '../component/wishall/BackLayout';
import NavBar from '../component/NavBar';
import NavBtn from '../component/NavBtn';
import ShowFruit from '../component/wishall/ShowFruits';

const WishTreePage: React.FC = () => {
  return (
    <BackLayout>
      <NavBar>
        <NavBtn buttonText="소원열매 달기" addClassName="text-[16px]"></NavBtn>
      </NavBar>
      {/* <ShowFruit></ShowFruit> */}
    </BackLayout>
  );
};

export default WishTreePage;
