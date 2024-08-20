import NewsSearch from '@/components/news/NewsSearch';
import NewsSearchResult from '@/components/news/NewsSearchResult';
import Link from 'next/link';
import { orbitron } from '../../../../../../public/fonts/orbitron';

function NewsSearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  return (
    <>
      <div className='flex justify-between mb-14 mt-26 sm:flex-col sm:w-full sm:gap-7 sm:p-5 sm:mb-4 md:p-11 md:mb-6 md:mt-16 lg:mb-14'>
        <h1
          className={`text-[36px] font-bold text-white text-left ${orbitron.className} sm:text-left`}
        >
          <Link href='/news'>NEWS</Link>
        </h1>
        <div className='flex justify-end items-center mb-11 sm:w-full'>
          <div className='w-full'>
            <NewsSearch />
          </div>
        </div>
      </div>
      <NewsSearchResult searchValue={searchParams.search} />
    </>
  );
}
export default NewsSearchPage;
