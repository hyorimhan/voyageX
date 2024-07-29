'use client';

import React, { useEffect, useState } from 'react';
import { Tables } from '@/types/supabase';
import { categories } from '@/utils/categories';

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
    <div className='overflow-x-auto '>
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
          <div key={post.id} className='flex mb-4 py-4 gap-x-4'>
            <span className='flex-none w-20 p-2 text-center'>
              {String(index + 1).padStart(5)}
            </span>
            <span className='flex-none w-32 p-2 text-center'>
              {categories[post.category]}
            </span>
            <span className='flex-grow p-2 ml-8'>{post.title}</span>
            <span className='flex-none w-32 p-2 text-center'>
              {new Date(post.created_at).toLocaleDateString()}
            </span>
            <span className='flex-none w-20 p-2 text-center'>0</span>
            <span className='flex-none w-20 p-2 text-center'>0</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
