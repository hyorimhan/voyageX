'use client';

import { TbSearch } from 'react-icons/tb';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Search() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (search.length < 2) {
      setError('검색어는 두글자 이상이어야 합니다.');
      return;
    }

    setError(null);
    router.push(`/community/search?search=${search}`);
  };

  return (
    <>
      <div className=''>
        <form className='relative' onSubmit={handleSearch}>
          <input
            className='w-[336px] h-[48px] rounded-[16px] text-white px-4 py-3 bg-black-800 focus:outline-none'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='검색어'
          />
          <button
            type='submit'
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white'
          >
            <TbSearch size={24} />
          </button>
        </form>
        {error && (
          <div className='items-center text-red-500 ml-4 mt-3'>{error}</div>
        )}
      </div>
    </>
  );
}

export default Search;
