import { getMyPosts } from '@/services/community';
import useAuthStore from '@/zustand/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyPostList = () => {
  const { user } = useAuthStore();

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery(['myPosts', user.id], () => getMyPosts(user.id));

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>오류 발생: {error.message}</p>;
  }
  return (
    <>
      {posts?.map((post) => (
        <div key={post.id} className='px-10'>
          <div className='gap-3 flex flex-col'>
            <p className='font-bold line-clamp-1 text-lg'>{post.title}</p>
            <div>
              <p className='line-clamp-4'>{post.content}</p>
            </div>
          </div>
          <div className='text-xs flex justify-between mt-7'>
            <p>{post.date}</p>
            <div className='flex gap-5'>
              <p>좋아요 수 {post.likes}</p>
              <p>댓글 수 {post.comments}</p>
            </div>
          </div>
          <div className='border-b-2 border-solid border-black-700 mt-7'></div>
        </div>
      ))}
    </>
  );
};

export default MyPostList;
