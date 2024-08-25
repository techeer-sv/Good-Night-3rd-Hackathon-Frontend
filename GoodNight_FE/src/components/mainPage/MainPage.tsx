import React, { useEffect, useState } from 'react';
import Header from '../Header';

import treeBg from '../../asset/TreeBg.svg';
import fruit from '../../asset/Fruit.svg';
import arrowDown from '../../asset/Down.svg';
import RoleSwitcher from '../RoleSwitcher';
import { getWishes, Wish } from '../../service/getWishes';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [Dropdwon, setDropdown] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState<string | undefined>(
    undefined,
  );
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleDropdown = () => {
    setDropdown(!Dropdwon);
  };

  const handleFilterChange = async (status: string | undefined) => {
    setConfirmStatus(status);
    setDropdown(false); // 드롭다운 닫기
    await fetchWishes(status); // 선택된 필터 값으로 소원 목록을 새로 가져오기
  };

  const fetchWishes = async (confirm?: string) => {
    setLoading(true);
    try {
      const pageable = {
        page: 0,
        size: 9,
        sort: ['createdDate,desc'], // 정렬 기준 (예: 생성일 기준 내림차순)
      };
      const result = await getWishes(pageable, confirm);
      console.log(result);
      setWishes(result);
    } catch (err) {
      setError('소원 목록을 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes(confirmStatus); // 컴포넌트가 처음 렌더링될 때 기본값으로 소원 목록 가져오기
  }, [confirmStatus]);

  if (error) {
    return <div>{error}</div>;
  }

  const navigate = useNavigate();

  const handleNaviage = (id: number) => {
    if (id) {
      navigate(`/wish-fruit/${id}`);
    }
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
            {loading && <div>Loading</div>}
            {!loading && wishes.length > 0 ? (
              wishes.map((wish, index) => (
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
                            <li
                              className="px-10 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleFilterChange(undefined)} // 전체 조회
                            >
                              전체
                            </li>
                            <li
                              className="px-10 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleFilterChange('PENDING')}
                            >
                              PENDING
                            </li>
                            <li
                              className="px-10 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleFilterChange('APPROVED')}
                            >
                              APPROVED
                            </li>
                            <li
                              className="px-10 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleFilterChange('REJECTED')}
                            >
                              REJECTED
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
                    onClick={() => handleNaviage(wish?.id)}
                  />
                  <span className="mt-5 text-lg text-extrabold">
                    {wish.title}
                  </span>
                </div>
              ))
            ) : (
              <div>No wishes available</div> // 데이터가 없을 때 표시
            )}
          </div>
        </div>
      </div>
      <RoleSwitcher />
    </div>
  );
};

export default MainPage;
