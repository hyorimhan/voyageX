import useFetchTopPosts from '@/hooks/useFetchTopPosts';
import Link from 'next/link';

const TopPostsSection: React.FC = () => {
  const { posts, loading, error } = useFetchTopPosts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <section className='section section-bg h-screen flex items-center justify-center'>
    <div className='w-full max-w-5xl mx-auto p-4'>
      <h1 className='text-4xl font-yangpyeong mb-8 text-center'>
        Free Board
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className='p-4 border border-gray-300 rounded-md block hover:bg-gray-100'>
              <h2 className='text-2xl font-yangpyeong mb-2'>{post.title}</h2>
              <p className='text-gray-600'>{post.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
};


export default TopPostsSection;
