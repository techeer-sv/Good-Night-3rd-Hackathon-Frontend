import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserRole = 'Admin' | 'User';

interface UserContextType {
  role: UserRole;
  toggleRole: () => void;
}

// 기본값
const UserContext = createContext<UserContextType | undefined>(undefined);

//Provider 컴포넌트 생성
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<UserRole>(() => {
    // 로컬 스토리지에서 사용자 권한을 가져와 초기화
    const savedRole = localStorage.getItem('userRole') as UserRole;
    return savedRole || 'User';
  });

  // 사용자 권한 전환 함수
  const toggleRole = () => {
    const newRole = role === 'Admin' ? 'User' : 'Admin';
    setRole(newRole);
    localStorage.setItem('userRole', newRole); // 로컬 스토리지에 사용자 권한 저장
  };

  return (
    <UserContext.Provider value={{ role, toggleRole }}>
      {children}
    </UserContext.Provider>
  );
};

// 컨텍스트 훅
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
