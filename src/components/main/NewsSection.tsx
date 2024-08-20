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

  if (isLoading) return <div className='text-white text-center'>Loading...</div>;
  if (error) return <div className='text-red-500 text-center'>{error}</div>;

  return (
    <section
      className='w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-black sm:justify-start sm:pt-20'
      style={{ backgroundImage: 'url(/images/section5-bg2.png)' }}
    >
      <div className='w-full max-w-7xl px-10 mb-72 sm:mb-10'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className={`text-4xl sm:text-2xl text-white ${orbitron.className}`}>NEWS</h2>
          <Link href='/news' className='text-lg sm:text-base hover:underline text-white'>
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
              <div className='relative w-full h-40 sm:h-36'>
                <Image
                  src={item.image}
                  alt={item.title}
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <div className='p-4 sm:p-3 text-left'>
                <p className='text-gray-400 text-xs mb-2 font-medium'>
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
                <h3 className='text-white text-lg sm:text-base font-semibold mb-2 line-clamp-2'>
                  {item.title}
                </h3>
                <p className='text-gray-300 text-sm sm:text-xs line-clamp-3 sm:line-clamp-2'>
                  {item.description}
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