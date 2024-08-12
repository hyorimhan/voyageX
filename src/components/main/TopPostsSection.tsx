import useFetchTopPosts from '@/hooks/useFetchTopPosts';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  content: string;
  date?: string;
  likes?: number;
  comments?: number;
}

const TopPostsSection: React.FC = () => {
  const { posts, loading, error } = useFetchTopPosts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="section h-screen flex items-center justify-center relative">
      <div className="w-full max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-yangpyeong mb-8 mt-12 text-center">Free Board</h1>
        <div className="grid grid-cols-2 gap-4 relative">
          {posts.map((post: Post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="p-2 md:p-4 rounded-md block bg-black text-white hover:bg-gray-700 transition-colors"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="bg-purple-700 text-white py-2 px-3 md:px-4 rounded-full mb-2 md:mb-4 inline-block text-sm md:text-base">HOT</span>
                  <h2 className="text-lg md:text-xl font-yangpyeong mb-2 md:mb-4">{post.title}</h2>
                  <p className="text-gray-400 mb-2 md:mb-4 text-sm md:text-base">
                    {post.content.length > 60 ? `${post.content.substring(0, 60)}...` : post.content} 
                  </p>
                </div>
                <div className="text-gray-500 flex justify-between items-center mt-auto text-xs md:text-sm">
                  <span>{post.date}</span>
                  <span>좋아요 {post.likes} 댓글 {post.comments}</span>
                </div>
              </div>
            </Link>
          ))}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image src="/images/free-board.svg" alt="Center Star" width={800} height={100} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPostsSection;