'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type AuthContextType = {
  isAdmin: boolean;
  toggleAdmin: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    // 초기값을 로컬 스토리지에서 가져옴
    const storedIsAdmin = localStorage.getItem('isAdmin');
    return storedIsAdmin === 'true'; // 'true' 문자열을 boolean으로 변환
  });

  const toggleAdmin = () => {
    setIsAdmin((prev) => {
      const newValue = !prev;
      localStorage.setItem('isAdmin', newValue.toString()); // 값이 변경될 때 로컬 스토리지에 저장
      return newValue;
    });
  };

  return (
    <AuthContext.Provider value={{ isAdmin, toggleAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};
