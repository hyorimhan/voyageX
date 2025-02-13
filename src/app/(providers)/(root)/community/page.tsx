import Filter from '@/components/community/main/Filter';
import PostList from '@/components/community/main/PostList';
import WriteButton from '@/components/community/main/WriteButton';
import { orbitron } from '../../../../../public/fonts/orbitron';
import Link from 'next/link';
import CommunitySearch from '@/components/community/main/CommunitySearch';

const CommunityPage = () => {
  return (
    <div className='flex flex-col mt-26 sm:w-full sm:gap-7 sm:p-5 sm:mb-4 md:p-11 md:mb-6 md:mt-16 lg:mb-14'>
      <div className='flex justify-between sm:flex-col sm:w-full sm:gap-4 md:mb-14 lg:mb-14'>
        <div className='flex items-center justify-between w-full'>
          <h1
            className={`text-[36px] sm:text-3xl font-bold text-white ${orbitron.className}`}
          >
            <Link href='/community'>FREE BOARD</Link>
          </h1>
          <div className=''>
            <WriteButton />
          </div>
        </div>
        <div className='flex justify-end items-center sm:w-full sm:mt-4'>
          <div className='w-full lg:hidden md:hidden'>
            <CommunitySearch />
          </div>
        </div>
      </div>
      <div className='flex justify-between items-end mb-4'>
        <Filter />
        <div className='w-80 sm:hidden'>
          <CommunitySearch />
        </div>
      </div>
      <PostList />
    </div>
  );
};

export default CommunityPage;
