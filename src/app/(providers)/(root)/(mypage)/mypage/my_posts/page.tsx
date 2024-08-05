import MyPostList from '@/components/mypage/posts/MyPostList';

const MyPostsPage = () => {
  return (
    <div>
      <p className='text-2xl mb-20'>커뮤니티 작성글 목록</p>
      <MyPostList />
    </div>
  );
};

export default MyPostsPage;
