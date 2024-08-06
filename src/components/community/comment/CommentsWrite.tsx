import { insertComment } from '@/services/community';
import { TWriteComment } from '@/types/communityType';
import useAuthStore from '@/zustand/store/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

const CommentsWrite = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const [content, setContent] = useState('');
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: TWriteComment) => insertComment(newComment),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['comments', postId] }),
  });

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return alert('로그인 후 이용하실 수 있습니다');
    const newComment = {
      post_id: postId,
      user_id: user?.id as string,
      content: content,
    };
    if (!content) {
      return alert('빈칸을 채워주세요.');
    }
    addComment(newComment);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmitComment} className='relative w-full'>
      <div className='relative w-full'>
        <div className='relative'>
          <label
            htmlFor='comment'
            className='absolute top-3 left-2 text-sm text-gray-200 ml-5'
          >
            {userId === user?.id ? '우주인' : '외계인'}
          </label>
          <textarea
            id='comment'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full h-28 bg-transparent border-black-700 border-[3px] rounded-lg pt-8 pl-6 pr-20 focus:outline-none focus:border-gray-300 transition-colors duration-200 ease-in-out resize-none'
            placeholder='댓글을 남겨보세요.'
            maxLength={200}
          />
          <div className='absolute top-2 right-2 text-gray-400 text-sm'>
            {content.length}/200
          </div>
        </div>
        <button
          type='submit'
          className='text-[13px] absolute right-2 bottom-4 bg-transparent text-white py-1 px-3 rounded-md border-primary-400 border-2 hover:bg-primary-200 hover:border-primary-200 transition-colors duration-200'
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default CommentsWrite;
