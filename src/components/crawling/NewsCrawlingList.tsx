'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { NewsItem } from '@/types/newsType';

const NewsCrawlingList: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCrawl = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<{ news: NewsItem[] }>('/api/crawling');
      setNewsItems(response.data.news);
    } catch (err) {
      setError('Failed to fetch news');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex items-center justify-center mb-6'>
        <button
          onClick={handleCrawl}
          className='bg-primary-600 text-white py-3 px-4 rounded-xl mb-4'
          disabled={loading}
        >
          {loading ? '크롤링 중...' : '뉴스 크롤링'}
        </button>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {newsItems.map((item, index) => (
          <div
            key={index}
            className='border rounded-lg overflow-hidden shadow-lg'
          >
            <Link href={item.link} target='_blank' rel='noopener noreferrer'>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              )}
              <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                <p className='text-white'>{item.description}</p>
                <div className='mt-2 text-sm text-white font-bold'>
                  <span>{item.read_time} MIN READ</span> •{' '}
                  <span>{item.category}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsCrawlingList;
