import Page from '@/components/pages/Page';
import Filter from '@/components/community/Filter';
import Search from '@/components/community/Search';
import PostList from '@/components/community/PostList';
import Link from 'next/link';

const CommunityPage = () => {
  return (
    <Page>
      <div className='font-pretendard'>
        <div className='flex justify-between items-center mb-11'>
          <Filter />
          <Search />
        </div>
        <PostList />
      </div>
    </Page>
  );
};

export default CommunityPage;
