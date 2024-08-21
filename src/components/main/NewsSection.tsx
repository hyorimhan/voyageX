'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/supabase/client';
import { orbitron } from '../../../public/fonts/orbitron';

interface NewsItem {
  id: number;
  title: string;
  link: string;
  description: string;
  read_time: number;
  category: string;
  image: string;
  created_at: string;
}

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('News Error:', error);
        setError('News Error!');
      } else {
        setNewsItems(data || []);
      }
      setIsLoading(false);
    };

    fetchNews();
  }, []);

  if (isLoading)
    return <div className='text-white text-center'>Loading...</div>;
  if (error) return <div className='text-red-500 text-center'>{error}</div>;
  if (isLoading) return <div className='text-white text-center'>Loading...</div>;
  if (error) return <div className='text-red-500 text-center'>{error}</div>;

  return (
    <section
      className='w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-black sm:justify-start sm:pt-20'
      style={{ backgroundImage: 'url(/images/section5-bg2.png)' }}
    >
      <div className='lg:w-full lg:max-w-[1120px]'>
        <div className='flex justify-between items-center mb-12'>
          <h2
            className={`text-4xl sm:text-2xl font-semibold sm:font-medium text-white ${orbitron.className} top-20`}
          >
            NEWS
          </h2>
          <Link href='/news' className='text-white sm:underline '>
            MORE +
          </Link>
        </div>

        <div className='grid grid-cols-3 sm:grid-cols-1 gap-6'>
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              className={`bg-black bg-opacity-50 rounded-lg overflow-hidden ${
                index === 2 ? 'sm:hidden' : ''
              }`}
            >
              <div className='relative aspect-w-16 aspect-h-9'>
                <Link href={`/news`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout='responsive'
                    width={320}
                    height={190}
                    objectFit='cover'
                  />
                </Link>
              </div>
              <div className='p-4 text-left flex-grow flex flex-col'>
                <p className='text-gray-100 text-sm mb-2'>
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <h3 className='text-white text-lg sm:text-base font-semibold mb-2 line-clamp-2'>
                  {item.title}
                </h3>

                <p className='text-gray-100 text-sm line-clamp-3 flex-grow'>
                  {item.description.length > 150
                    ? `${item.description.substring(0, 150)}...`
                    : item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
