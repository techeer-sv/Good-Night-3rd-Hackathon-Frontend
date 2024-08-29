'use client';

import { useRouter } from 'next/navigation';
import postWish from '@/app/wish/_lib/postWish';
import { useAuth } from '@/app/_component/AuthContext';
import { SubmitHandler, useForm } from 'react-hook-form';

type CategoryType =
  | ''
  | '진로'
  | '건강'
  | '인간 관계'
  | '돈'
  | '목표'
  | '학업/성적'
  | '기타';

type FormValues = {
  title: string;
  content: string;
  category: CategoryType;
};

export default function WishForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      content: '',
      category: '',
    },
  });
  const router = useRouter();
  const { isAdmin } = useAuth();

  const categories = [
    { value: '', label: '모든 카테고리' },
    { value: '진로', label: '진로' },
    { value: '건강', label: '건강' },
    { value: '인간 관계', label: '인간 관계' },
    { value: '돈', label: '돈' },
    { value: '목표', label: '목표' },
    { value: '학업/성적', label: '학업/성적' },
    { value: '기타', label: '기타' },
  ];

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await postWish(data);

      // 등록 후 페이지 이동
      router.push('/');
    } catch (error) {
      console.error('소원 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isAdmin) {
    return (
      <div className="my-auto p-6 flex items-center justify-center glass rounded-lg w-1/2">
        <p className="text-2xl text-red-600 font-bold my-auto">
          유저가 아니면 이 페이지에 접근할 권한이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-purple-800 bg-opacity-50 shadow-md rounded-lg p-8 my-auto glass">
      <h2 className="text-2xl font-bold text-center text-yellow-300 mb-6">
        소원 빌기
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block text-yellow-300">제목</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register('title', { required: '제목을 입력해주세요' })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-yellow-300">내용</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register('content', { required: '내용을 입력해주세요' })}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <div>
          <label className="block text-yellow-300">카테고리</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register('category', { required: '카테고리를 선택해주세요' })}
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-yellow-300 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200"
        >
          {isSubmitting ? '등록 중...' : '소원 등록'}
        </button>
      </form>
    </div>
  );
}
