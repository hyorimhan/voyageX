import NewsList from '@/components/news/NewsList';
import { orbitron } from '../../../../../public/fonts/orbitron';
import Link from 'next/link';
import NewsSearch from '@/components/news/NewsSearch';

const NewsPage = () => {
  return (
    <div>
      <div className='flex justify-between mb-14 mt-26 sm:flex-col sm:w-full sm:gap-7 sm:p-5 sm:mb-4 md:p-11 md:mb-6 md:mt-16 lg:mb-14'>
        <h1
          className={`text-[36px] font-bold text-white text-left ${orbitron.className} sm:text-left`}
        >
          <Link href='/news'>NEWS</Link>
        </h1>
        <div className='flex justify-end items-center w-[320px] sm:w-full'>
          <div className='w-full'>
            <NewsSearch />
          </div>
        </div>
      </div>
      <NewsList />
    </div>
  );
};

export default NewsPage;
