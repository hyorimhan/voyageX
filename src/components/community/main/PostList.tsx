'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getPostAll, getPostByCategory } from '@/services/community';
import { Community } from '@/types/communityType';
import { useCategory } from '@/zustand/store/useCategory';
import CategoryBadge from '../common/CategoryBadge';
import Loading from '@/components/common/Loading';
import { useState, useEffect } from 'react';
import Pagination from '@/components/common/Pagination';
import TopLikedPosts from './TopLikedList';

const PostList = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setSelectedCategory('All');
  }, [setSelectedCategory]);

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
        <div className='flex mb-[10px] border-b-[0.4px] border-white text-center gap-x-4 sm:gap-x-1'>
          <span className='flex-none w-32 p-2 text-lg font-normal text-white sm:hidden'>
            카테고리
          </span>
          <span className='flex-grow p-2 text-lg font-normal text-white sm:text-sm sm:flex-grow sm:items-center'>
            제목
          </span>
          <span className='flex-none w-32 p-2 text-lg font-normal text-white sm:text-sm sm:w-20 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-center'>
            작성일
          </span>
          <span className='flex-none w-20 p-2 text-lg font-normal text-white sm:text-sm sm:w-14 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-center'>
            좋아요
          </span>
          <span className='flex-none w-20 p-2 text-lg font-normal text-white sm:text-sm sm:w-14 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-center'>
            댓글
          </span>
        </div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link href={post.id} key={post.id}>
              <div className='flex py-4 gap-x-4 items-center group sm:gap-x-1 sm:border-b-[1px] border-black-700'>
                <div className='flex flex-grow sm:flex-col sm:items-start sm:w-full sm:justify-between'>
                  <span className='flex-none w-32 p-2 text-center sm:w-auto transition sm:-translate-y-2'>
                    <CategoryBadge category={post.category} />
                  </span>
                  <span className='flex-grow p-2 overflow-hidden text-ellipsis group-hover:underline sm:ml-1 sm:mb-4 sm:text-left sm:text-sm sm:flex-grow sm:-translate-y-3'>
                    {post.title}
                  </span>
                </div>
                <span className='flex-none w-32 p-2 text-center sm:text-sm sm:w-20 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-center'>
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span className='flex-none w-20 p-2 text-center sm:text-sm sm:w-14 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-center'>
                  {post.likes}
                </span>
                <span className='flex-none w-20 p-2 text-center sm:text-sm sm:w-14 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-center'>
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
      <TopLikedPosts />
    </div>
  );
};

export default PostList;
