'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import CategoryBadge from '../common/CategoryBadge';
import Loading from '@/components/common/Loading';
import Pagination from '@/components/common/Pagination';
import { Community } from '@/types/communityType';
import { useRouter } from 'next/navigation';

const SearchResult = ({ searchValue }: { searchValue: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();

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
    return (
      <div className='flex flex-col items-center gap-10 p-24'>
        <div>검색 결과가 없습니다.</div>
        <button
          onClick={() => router.push('/community')}
          className='mt-4 px-4 py-3 bg-transparent border-[1px] border-primary-600 text-white rounded-lg max-w-xs'
        >
          커뮤니티 메인으로 이동하기
        </button>
      </div>
    );

  return (
    <div className='overflow-x-auto sm:p-5'>
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
        {searchedPosts.map((post) => (
          <Link href={`/community/${post.id}`} key={post.id}>
            <div className='flex py-4 gap-x-4 items-center group sm:gap-x-1 sm:border-b-[1px] border-black-700'>
              <div className='flex flex-grow sm:flex-col sm:items-start sm:w-full sm:justify-between'>
                <span className='flex-none w-32 p-2 text-center sm:w-auto transition sm:-translate-y-2'>
                  <CategoryBadge category={post.category} />
                </span>
                <span className='flex-grow p-2 overflow-hidden text-ellipsis group-hover:underline lg:group-hover:font-semibold sm:ml-1 sm:mb-4 sm:text-left sm:text-sm sm:flex-grow sm:-translate-y-3'>
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
