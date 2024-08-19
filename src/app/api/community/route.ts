import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  user_id: string;
  image_url: string | null;
  created_at: string;
}

interface CountResult {
  id: string;
  comments: { count: number }[];
  likes: { count: number }[];
}

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  const [totalResult, postsResult] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase
      .from('posts')
      .select('id, title, content, category, user_id, image_url, created_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1),
  ]);

  const total = totalResult.count;
  const posts = postsResult.data as Post[] | null;

  if (!posts || total === null) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 },
    );
  }

  const { data: counts } = await supabase
    .from('posts')
    .select(
      `
      id,
      comments:comments(count),
      likes:likes(count)
    `,
    )
    .in(
      'id',
      posts.map((post) => post.id),
    );

  if (!counts) {
    return NextResponse.json(
      { error: 'Failed to fetch counts' },
      { status: 500 },
    );
  }

  const countsMap: Record<string, { comments: number; likes: number }> =
    counts.reduce((acc, curr: CountResult) => {
      acc[curr.id] = {
        comments: curr.comments[0]?.count || 0,
        likes: curr.likes[0]?.count || 0,
      };
      return acc;
    }, {} as Record<string, { comments: number; likes: number }>);

  const postsWithCounts = posts.map((post) => ({
    ...post,
    comments: countsMap[post.id]?.comments || 0,
    likes: countsMap[post.id]?.likes || 0,
  }));

  return NextResponse.json({
    posts: postsWithCounts,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const newPost = await request.json();

  const { data, error } = await supabase.from('posts').insert({
    title: newPost.title,
    content: newPost.content,
    category: newPost.category,
    user_id: newPost.user_id,
    image_url: newPost.image_url,
  });

  if (error) return NextResponse.json(error);
  return NextResponse.json(data);
}
