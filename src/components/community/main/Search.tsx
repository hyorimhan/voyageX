'use client';

import { TbSearch } from 'react-icons/tb';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function Search() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (search.trim().length < 2 || /^\s*$/.test(search)) {
      return toast.error('두글자 이상 입력해주세요.');
    }

    setError(null);
    router.push(`/community/search?search=${search}`);
  };

  return (
    <form className='relative' onSubmit={handleSearch}>
      <input
        className='w-[336px] h-[48px] rounded-[30px] text-white px-4 py-3 bg-black-800 pr-12 focus:outline-none'
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
  );
}

export default Search;
