import Page from '@/components/pages/Page';
import Filter from '@/components/community/Filter';
import Search from '@/components/community/Search';
import PostList from '@/components/community/PostList';
import Link from 'next/link';

const CommunityPage = () => {
  return (
    <Page>
      <h1 className='text-[36px] font-bold text-white mt-[112px] mb-[64px]'>
        <Link href='/community'>자유게시판</Link>
      </h1>
      <div className='flex justify-between items-center mb-11'>
        <Filter />
        <Search />
      </div>
      <PostList />
    </Page>
  );
};

export default CommunityPage;
