import react from '@vitejs/plugin-react-swc';
import BackLayout from '../component/BackLayout';
import NavBar from '../component/NavBar';
import NavBtn from '../component/NavBtn';
import WishConfirmList from '../component/wishconfirm/WishConfirmList';

const WishConfirmPage: React.FC = () => {
  return (
    <BackLayout>
      <NavBar>
        <NavBtn buttonText="소원승인하기"></NavBtn>
      </NavBar>
      <div className="m-auto w-[50%] h-[50%] flex flex-col justify-center">
        <p className="text-[32px] font-bold mb-[2vh]">소원열매 승인</p>
        <WishConfirmList></WishConfirmList>
        <WishConfirmList></WishConfirmList>
        <WishConfirmList></WishConfirmList>
        <WishConfirmList></WishConfirmList>
      </div>
    </BackLayout>
  );
};
export default WishConfirmPage;
