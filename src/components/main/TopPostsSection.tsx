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
        <h1 className={`text-4xl left-28 mb-8 mt-8 ${orbitron.className} font-semibold`}>
          Free Board
        </h1>
        <div className='grid grid-cols-2 gap-4 relative'>
          {posts.map((post: Post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className='p-2 md:p-4 rounded-md block bg-black text-white hover:bg-gray-700 transition-colors'
            >
              <div className='flex flex-col justify-between h-full'>
                <div>
                  <span className='bg-white text-gray-500 py-2 px-3 md:px-4 rounded-full mb-2 md:mb-4 inline-block text-sm md:text-base'>
                    🔥HOT
                  </span>
                  <h2 className='text-lg md:text-xl font-yangpyeong mb-2 md:mb-4'>
                    {post.title}
                  </h2>
                  <p className='text-gray-400 mb-2 md:mb-4 text-sm md:text-base'>
                    {post.content.length > 60
                      ? `${post.content.substring(0, 60)}...`
                      : post.content}
                  </p>
                </div>
                <div className='text-gray-500 flex justify-between items-center mt-auto text-xs md:text-sm'>
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
              height={1000}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPostsSection;
