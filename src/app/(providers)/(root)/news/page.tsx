import NewsList from '@/components/news/NewsList';
import { orbitron } from '../../../../../public/fonts/orbitron';
import Link from 'next/link';

const NewsPage = () => {
  return (
    <div>
      <div className='flex justify-between mb-14 mt-26 sm:flex-col sm:w-full sm:gap-7 sm:p-5 sm:mb-4 sm:items-center md:flex-col md:w-full md:gap-7 md:p-5 md:mb-4 md:items-center'>
        <h1
          className={`text-[36px] font-bold text-white text-left ${orbitron.className} sm:text-left`}
        >
          <Link href='/news'>NEWS</Link>
        </h1>
        <div className='w-max'></div>
      </div>
      <NewsList />
    </div>
  );
};

export default NewsPage;
