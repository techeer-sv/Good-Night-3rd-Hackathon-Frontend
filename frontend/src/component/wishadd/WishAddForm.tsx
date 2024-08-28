import react from '@vitejs/plugin-react-swc';
import axios from 'axios';
import { useState } from 'react';
import { CreatedWish } from '../../interface/Wish';
import { createWish } from '../../service/WishService';
import { useNavigate } from 'react-router-dom';

const WishAddForm: React.FC = () => {
  const [category, setCategory] = useState<String>('');
  const [title, setTitle] = useState<String>('');
  const [content, setContent] = useState<String>('');

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const HandleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };
  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };
  const handleValueTest = () => {
    console.log(title);
    console.log(category);
    console.log(content);
  };

  const navigate = useNavigate();
  const handleSubmitWish = async () => {
    const wish: CreatedWish = {
      title: title,
      category: category,
      content: content,
    };

    const response = await createWish(wish);
    console.log(response);
    navigate('/');
  };

  return (
    <>
      <div className="my-[10vh] w-[50%] h-[60%] m-auto my-auto flex flex-col gap-10">
        <div className="w-[100%]">
          <span className="mr-[1vw] text-[20px] font-bold">소원제목</span>
          <input
            className="w-[80%] h-[50px] bg-white border-2 border-silver-200"
            onChange={handleTitle}
          />
        </div>
        <div>
          <span className="mr-[1vw] text-[20px] font-bold">소원제목</span>
          <select
            className="w-[30%] h-[50px] bg-white border-2 border-silver-200"
            id="category"
            name="category"
            onChange={handleCategory}
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
          <input
            onChange={HandleContent}
            className="w-[90%] h-[50vh] bg-white border-2 border-silver-200"
          />
        </div>
      </div>
      <button
        // onClick={handleValueTest}
        onClick={handleSubmitWish}
        className="w-[100px] h-[50px] bg-pink-400 absolute right-[25%]"
      >
        소원등록
      </button>
    </>
  );
};

export default WishAddForm;
