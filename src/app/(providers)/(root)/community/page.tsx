import Page from '@/components/pages/Page';
import FilterSearch from '@/components/community/FilterSearch';
import PostList from '@/components/community/PostList';

const Community = () => {
  return (
    <>
      <Page>
        <h1 className='text-[36px] font-bold text-white mt-[112px] mb-[64px]'>
          자유게시판
        </h1>
        <div className='mb-[45px]'>
          <FilterSearch />
        </div>
        <div>
          <PostList />
        </div>
      </Page>
    </>
  );
};

export default Community;
