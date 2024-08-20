import CommunitySearch from '@/components/community/main/CommunitySearch';
import SearchResult from '@/components/community/search/SearchResult';
import Link from 'next/link';
import React from 'react';
import { orbitron } from '../../../../../../public/fonts/orbitron';

function SearchPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <>
      <div className='flex justify-between mb-14 mt-26 sm:flex-col sm:w-full sm:gap-7 sm:p-5 sm:mb-4 md:p-11 md:mb-6 md:mt-16 lg:mb-14'>
        <h1
          className={`text-[36px] font-bold text-white text-left ${orbitron.className} sm:text-left`}
        >
          <Link href='/community'>FREE BOARD</Link>
        </h1>
        <div className='flex justify-end items-center mb-11 sm:w-full'>
          <div className='w-full'>
            <CommunitySearch />
          </div>
        </div>
      </div>
      <SearchResult searchValue={searchParams.search} />
    </>
  );
}

export default SearchPage;
