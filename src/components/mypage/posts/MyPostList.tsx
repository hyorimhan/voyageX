'use client';

import { formatDate } from '@/components/common/formatDate';
import { getMyPosts } from '@/services/community';
import { MyPost } from '@/types/communityType';
import useAuthStore from '@/zustand/store/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyPostList = () => {
  const { user } = useAuthStore();
  const user_id = user?.id;

  const { data: posts } = useQuery<MyPost[]>({
    queryKey: ['posts', user_id],
    queryFn: () => getMyPosts(user_id),
  });

  return (
    <>
      {posts?.map((post) => {
        const formattedDate = formatDate(post.created_at);
        return (
          <div key={post.id}>
            <div className='gap-2 flex flex-col p-6'>
              <div className='text-xs flex justify-between h-6'>
                <p>{formattedDate}</p>
                <div className='flex gap-2'>
                  <p className='bg-primary-100 text-primary-500 px-3 rounded-2xl text-[10px] font-bold flex items-center justify-center w-16'>
                    좋아요 10
                  </p>
                  <p className='bg-primary-100 text-primary-500 px-3 rounded-2xl text-[10px] font-bold flex items-center justify-center w-16'>
                    댓글수 {post.comments}
                  </p>
                </div>
              </div>
              <p className='font-bold line-clamp-1'>{post.title}</p>
              <div>
                <p className='line-clamp-4 text-sm'>{post.content}</p>
              </div>
            </div>
            <div className='border-b-[1px] border-solid border-black-700'></div>
          </div>
        );
      })}
    </>
  );
};

export default MyPostList;
