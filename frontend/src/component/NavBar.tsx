import react from '@vitejs/plugin-react-swc';

const NavBar: React.FC = ({ children }) => {
  return (
    <div className="w-[100vw] h-[60px] bg-pink-500 flex justify-between">
      <p className="my-auto w-[231px] h-[42px] text-[32px] font-bold">
        Techeer Tree
      </p>
      {children}
    </div>
  );
};

export default NavBar;
