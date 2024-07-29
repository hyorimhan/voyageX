'use client';

import { TbSearch } from 'react-icons/tb';
import { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  //로직 넣기
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div className=''>
        <form className='relative' onSubmit={handleSearch}>
          <input
            className='w-[336px] h-[48px] rounded-[16px] text-white px-4 py-3 bg-black-700 focus:outline-none'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type='submit'
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white'
          >
            <TbSearch size={24} />
          </button>
        </form>
      </div>
    </>
  );
}

export default Search;
