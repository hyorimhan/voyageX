'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getPostAll, getPostByCategory } from '@/services/community';
import { Community } from '@/types/communityType';
import { useCategory } from '@/zustand/store/useCategory';
import CategoryBadge from '../common/CategoryBadge';
import Loading from '@/components/common/Loading';
import { useState } from 'react';
import Pagination from '@/components/common/Pagination';

const PostList = () => {
  const selectedCategory = useCategory((state) => state.selectedCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const {
    data: postData,
    isPending,
    isError,
  } = useQuery<{
    posts: Community[];
    total: number;
    page: number;
    totalPages: number;
  }>({
    queryKey: ['post', selectedCategory, currentPage],
    queryFn: () => {
      if (selectedCategory === 'All') {
        return getPostAll(currentPage, ITEMS_PER_PAGE);
      } else {
        return getPostByCategory(selectedCategory, currentPage, ITEMS_PER_PAGE);
      }
    },
  });

  console.log(postData);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending)
    return (
      <div>
        <Loading />
      </div>
    );

  const posts = postData?.posts || [];
  if (isError) return <div>error</div>;

  return (
    <div className='overflow-x-auto'>
      <div className='flex flex-col'>
        <div className='flex mb-[10px] border-b-[0.4px] border-white text-center gap-x-4'>
          <span className='flex-none w-32 p-2 text-lg font-normal text-white'>
            카테고리
          </span>
          <span className='flex-grow p-2 text-lg font-normal text-white'>
            제목
          </span>
          <span className='flex-none w-32 p-2 text-lg font-normal text-white'>
            날짜
          </span>
          <span className='flex-none w-20 p-2 text-lg font-normal text-white'>
            좋아요
          </span>
          <span className='flex-none w-20 p-2 text-lg font-normal text-white'>
            댓글
          </span>
        </div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link href={post.id} key={post.id}>
              <div className='flex py-4 gap-x-4 items-center group'>
                <span className='flex-none w-32 p-2 text-center'>
                  <CategoryBadge category={post.category} />
                </span>
                <span className='flex-grow p-2 mx-7 overflow-hidden whitespace-nowrap text-ellipsis group-hover:font-bold group-hover:underline'>
                  {post.title}
                </span>
                <span className='flex-none w-32 p-2 text-center'>
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span className='flex-none w-20 p-2 text-center'>
                  {post.likes}
                </span>
                <span className='flex-none w-20 p-2 text-center'>
                  {post.comments}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className='p-4 text-center text-gray-500'>
            작성된 글이 없습니다.
          </div>
        )}
      </div>
      {postData && (
        <Pagination
          currentPage={postData.page || 1}
          totalPages={postData.totalPages || 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PostList;
