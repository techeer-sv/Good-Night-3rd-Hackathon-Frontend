import react from '@vitejs/plugin-react-swc';

const WishAddForm: React.FC = () => {
  return (
    <>
      <div className="my-[10vh] w-[50%] h-[60%] m-auto my-auto flex flex-col gap-10">
        <div className="w-[100%]">
          <span className="mr-[1vw] text-[20px] font-bold">소원제목</span>
          <input className="w-[80%] h-[50px] bg-white border-2 border-silver-200" />
        </div>
        <div>
          <span className="mr-[1vw] text-[20px] font-bold">소원제목</span>
          <select
            className="w-[30%] h-[50px] bg-white border-2 border-silver-200"
            id="category"
            name="category"
          >
            <option value="진로">진로</option>
            <option value="건강">건강</option>
            <option value="인간관계">인간관계</option>
            <option value="돈">돈</option>
            <option value="목표">목표</option>
            <option value="학업/성적">학업/성적</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div className="flex">
          <span className="mr-[1vw] text-[20px] font-bold">소원제목</span>
          <input className="w-[90%] h-[50vh] bg-white border-2 border-silver-200" />
        </div>
      </div>
      <button className="w-[100px] h-[50px] bg-pink-400 absolute right-[25%]">
        소원등록
      </button>
    </>
  );
};

export default WishAddForm;
