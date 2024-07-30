'use client';

import React, { useEffect, useState } from 'react';
import { Tables } from '@/types/supabase';
import { categories } from '@/utils/categories';
import Link from 'next/link';

const PostList = () => {
  const [posts, setPosts] = useState<Tables<'posts'>[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/community/list');
        const result = await response.json();

        if (response.ok) {
          setPosts(result.data || []);
        } else {
          console.error('에러 발생', result.error);
        }
      } catch (error) {
        console.error('에러 발생', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='overflow-x-auto'>
      <div className='flex flex-col'>
        <div className='flex mb-[10px] border-b-[0.4px] border-white text-center gap-x-4'>
          <span className='flex-none w-20 p-2 text-xs font-medium text-white'>
            NO.
          </span>
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
        {posts.map((post, index) => (
          <Link href={post.id}>
            <div
              key={post.id}
              className='flex py-4 gap-x-4 items-center hover:bg-black-800 rounded-[8px]'
            >
              <span className='flex-none w-20 p-2 text-center'>
                {String(index + 1)}
              </span>
              <span className='flex-none w-32 p-2 text-center'>
                <div className='inline-block px-2 py-1 rounded-[50px] bg-primary-50 text-primary-500'>
                  {categories[post.category]}
                </div>
              </span>
              <span className='flex-grow p-2 ml-8 overflow-hidden whitespace-nowrap text-ellipsis'>
                {post.title}
              </span>
              <span className='flex-none w-32 p-2 text-center'>
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <span className='flex-none w-20 p-2 text-center'>0</span>
              <span className='flex-none w-20 p-2 text-center'>0</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostList;
