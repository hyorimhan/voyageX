import Search from '@/components/community/main/Search';
import SearchResult from '@/components/community/search/SearchResult';
import Page from '@/components/pages/Page';
import React from 'react';

function SearchPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <>
      <div className='flex justify-end items-center mb-11'>
        <Search />
      </div>
      <SearchResult searchValue={searchParams.search} />
    </>
  );
}

export default SearchPage;
