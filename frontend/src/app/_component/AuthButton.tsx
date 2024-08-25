'use client';

import { useAuth } from '@/app/_component/AuthContext';

export default function AuthButton() {
  const { isAdmin, toggleAdmin } = useAuth();

  const handleToggle = () => {
    toggleAdmin();
  };

  return (
    <label className="swap swap-rotate size-10 fixed bottom-12 right-12 z-50">
      {/* 체크박스로 상태 관리 */}
      <input type="checkbox" checked={isAdmin} onChange={handleToggle} />

      {/* 유저 아이콘 */}
      <svg
        className="swap-off h-10 w-10 fill-current"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1C8.96243 1 6.5 3.46243 6.5 6.5C6.5 9.53757 8.96243 12 12 12C15.0376 12 17.5 9.53757 17.5 6.5C17.5 3.46243 15.0376 1 12 1Z"
          fill="#000000"
        />
        <path
          d="M7 14C4.23858 14 2 16.2386 2 19V22C2 22.5523 2.44772 23 3 23H21C21.5523 23 22 22.5523 22 22V19C22 16.2386 19.7614 14 17 14H7Z"
          fill="#000000"
        />
      </svg>

      {/* 어드민 아이콘 */}
      <svg
        className="swap-on h-10 w-10 fill-current"
        fill="#000000"
        viewBox="0 0 1920 1920"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1556.611 1920c-54.084 0-108.168-20.692-149.333-61.857L740.095 1190.96c-198.162 41.712-406.725-19.269-550.475-163.019C14.449 852.771-35.256 582.788 65.796 356.27l32.406-72.696 390.194 390.193c24.414 24.305 64.266 24.305 88.68 0l110.687-110.686c11.824-11.934 18.283-27.59 18.283-44.34 0-16.751-6.46-32.516-18.283-44.34L297.569 84.207 370.265 51.8C596.893-49.252 866.875.453 1041.937 175.515c155.026 155.136 212.833 385.157 151.851 594.815l650.651 650.651c39.961 39.852 61.967 92.95 61.967 149.443 0 56.383-22.006 109.482-61.967 149.334l-138.275 138.385c-41.275 41.165-95.36 61.857-149.553 61.857Z"
          fillRule="evenodd"
        />
      </svg>
    </label>
  );
}
