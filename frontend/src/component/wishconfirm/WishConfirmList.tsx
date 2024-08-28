import React from 'react';

interface WishConfirmListProps {
  onDecision: (isConfirmed: boolean) => void; // 승인/거절 결정 핸들러
  title: string;
}

const WishConfirmList: React.FC<WishConfirmListProps> = ({
  onDecision,
  title,
}) => {
  return (
    <div className="flex gap-3 mb-[2vh]">
      <div className="w-[50vw] h-[50px] border-2 border-silver-200 leading-[50px]">
        {title}
      </div>
      <button
        onClick={() => onDecision(true)} // 승인 버튼 클릭 시 true를 전달
        className="w-[150px] h-[50px] bg-green-500"
      >
        승인
      </button>
      <button
        onClick={() => onDecision(false)} // 거절 버튼 클릭 시 false를 전달
        className="w-[150px] h-[50px] bg-red-500"
      >
        거절
      </button>
    </div>
  );
};

export default WishConfirmList;
