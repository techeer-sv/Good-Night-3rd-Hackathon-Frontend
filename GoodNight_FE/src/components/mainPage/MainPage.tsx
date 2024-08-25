import React, { useState } from 'react';
import Header from '../Header';

import treeBg from '../../asset/TreeBg.svg';
import fruit from '../../asset/Fruit.svg';
import arrowDown from '../../asset/Down.svg';
import RoleSwitcher from '../RoleSwitcher';

const MainPage: React.FC = () => {
  const [Dropdwon, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!Dropdwon);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div
        className="flex-1 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${treeBg})` }}
      >
        <div className="absolute inset-0 top-1/5 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-y-12 w-[75%] h-[85%]">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
              >
                {index == 2 && (
                  <div className="absolute -top-10 translate-y-16">
                    <button
                      className="bg-white border border-gray-400 px-10 py-2 text-black flex justify-between items-center"
                      onClick={toggleDropdown}
                    >
                      <span>전체</span>
                      <img
                        src={arrowDown}
                        alt="Dropdown Arrow"
                        className="ml-2 h-4"
                      />
                    </button>
                    {Dropdwon && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <ul className="py-1">
                          <li className="px-10 py-2 hover:bg-gray-200">
                            옵션 1
                          </li>
                          <li className="px-10 py-2 hover:bg-gray-200">
                            옵션 2
                          </li>
                          <li className="px-10 py-2 hover:bg-gray-200">
                            옵션 3
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                <img
                  src={fruit}
                  alt={`Fruit ${index + 1}`}
                  className="w-50 h-50"
                />
                <span className="mt-5 text-lg text-extrabold">
                  과일 {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RoleSwitcher />
    </div>
  );
};

export default MainPage;
