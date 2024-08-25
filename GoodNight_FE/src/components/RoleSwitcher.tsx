import React from 'react';
import { useUserContext } from '../context/UserContext';
import adminIcon from '../asset/Admin.svg';
import userIcon from '../asset/User.svg';

const RoleSwitcher: React.FC = () => {
  const { role, toggleRole } = useUserContext();

  return (
    <button
      onClick={toggleRole}
      className="fixed bottom-4 right-5 p-2 bg-white rounded-full"
    >
      <img
        src={role === 'User' ? userIcon : adminIcon}
        alt="Role Icon"
        className="w-15 h-15"
      />
    </button>
  );
};

export default RoleSwitcher;
