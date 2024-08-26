import react from '@vitejs/plugin-react-swc';

const WishConfirmList: React.FC = () => {
  return (
    <div className="flex gap-3 mb-[2vh]">
      <div className="w-[50vw] h-[50px] border-2 border-silver-200 leading-[50px]"></div>
      <button className="w-[150px] h-[50px] bg-green-500">승인</button>
      <button className="w-[150px] h-[50px] bg-red-500">거절</button>
    </div>
  );
};

export default WishConfirmList;
