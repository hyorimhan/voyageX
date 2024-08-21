'use client';

import { formatDate } from '@/components/common/formatDate';
import Loading from '@/components/common/Loading';
import { getMyPosts } from '@/services/community';
import { Community, MyPost } from '@/types/communityType';
import useAuthStore from '@/zustand/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

const MyPostList = () => {
  const { user } = useAuthStore();
  const user_id = user?.id;

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<MyPost[]>({
    queryKey: ['posts', user_id],
    queryFn: () => getMyPosts(user_id),
  });

  if (isLoading) return <Loading />;
  if (isError || !posts || posts.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center gap-9 mt-16'>
        <Image
          src='/images/arcticons_spacenow.svg'
          alt='spacenow'
          width={80}
          height={80}
        />
        <div>
          <p className='text-xl'>작성한 글이 없습니다.</p>
          <p className='text-sm mt-[7px]'>새로운 글을 작성해 채워보세요.</p>
        </div>
        <Link
          href={'/community'}
          className='h-[43px] w-[230px] bg-primary-600 rounded-md text-black-50 justify-center items-center flex hover:bg-primary-400 active:bg-primary-500'
        >
          FREE BOARD 바로가기
        </Link>
      </div>
    );
  }

  return (
    <>
      {posts?.map((post) => {
        const formattedDate = formatDate(post.created_at);
        const likeCount = post.likes?.length || 0;

        return (
          <div key={post.id}>
            <div className='gap-2 flex flex-col p-6 sm:p-6 sm:gap-4'>
              <div className='text-xs flex justify-between h-6'>
                <p>{formattedDate}</p>
                <div className='flex gap-2'>
                  <p className='bg-primary-100 text-primary-500 px-3 rounded-2xl text-[10px] font-bold flex items-center justify-center w-16'>
                    좋아요 {likeCount}
                  </p>
                  <p className='bg-primary-100 text-primary-500 px-3 rounded-2xl text-[10px] font-bold flex items-center justify-center w-16'>
                    댓글수 {post.comments}
                  </p>
                </div>
              </div>
              <p className='font-bold line-clamp-1'>{post.title}</p>
              <div>
                <p className='text-black-300 mb-4 text-sm md:text-base'>
                  {post.content.replace(/<\/?[^>]+(>|$)/g, '').length > 120
                    ? `${post.content
                        .replace(/<\/?[^>]+(>|$)/g, '')
                        .substring(0, 120)}...`
                    : post.content.replace(/<\/?[^>]+(>|$)/g, '')}
                </p>
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
