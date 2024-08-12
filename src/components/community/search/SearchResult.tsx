'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import CategoryBadge from '../common/CategoryBadge';
import Loading from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import { Community } from '@/types/communityType';

const SearchResult = ({ searchValue }: { searchValue: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: searchData,
    isPending,
    isError,
  } = useQuery<{
    posts: Community[];
    total: number;
    page: number;
    totalPages: number;
  }>({
    queryKey: ['post', searchValue, currentPage],
    queryFn: async () => {
      const response = await fetch(
        `/api/community/search?query=${searchValue}&page=${currentPage}&limit=${itemsPerPage}`,
      );
      const result = await response.json();
      return result;
    },
  });

  const searchedPosts = searchData?.posts || [];

  if (isPending)
    return (
      <div>
        <Loading />
      </div>
    );

  if (isError || searchedPosts.length === 0)
    return <div>검색 결과가 없습니다.</div>;

  return (
    <div className='overflow-x-auto'>
      <div className='flex flex-col'>
        <div className='flex mb-[10px] border-b-[0.4px] border-white text-center gap-x-4'>
          <span className='flex-none w-32 p-2 text-xs font-medium text-white'>
            카테고리
          </span>
          <span className='flex-grow p-2 text-xs font-medium text-white'>
            제목
          </span>
          <span className='flex-none w-32 p-2 text-xs font-medium text-white'>
            날짜
          </span>
          <span className='flex-none w-20 p-2 text-xs font-medium text-white'>
            좋아요
          </span>
          <span className='flex-none w-20 p-2 text-xs font-medium text-white'>
            댓글
          </span>
        </div>
        {searchedPosts.map((post) => (
          <Link href={`/community/${post.id}`} key={post.id}>
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
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={searchData?.totalPages || 1}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default SearchResult;
