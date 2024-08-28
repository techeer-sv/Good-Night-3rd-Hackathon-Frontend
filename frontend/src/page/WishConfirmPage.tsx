import React, { useEffect, useState } from 'react';
import BackLayout from '../component/BackLayout';
import NavBar from '../component/NavBar';
import NavBtn from '../component/NavBtn';
import WishConfirmList from '../component/wishconfirm/WishConfirmList';
import useWishStore from '../wishstore';
import axios from 'axios';

const WishConfirmPage: React.FC = () => {
  const { wishList } = useWishStore(); // wishList를 가져옵니다.
  const [state, setState] = useState<number>(0);

  // 소원을 승인하는 함수
  const handleConfirm = async (wishId: number, confirm: boolean) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/wish/approval/${wishId}`, // 슬래시 수정
        { confirm: confirm },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      console.log(`소원 ID ${wishId} ${confirm ? '승인됨' : '거절됨'}.`);
      setState((pre) => pre + 1);
    } catch (error) {
      console.error('Error confirming wish:', error);
    }
  };

  useEffect(() => {
    console.log(wishList);
  }, [state]);

  return (
    <BackLayout>
      <NavBar>
        <NavBtn buttonText="소원승인하기" />
      </NavBar>
      <div className="m-auto w-[50%] h-[50%] flex flex-col justify-center">
        <p className="text-[32px] font-bold mb-[2vh]">소원열매 승인</p>
        {wishList
          .filter((wish) => wish.isConfirmed === null) // 필터링 조건을 적용합니다.
          .map((wish) => (
            <WishConfirmList
              key={wish.wishId}
              title={wish.title}
              onDecision={(isConfirmed) =>
                handleConfirm(wish.wishId, isConfirmed)
              } // 승인/거절 결정 핸들러 설정
            />
          ))}
      </div>
    </BackLayout>
  );
};

export default WishConfirmPage;
