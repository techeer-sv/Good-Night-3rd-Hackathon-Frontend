'use client';

import { useEffect, useState } from 'react';
import getComments from '@/app/wish-fruit/[wishId]/_lib/getComments';

type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  deletedAt: Date | null;
};

type CommentsProps = {
  wishId: string;
};

export default function Comments({ wishId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getComments(wishId);
      setComments(response);
    };

    fetchComments();
  }, [wishId]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-yellow-600">댓글</h3>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
          placeholder="댓글을 입력하세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-200"
          // onClick={handleAddComment}
        >
          댓글 작성
        </button>
      </div>
      <ul className="mt-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border-b border-gray-300 py-2">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            {isAdmin && (
              <button
                className="text-red-500 text-sm mt-2"
                // onClick={() => handleDeleteComment(comment.id)}
              >
                댓글 삭제
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
