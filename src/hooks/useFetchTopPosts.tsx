import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';

type Post = {
  id: string;
  title: string;
  content: string;
  like_count: number;
};

type FetchTopPostsResult = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const useFetchTopPosts = (): FetchTopPostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('like_count', { ascending: false })
          .limit(4);

        if (error) {
          setError(error.message);
          return;
        }
        setPosts(data || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopPosts();
  }, []);

  return { posts, loading, error };
};

export default useFetchTopPosts;
