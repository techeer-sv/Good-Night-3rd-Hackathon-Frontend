import react from '@vitejs/plugin-react-swc';
import NavBar from '../component/NavBar';
import NavBtn from '../component/NavBtn';
import BackLayout from '../component/BackLayout';
import WishAddForm from '../component/wishadd/WishAddForm';

const WishAddPage: React.FC = () => {
  return (
    <BackLayout>
      <NavBar>
        <NavBtn buttonText="소원열매 달기" addClassName="text-[16px]"></NavBtn>
      </NavBar>
      <WishAddForm></WishAddForm>
    </BackLayout>
  );
};

export default WishAddPage;
