import react from '@vitejs/plugin-react-swc';

const NavBtn: React.FC = ({ onClick, buttonText, addClassName }) => {
  return (
    <button onClick={onClick} className={`my-auto ${addClassName}`}>
      {buttonText}
    </button>
  );
};

export default NavBtn;
