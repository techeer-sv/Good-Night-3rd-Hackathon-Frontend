'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };
  return (
    <button
      className="fixed bottom-12 left-12 z-50 btn-circle w-fit"
      onClick={onClick}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 211 211"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M96.7083 52.75L43.9583 105.5M43.9583 105.5L96.7083 158.25M43.9583 105.5H167.042"
          stroke="white"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
