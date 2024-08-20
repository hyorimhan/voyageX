import CommunitySearch from '@/components/community/main/CommunitySearch';
import SearchResult from '@/components/community/search/SearchResult';
import React from 'react';

function SearchPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <>
      <div className='flex justify-end items-center mb-11'>
        <CommunitySearch />
      </div>
      <SearchResult searchValue={searchParams.search} />
    </>
  );
}

export default SearchPage;
