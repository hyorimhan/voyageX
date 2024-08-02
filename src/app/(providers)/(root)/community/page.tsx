import Page from '@/components/pages/Page';
import Filter from '@/components/community/main/Filter';
import Search from '@/components/community/main/Search';
import PostList from '@/components/community/main/PostList';

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
