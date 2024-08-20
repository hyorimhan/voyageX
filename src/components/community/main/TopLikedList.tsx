'use client';

import { useQuery } from '@tanstack/react-query';
import { getTopLikedPosts } from '@/services/community';
import Link from 'next/link';
import Loading from '@/components/common/Loading';
import { Community } from '@/types/communityType';
import { HotPostBadge } from '../common/HotPostBadge';

const TopLikedList = () => {
  const {
    data: topPosts,
    isPending,
    isError,
  } = useQuery<Community[]>({
    queryKey: ['topLikedPosts'],
    queryFn: getTopLikedPosts,
  });

  if (isPending) return <Loading />;
  if (isError) return <div>핫 게시글을 불러오는 데 실패했습니다.</div>;

  return (
    <div>
      <div className='overflow-x-auto sm:p-1'>
        <div className='flex flex-col'>
          {topPosts.map((post) => (
            <Link href={post.id} key={post.id}>
              <div className='flex py-4 gap-x-4 items-center group sm:gap-x-1 sm:border-b-[1px] border-black-700 sm:py-4 sm:pr-1'>
                <div className='flex flex-grow items-center sm:flex-col sm:items-start sm:w-full sm:justify-between'>
                  <span className='flex-none w-32 p-2 text-center sm:w-auto sm:p-0 sm:mb-1'>
                    <HotPostBadge />
                  </span>
                  <span className='flex-grow p-2 overflow-hidden text-ellipsis whitespace-nowrap group-hover:underline lg:group-hover:font-semibold sm:p-0 sm:text-xs sm:w-full communitysm:max-w-[120px] sm:max-w-[190px] md:max-w-[230px]'>
                    {post.title}
                  </span>
                </div>
                <span className='flex-none w-32 p-2 text-center sm:text-xs sm:w-14 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-end sm:p-0 sm:pt-8'>
                  {new Date(post.created_at)
                    .toLocaleDateString('ko-KR', {
                      year: '2-digit',
                      month: 'numeric',
                      day: 'numeric',
                    })
                    .replace(/\.\s/g, '.')}
                </span>
                <span className='flex-none w-20 p-2 text-center sm:text-xs sm:w-10 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-center sm:p-0 sm:pt-8'>
                  {post.likes}
                </span>
                <span className='flex-none w-20 p-2 text-center sm:text-xs sm:w-10 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-center sm:p-0 sm:pt-8'>
                  {post.comments}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopLikedList;
