import Page from '@/components/pages/Page';
import Filter from '@/components/community/main/Filter';
import Search from '@/components/community/main/Search';
import PostList from '@/components/community/main/PostList';
import WriteButton from '@/components/community/main/WriteButton';

const CommunityPage = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-11'>
        <Filter />
        <Search />
      </div>
      <PostList />
    </div>
  );
};

export default CommunityPage;
