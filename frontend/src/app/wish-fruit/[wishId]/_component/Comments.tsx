'use client';

import { useEffect, useState } from 'react';
import getComments from '@/app/wish-fruit/[wishId]/_lib/getComments';
import postComment from '@/app/wish-fruit/[wishId]/_lib/postComment';
import { useAuth } from '@/app/_component/AuthContext';
import deleteComment from '@/app/wish-fruit/[wishId]/_lib/deleteComment';
import { Comment } from '@/model/Comment';

type CommentsProps = {
  wishId: string;
};

export default function Comments({ wishId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getComments(wishId);
      setComments(response);
    };

    fetchComments();
  }, [wishId]);

  const handleAddComment = async () => {
    await postComment({ wishId: wishId, content: commentText });

    // 댓글 추가 후 댓글 목록 다시 조회
    const response = await getComments(wishId);
    setComments(response);

    // 댓글 입력란 비우기
    setCommentText('');
  };

  const handleDeleteComment = async (commentId: string) => {
    if (isAdmin) {
      await deleteComment(commentId);

      // 댓글 삭제 후 댓글 목록 다시 조회
      const response = await getComments(wishId);
      setComments(response);
    }
  };

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
          onClick={handleAddComment}
        >
          댓글 작성
        </button>
      </div>
      <ul className="mt-4">
        {comments.map((comment: Comment) => (
          <li
            key={comment.id}
            className="border-b border-gray-300 py-2 flex flex-row justify-between"
          >
            <div className="flex flex-col">
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
            {isAdmin && (
              <button
                className="text-red-500 text-sm"
                onClick={() => handleDeleteComment(comment.id)}
              >
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
