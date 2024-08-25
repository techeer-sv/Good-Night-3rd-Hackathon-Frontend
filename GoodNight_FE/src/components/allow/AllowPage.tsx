import React from 'react';
import Header from '../Header';

import okay from '../../asset/Okay.svg';
import no from '../../asset/No.svg';

const AllowPage: React.FC = () => {
  const wishTitles = [
    '소원 제목 1',
    '소원 제목 2',
    '소원 제목 3',
    '소원 제목 4',
    // 추가 소원 제목들...
  ];

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-col items-center w-full h-full p-6">
        <h1 className="text-3xl font-bold mb-6 mt-10">소원 열매 승인</h1>
        <div className="w-full max-w-4xl">
          {wishTitles.map((title, index) => (
            <div key={index} className="flex items-center mb-4">
              <div className="flex-1 py-2 p-4 border border-gray-300 rounded-lg bg-white mr-4">
                <p className="text-lg">{title}</p>
              </div>
              <div className="flex space-x-4">
                <img
                  src={okay}
                  alt="Image 1"
                  className="w-10 h-10 object-cover"
                />
                <img
                  src={no}
                  alt="Image 2"
                  className="w-10 h-10 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllowPage;
