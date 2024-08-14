import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import MyPostList from '@/components/mypage/posts/MyPostList';
import Link from 'next/link';

const MyPostsPage = () => {
  return (
    <div>
      <div className='flex gap-2 mb-[26px] sm:mt-8 sm:mb-10'>
        <Link
          href={'/mypage/side_bar'}
          className='md:hidden lg:hidden self-center'
        >
          <ArrowLeftIcon24px />
        </Link>
        <p className='text-2xl sm:text-xl'>커뮤니티 작성글 목록</p>
      </div>
      <MyPostList />
    </div>
  );
};

export default MyPostsPage;
