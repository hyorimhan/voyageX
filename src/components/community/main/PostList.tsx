'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getPostAll, getPostByCategory } from '@/services/community';
import { Community } from '@/types/communityType';
import { useCategory } from '@/zustand/store/useCategory';
import CategoryBadge from '../common/CategoryBadge';
import Loading from '@/components/common/Loading';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Pagination from '@/components/common/Pagination';
import TopLikedList from './TopLikedList';
import TopBtn from '@/components/common/TopBtn';

const ITEMS_PER_PAGE = 10;

const PostList = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedCategory('All');
  }, [setSelectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const fetchPosts = useCallback(() => {
    if (selectedCategory === 'All') {
      return getPostAll(currentPage, ITEMS_PER_PAGE);
    } else {
      return getPostByCategory(selectedCategory, currentPage, ITEMS_PER_PAGE);
    }
  }, [selectedCategory, currentPage]);

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
    queryFn: fetchPosts,
  });

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const posts = useMemo(() => postData?.posts || [], [postData?.posts]);

  if (isPending) return <Loading />;
  if (isError) return <div>error</div>;

  return (
    <div className='overflow-x-auto sm:p-1'>
      <div className='flex flex-col'>
        <div className='flex border-b-[0.4px] border-white text-center gap-x-4 sm:gap-x-1 sm:pr-1'>
          <span className='flex-none w-32 p-2 text-lg font-normal text-white sm:hidden'>
            카테고리
          </span>
          <span className='flex-grow p-2 text-lg font-normal text-white sm:text-xs sm:flex-grow sm:items-center'>
            제목
          </span>
          <span className='flex-none w-32 p-2 text-lg font-normal text-white sm:text-xs sm:w-14 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center sm:justify-end'>
            작성일
          </span>
          <span className='flex-none w-20 p-2 text-lg font-normal text-white sm:text-xs sm:w-10 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center '>
            좋아요
          </span>
          <span className='flex-none w-20 p-2 text-lg font-normal text-white sm:text-xs sm:w-10 sm:flex-grow-0 sm:whitespace-nowrap sm:flex sm:items-center '>
            댓글
          </span>
        </div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link href={post.id} key={post.id}>
              <div className='flex py-4 gap-x-4 items-center group sm:gap-x-1 sm:border-b-[1px] border-black-700 sm:py-4 sm:pr-1'>
                <div className='flex flex-grow items-center sm:flex-col sm:items-start sm:w-full sm:justify-between'>
                  <span className='flex-none w-32 p-2 text-center sm:w-auto sm:p-0 sm:mb-1'>
                    <CategoryBadge category={post.category} />
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
      <TopBtn />
    </div>
  );
};

export default PostList;
