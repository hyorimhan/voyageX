import useFetchTopPosts from '@/hooks/useFetchTopPosts';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '../common/Loading';
import { orbitron } from '../../../public/fonts/orbitron';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  likes?: number;
  comments?: number;
}

const TopPostsSection: React.FC = () => {

  const formatDate = (dateString: string) => { // 날짜 포맷팅
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  }; 

  const { posts, loading, error } = useFetchTopPosts();

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <section className='section h-screen flex items-center justify-center relative'>
      <div className='w-full max-w-6xl mx-auto p-4'>
        <h1 className={`text-4xl left-28 mb-8 mt-8 ${orbitron.className} font-semibold sm:text-2xl sm:font-medium sm:top-16`}>
          FREE BOARD
        </h1>
        <Link href='/community'>
          <p className='absolute top-60 right-8 sm:top-32 sm:right-4 '>MORE+</p>
        </Link>
        <div className='grid grid-cols-2 gap-12 relative sm:grid-cols-1 sm:gap-4'>
          {posts.slice(0, 4).map((post: Post, index) => (
            <Link
              href={`/community/${post.id}`}
              key={post.id}
              className={`p-4 rounded-md block bg-black text-white hover:bg-gray-700 transition-colors
              ${index >= 2 ? 'sm:hidden' : ''}`}
            >
              <div className='flex flex-col justify-between h-full'>
                <div>
                  <Image 
                    src={'/images/chips.png'}
                    alt='chips'
                    width={55}
                    height={28}
                    className='mb-3'/>
                  <h2 className='text-base font-pretendard font-semibold mb-2 md:text-xl md:mb-4 '>
                    {post.title}
                  </h2>
                  <p className='text-black-300 mb-4 text-sm md:text-base'>
                    {post.content.length > 120
                      ? `${post.content.substring(0, 120)}...`
                      : post.content}
                  </p>
                </div>
                <div className='text-black-50 flex justify-between items-center mt-auto text-xs md:text-sm'>
                  <span>{formatDate(post.created_at)}</span>
                  <span>
                    좋아요 {post.likes} 댓글 {post.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <Image
              src='/images/free-board.svg'
              alt='Center Star'
              width={1200}
              height={1200}
              className='sm:hidden'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPostsSection;
