import React from 'react';

import bgImg from '../../assets/tree.png';

const BackLayout: React.FC = ({ children }) => {
  return (
    <div
      className="w-[100vw] h-[1034px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {children}
    </div>
  );
};

export default BackLayout;
