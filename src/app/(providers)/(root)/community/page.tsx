import Filter from '@/components/community/main/Filter';
import Search from '@/components/community/main/Search';
import PostList from '@/components/community/main/PostList';
import WriteButton from '@/components/community/main/WriteButton';
import { orbitron } from '../../../../../public/fonts/orbitron';
import Link from 'next/link';

const CommunityPage = () => {
  return (
    <div>
      <div className='flex justify-between mb-14 mt-26'>
        <h1
          className={`text-[36px] font-bold text-white ${orbitron.className}`}
        >
          <Link href='/community'>FREE BOARD</Link>
        </h1>
        <Search />
      </div>
      <div className='flex justify-between items-center mb-11'>
        <Filter />
        <WriteButton />
      </div>
      <PostList />
    </div>
  );
};

export default CommunityPage;
