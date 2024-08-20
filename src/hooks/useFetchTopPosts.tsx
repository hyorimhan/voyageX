'use client';

import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';

type Post = {
  category: string;
  content: string;
  created_at: string;
  id: string;
  title: string;
  user_id: string;
};

type FetchTopPostsResult = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const supabase = createClient();

const useFetchTopPosts = (): FetchTopPostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;

        setPosts(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  return { posts, loading, error };
};

export default useFetchTopPosts;
