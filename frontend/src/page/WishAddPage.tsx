import react from '@vitejs/plugin-react-swc';
import NavBar from '../component/NavBar';
import NavBtn from '../component/NavBtn';
import BackLayout from '../component/BackLayout';

const WishAddPage: React.FC = () => {
  return (
    <BackLayout>
      <NavBar>
        <NavBtn></NavBtn>
      </NavBar>
    </BackLayout>
  );
};

export default WishAddPage;
