'use client';
import {
  deleteComments,
  getComments,
  updateComment,
} from '@/services/community';
import { Comment, TEditComment } from '@/types/communityType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import CommentsWrite from './CommentsWrite';
import useAuthStore from '@/zustand/store/useAuth';
import CommentWriterIcon from '../ProfileImages/CommentWriter';

const CommentList = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const [editMode, setEditMode] = useState<string | null>(null);
  const [newContent, setNewContent] = useState('');

  const {
    data: comments = [],
    isPending,
    isError,
  } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
  });

  const { mutate: removeComment } = useMutation({
    mutationFn: (id: string) => deleteComments(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['comments', postId] }),
  });

  const { mutate: editComment } = useMutation({
    mutationFn: (editComment: TEditComment) => updateComment(editComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setEditMode(null);
      setNewContent('');
    },
  });

  const handleClickDelete = (id: string) => {
    removeComment(id);
  };

  const handleClickEdit = (comment: Comment) => {
    setEditMode(comment.id);
    setNewContent(comment.content);
  };

  const handleSaveEdit = (id: string) => {
    if (!user) return;
    editComment({ id, content: newContent, post_id: postId, user_id: user.id });
    console.log('Saving comment with id:', id, 'and new content:', newContent);
  };

  if (isPending) return <div>Loading</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className='flex flex-col gap-y-5'>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editMode === comment.id ? (
            <form className='relative border-t-[1px] border-black-700 pt-8'>
              <label
                htmlFor='comment'
                className='absolute top-11 left-2 text-sm text-gray-200 ml-5'
              >
                댓글 수정
              </label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                maxLength={200}
                className='w-full h-28 bg-transparent border-black-700 border-[3px] rounded-lg pt-8 pl-6 pr-28 focus:outline-none focus:border-gray-300 transition-colors duration-200 ease-in-out resize-none'
              />
              <div className='flex text-sm text-black-400'>
                <button
                  onClick={() => handleSaveEdit(comment.id)}
                  type='submit'
                  className='text-[13px] absolute right-2 bottom-5 bg-transparent text-white py-1 px-3 rounded-md border-primary-400 border-2 hover:bg-primary-200 hover:border-primary-200 transition-colors duration-200'
                >
                  저장
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className='
                  absolute
                  right-16
                  bottom-5
                  bg-black-600
                  text-white
                  py-1
                  px-3
                  rounded-md
                  border-black-600
                  border-2
                  hover:bg-primary-200
                  hover:border-primary-200
                  transition-colors
                  duration-200
                  text-[13px]'
                >
                  취소
                </button>
              </div>
            </form>
          ) : (
            <div className='flex flex-col gap-4 border-t-[1px] border-black-700 justify-center'>
              <div className='flex gap-2 pt-8'>
                <CommentWriterIcon />
                외계인
              </div>
              <div>{comment.content}</div>
              <div className='flex gap-2 mb-2 text-sm text-black-400'>
                <p>{new Date(comment.created_at).toLocaleDateString()}</p>
                {user?.id === comment.user_id && (
                  <div className='flex flex-row'>
                    <button onClick={() => handleClickDelete(comment.id)}>
                      삭제
                    </button>
                    <p>ㅣ</p>
                    <button onClick={() => handleClickEdit(comment)}>
                      수정
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      <CommentsWrite postId={postId} />
    </div>
  );
};

export default CommentList;
