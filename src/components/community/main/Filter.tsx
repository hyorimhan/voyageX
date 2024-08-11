'use client';

import { useState } from 'react';
import { useCategory } from '@/zustand/store/useCategory';

const categories = [
  { name: '전체', value: 'All' },
  { name: '우주정보', value: 'info' },
  { name: '우주여행', value: 'tour' },
  { name: '뉴스/기사', value: 'news' },
  { name: '소통', value: 'communication' },
];

function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('All');

  const setSelectedCategory = useCategory((state) => state.setSelectedCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedCategory(category);
  };
  return (
    <div className='flex gap-4'>
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => handleCategoryChange(category.value)}
          className={`relative px-3 py-2 rounded-[10px] text-[16px] text-gray-50 ${
            activeCategory === category.value
              ? 'bg-primary-600'
              : 'bg-black-800'
          }`}
        >
          <div
            className={`absolute inset-0 border ${
              activeCategory === category.value
                ? 'border-primary-600'
                : 'border-black-800'
            } pointer-events-none rounded-[10px]`}
          ></div>
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
