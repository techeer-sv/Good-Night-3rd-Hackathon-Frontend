// 소원 열매 페이지(소원 상세 페이지)
import React from 'react';
import Header from '../Header';

import fruitBg from '../../asset/FruitBg.svg';

const WishFruit: React.FC = () => {
  const title = '취업 잘 되게 해주세요';
  const category = '진로';
  const description =
    '취업하기 위해 여러 회사에 지원하고 면접을 봤지만, 원하는 회사에서 좋은 결과가 있었으면 좋겠습니다.';
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
          <h1 className="text-3xl font-extrabold mb-4">{title}</h1>
          <p className="text-sm text-gray-500 mb-4">{category}</p>
          <p className="text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};
export default WishFruit;
