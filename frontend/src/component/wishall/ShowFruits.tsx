import React from 'react';
import fruitImg from '../../assets/fruit.png';

// Props 타입 정의
interface ShowFruitProps {
  wishTitle: string;
  onClick: (id: number) => void;
  wishId: number;
}

const ShowFruit: React.FC<ShowFruitProps> = ({
  wishTitle,
  onClick,
  wishId,
}) => {
  return (
    <div
      onClick={() => onClick(wishId)} // 수정된 부분
      className="w-[300px] h-[350px] flex flex-col justify-center items-center"
    >
      <img className="w-[150px] h-[150px]" src={fruitImg} alt="Fruit" />
      <p className="text-[25px] font-bold mt-[1vh]">{wishTitle}</p>
    </div>
  );
};

export default ShowFruit;
