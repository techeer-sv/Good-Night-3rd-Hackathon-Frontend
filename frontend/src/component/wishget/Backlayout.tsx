import React from 'react';

import bgImg from '../../assets/fruit2.png';

const BackLayout: React.FC = ({ children }) => {
  return (
    <div
      className="w-[100vw] h-[1034px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: '50%' }}
    >
      {children}
    </div>
  );
};

export default BackLayout;
