'use client';

import { useRouter } from 'next/navigation';

export default function ApproveButton() {
  const router = useRouter();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/wish-fruit/allow');
  };
  return (
    <button
      className="btn glass bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200"
      onClick={onClick}
    >
      소원 승인 하기
    </button>
  );
}
