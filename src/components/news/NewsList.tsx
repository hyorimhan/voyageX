'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import Pagination from '../common/Pagination';
import { getNews } from '@/services/news';
import Loading from '../common/Loading';

interface NewsItem {
  id: number;
  title: string;
  link: string;
  image: string;
  description: string;
  read_time: number;
  category: string;
  created_at: string;
}

export default function NewsList() {
  const [topThree, setTopThree] = useState<NewsItem[]>([]);
  const [list, setList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNews = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const { topThree, list, totalPages } = await getNews(page);
      setTopThree(topThree);
      setList(list);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch news');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(currentPage);
  }, [fetchNews, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='sm:m-5 md:m-5 '>
      <div className='grid grid-cols-3 gap-4 mb-16'>
        {topThree.map((item) => (
          <div
            key={item.id}
            className='relative w-[362px] h-[200px] overflow-hidden group'
          >
            <Link href={item.link}>
              <Image
                src={item.image}
                alt={item.title}
                layout='fill'
                objectFit='cover'
                className='brightness-[0.7] transform transition-transform duration-500 ease-in-out group-hover:scale-110'
              />
              <div className='absolute left-3 top-[108px] flex flex-col gap-2'>
                <div className='flex gap-1'>
                  <Badge type='category' content={item.category} />
                  <Badge type='read_time' content={item.read_time} />
                </div>
                <p
                  className='text-white text-[18px] font-semibold leading-tight overflow-hidden group-hover:underline'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.title}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-5'>
        {list.map((item) => (
          <Link href={item.link} key={item.id}>
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
              <div className='flex flex-col gap-2 justify-start sm:gap-2 w-[70%]'>
                <div className='flex flex-col gap-3 sm:gap-2'>
                  <p className='text-base group-hover:underline lg:group-hover:font-semibold sm:text-sm sm:order-2 order-1'>
                    {item.title}
                  </p>
                  <div className='flex flex-row gap-1 sm:order-1 order-2'>
                    <Badge type='category' content={item.category} />
                    <Badge type='read_time' content={item.read_time} />
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
