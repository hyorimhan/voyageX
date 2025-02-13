'use client';
import {
  deleteComments,
  getComments,
  updateComment,
} from '@/services/community';
import { Comment, TEditComment } from '@/types/communityType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuthStore from '@/zustand/store/useAuth';
import CommentWriterIcon from '../ProfileImages/CommentWriter';
import Loading from '@/components/common/Loading';
import PostWriterIcon from '../ProfileImages/PostWriter';
import toast from 'react-hot-toast';
import CommentsWrite from './CommentsWrite';
import GenericModal from '@/components/common/GenericModal';

const CommentList = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const [editMode, setEditMode] = useState<string | null>(null);
  const [newContent, setNewContent] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const isContentValid = (content: string) => {
    return content.split('\n').some((line) => line.trim().length >= 2);
  };

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
    onMutate: async (deletedCommentId) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });
      const previousComments = queryClient.getQueryData<Comment[]>([
        'comments',
        postId,
      ]);
      queryClient.setQueryData(['comments', postId], (old: Comment[] = []) =>
        old.filter((comment) => comment.id !== deletedCommentId),
      );
      return { previousComments };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['comments', postId], context?.previousComments);
      toast.error('댓글 삭제에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.');
    },
  });

  const { mutate: editComment } = useMutation({
    mutationFn: (editComment: TEditComment) => updateComment(editComment),
    onMutate: async (updatedComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });
      const previousComments = queryClient.getQueryData<Comment[]>([
        'comments',
        postId,
      ]);
      queryClient.setQueryData(['comments', postId], (old: Comment[] = []) =>
        old.map((comment) =>
          comment.id === updatedComment.id
            ? { ...comment, ...updatedComment }
            : comment,
        ),
      );
      return { previousComments };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['comments', postId], context?.previousComments);
      toast.error('댓글 수정에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onSuccess: () => {
      setEditMode(null);
      setNewContent('');
      toast.success('댓글이 수정되었습니다.');
    },
  });

  const handleClickDelete = (id: string) => {
    setCommentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (commentToDelete) {
      removeComment(commentToDelete);
      setIsDeleteModalOpen(false);
      setCommentToDelete(null);
    }
  };

  const handleClickEdit = (comment: Comment) => {
    setEditMode(comment.id);
    setNewContent(comment.content);
  };

  const handleSaveEdit = (id: string) => {
    if (!user) return;

    if (!isContentValid(newContent)) {
      toast.error('댓글은 최소 2글자 이상이어야 합니다.');
      return;
    }

    const processedContent = newContent
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join('\n');

    editComment({
      id,
      content: processedContent,
      post_id: postId,
      user_id: user.id,
    });
  };

  if (isPending)
    return (
      <div>
        <Loading />
      </div>
    );

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
              <div className='absolute top-10 right-2 text-gray-400 text-sm'>
                {newContent.length}/200
              </div>
              <div className='flex text-sm text-black-400'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveEdit(comment.id);
                  }}
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
              {userId === comment.user_id ? (
                <div className='flex gap-2 pt-8 items-center'>
                  <PostWriterIcon />
                  익명의 우주인
                  <div className='flex px-2 py-1 bg-black-50 rounded-3xl font-bold text-black-1000 text-xs items-center justify-center'>
                    작성자
                  </div>
                </div>
              ) : (
                <div className='flex gap-2 pt-8'>
                  <CommentWriterIcon />
                  익명의 외계인
                </div>
              )}
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
      <CommentsWrite postId={postId} userId={userId} />
      <GenericModal
        isOpen={isDeleteModalOpen}
        title='댓글 삭제'
        content='정말로 이 댓글을 삭제하시겠습니까?'
        buttonText='삭제'
        buttonAction={confirmDelete}
        cancelText='취소'
        cancelAction={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default CommentList;
