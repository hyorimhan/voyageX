'use client';

import { useQuery } from '@tanstack/react-query';
import { getTopLikedPosts } from '@/services/community';
import useFetchTopPosts from '@/hooks/useFetchTopPosts';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '../common/Loading';
import { orbitron } from '../../../public/fonts/orbitron';
import { Community } from '@/types/communityType';
import { HotPostBadge } from '../community/common/HotPostBadge';

interface Post extends Community {
  likes: number;
  comments: number;
}

const TopPostsSection = () => {
  const {
    data: topLikedPosts,
    isPending: isLikedPostsPending,
    isError: isLikedPostsError,
  } = useQuery<Post[]>({
    queryKey: ['topLikedPosts'],
    queryFn: getTopLikedPosts,
  });

  const {
    posts: topPostsContent,
    loading: isContentLoading,
    error: contentError,
  } = useFetchTopPosts();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  if (isLikedPostsPending || isContentLoading) return <Loading />;
  if (isLikedPostsError || contentError || !topLikedPosts)
    return <div>핫 게시글을 불러오는 데 실패했습니다.</div>;

  const sortedTopPosts = topLikedPosts.slice(0, 4).map((likedPost) => {
    const fullPost = topPostsContent.find(
      (contentPost) => contentPost.id === likedPost.id,
    );
    return { ...likedPost, ...fullPost };
  });

  return (
    <section className='w-full h-full flex flex-col items-center justify-start pt-40 md:pt-60 sm:px-5'>
      <div className=' lg:mb-20 md:mb-32 w-full lg:max-w-[1120px]'>
        <div className='flex justify-between  items-center lg:hidden'>
          <h1
            className={`text-4xl ${orbitron.className} font-semibold sm:text-2xl sm:font-medium`}
          >
            FREE BOARD
          </h1>
          <Link href='/community'>
            <p className='text-lg sm:text-base underline'>MORE+</p>
          </Link>
        </div>
        <div className='w-full lg:max-w-[1120px] mx-auto'>
          <div className='flex mb-12  justify-between sm:hidden  items-center'>
            <h2
              className={`text-4xl sm:text-2xl font-semibold sm:font-medium text-white ${orbitron.className} top-20`}
            >
              FREE BOARD
            </h2>
            <Link href='/news' className='text-white '>
              MORE +
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:max-w-max-[1120px] lg:w-full mx-auto px-8'>
        <div className='grid grid-cols-2 gap-12 relative sm:grid-cols-1 sm:gap-8 lg:w-[1120px] lg:mx-auto'>
          {posts.slice(0, 4).map((post: Post, index) => (
            <Link
              href={`/community/${post.id}`}
              key={post.id}
              className={`p-8 rounded-md block bg-black  text-white hover:bg-gray-700 transition-colors
              ${index >= 2 ? 'sm:hidden' : ''}`}
            >
              <div className='flex flex-col justify-between h-full'>
                <div className='mb-5'>
                  <HotPostBadge />
                  <h2 className='text-base font-pretendard font-semibold mb-2 md:text-xl md:mb-4'>
                    {post.title}
                  </h2>
                  <p className='text-black-300 mb-4 text-sm md:text-base'>
                    {post.content
                      ? post.content
                          .replace(/<[^>]*>?/gm, '')
                          .substring(0, 120) +
                        (post.content.length > 120 ? '...' : '')
                      : '내용이 없습니다.'}
                  </p>
                </div>
                <div className='text-black-50 flex justify-between items-center mt-auto text-xs md:text-sm'>
                  <span>{formatDate(post.created_at)}</span>
                  {/* <span>
                    좋아요 {post.likes}
                    댓글 {post.comments}
                  </span> */}
                </div>
              </div>
            </Link>
          ))}
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <Image
              src='/images/free-board.svg'
              alt='Center Star'
              width={1400}
              height={1400}
              className='sm:hidden'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPostsSection;

