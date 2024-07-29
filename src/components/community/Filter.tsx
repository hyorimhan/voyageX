'use client';

import { useState } from 'react';

const categories = [
  { name: '전체', value: 'all' },
  { name: '우주정보', value: 'info' },
  { name: '우주여행', value: 'tour' },
  { name: '뉴스/기사', value: 'news' },
  { name: '소통', value: 'communication' },
];

function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div className='flex gap-4'>
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategory(category.value)}
            className={`relative px-3 py-2 rounded-lg text-[16px] text-gray-50 min-w-[100px] ${
              selectedCategory === category.value
                ? 'bg-primary-600'
                : 'bg-black'
            }`}
          >
            <div
              className={`absolute inset-0 border ${
                selectedCategory === category.value
                  ? 'border-primary-600'
                  : 'border-gray-400'
              } pointer-events-none rounded-lg`}
            ></div>
            {category.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default CategoryFilter;
