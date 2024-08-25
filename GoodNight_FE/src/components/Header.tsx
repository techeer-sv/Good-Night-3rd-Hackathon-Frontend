import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="bg-pink-400 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-white text-2xl font-extrabold">Techeer Tree</div>
      <div className="text-white text-lg font-extrabold">소원 열매 달기</div>
    </div>
  );
};

export default Header;
