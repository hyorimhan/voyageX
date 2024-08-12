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
      <div className='fixed right-48 bottom-10'>
        <WriteButton />
      </div>
    </div>
  );
};

export default CommunityPage;
