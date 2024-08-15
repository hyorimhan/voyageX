import Filter from '@/components/community/main/Filter';
import Search from '@/components/community/main/Search';
import PostList from '@/components/community/main/PostList';
import WriteButton from '@/components/community/main/WriteButton';
import { orbitron } from '../../../../../public/fonts/orbitron';
import Link from 'next/link';

const CommunityPage = () => {
  return (
    <div>
      <div className='flex justify-between mb-14 mt-26 sm:flex-col sm:w-full sm:gap-7 sm:p-5 sm:mb-4 sm:items-center md:flex-col md:w-full md:gap-7 md:p-5 md:mb-4 md:items-center'>
        <h1
          className={`text-[36px] font-bold text-white text-left ${orbitron.className} sm:text-left`}
        >
          <Link href='/community'>FREE BOARD</Link>
        </h1>
        <div className='w-max'>
          <Search />
        </div>
      </div>
      <div className='flex justify-between items-center mb-11 sm:flex-col sm:gap-8'>
        <Filter />
        <WriteButton />
      </div>
      <PostList />
    </div>
  );
};

export default CommunityPage;
