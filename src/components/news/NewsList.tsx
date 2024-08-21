'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import Pagination from '../common/Pagination';
import { getNews } from '@/services/news';
import Loading from '../common/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import OpenNewTabIcon16px from '../common/icons/16px/OpenNewTabIcon16px';
import { NewsItem } from '@/types/newsType';

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
    <div className='sm:m-5 md:m-5'>
      <div className='mb-16'>
        <div className='hidden lg:grid lg:grid-cols-3 lg:gap-4'>
          {topThree.map((item) => (
            <div
              key={item.id}
              className='relative w-[362px] h-[200px] overflow-hidden group'
            >
              <Link href={item.link} target='_blank' rel='noopener noreferrer'>
                <Image
                  src={item.image}
                  alt={item.title}
                  layout='fill'
                  objectFit='cover'
                  className='brightness-[0.7] transform transition-transform duration-500 ease-in-out group-hover:scale-110'
                />
                <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <OpenNewTabIcon16px />
                </div>
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

        <div className='lg:hidden relative'>
          <Swiper
            modules={[SwiperPagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            loop={true}
            className='mySwiper'
          >
            {topThree.map((item) => (
              <SwiperSlide key={item.id}>
                <div className='relative w-full h-[200px] overflow-hidden group'>
                  <Link
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout='fill'
                      objectFit='cover'
                      className='brightness-[0.7] '
                    />
                    <div className='absolute top-3 right-3'>
                      <OpenNewTabIcon16px />
                    </div>
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
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='translate translate-y-12'>
            <div className='swiper-pagination'></div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5'>
        {list.map((item) => (
          <Link href={item.link} target='_blank' rel='noopener noreferrer'>
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
                  <div className='flex flex-row gap-1 items-center'>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
