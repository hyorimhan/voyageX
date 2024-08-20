'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from '../common/Loading';
import OpenNewTabIcon16px from '../common/icons/16px/OpenNewTabIcon16px';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '../common/Pagination';
import Badge from './Badge';
import { SearchResult } from '@/types/newsType';

const NewsSearchResult = ({ searchValue }: { searchValue: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();

  const {
    data: searchData,
    isPending,
    isError,
  } = useQuery<SearchResult>({
    queryKey: ['news', searchValue, currentPage],
    queryFn: async () => {
      const response = await fetch(
        `/api/news/search?search=${searchValue}&page=${currentPage}&limit=${itemsPerPage}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      return response.json();
    },
  });

  const searchedNews = searchData?.results || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError || searchedNews.length === 0)
    return (
      <div className='flex flex-col items-center gap-10 p-24'>
        <div>검색 결과가 없습니다.</div>
        <button
          onClick={() => router.push('/news')}
          className='mt-4 px-4 py-3 bg-transparent border-[1px] border-primary-600 text-white rounded-lg max-w-xs'
        >
          뉴스 메인으로 이동하기
        </button>
      </div>
    );

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>
        &quot;{searchValue}`&quot;에 대한 검색 결과
      </h2>
      <div className='flex flex-col gap-5'>
        {searchedNews.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='flex gap-4 h-[97px] group'>
              <div className='w-[173px] sm:w-[30%] h-full flex-shrink-0 relative'>
                <Image
                  src={item.image}
                  alt={item.title}
                  layout='fill'
                  objectFit='cover'
                  className='object-cover object-center sm:object-[center_left_50px]'
                />
              </div>
              <div className='flex flex-col gap-2 justify-start sm:gap-2 w-[90%]'>
                <div className='flex flex-col gap-3 sm:gap-2'>
                  <p className='text-base group-hover:underline lg:group-hover:font-semibold sm:text-sm sm:order-2 order-1 flex items-center'>
                    {item.title}
                    <div className='ml-2 opacity-0 group-hover:opacity-100 sm:hidden'>
                      <OpenNewTabIcon16px />
                    </div>
                  </p>
                  <div className='flex flex-row gap-1 sm:order-1 order-2 items-center'>
                    <Badge type='category' content={item.category} />
                    <Badge type='read_time' content={item.read_time} />
                    <div className='ml-auto opacity-0 group-hover:opacity-100 lg:hidden md:hidden'>
                      <OpenNewTabIcon16px />
                    </div>
                  </div>
                </div>
                <p
                  className='text-xs font-normal text-black-50 overflow-hidden text-ellipsis'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {searchData && (
        <Pagination
          currentPage={searchData.currentPage}
          totalPages={searchData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default NewsSearchResult;
