import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  // 10진수, 문자열을 정수로 변환, page는 해당 페이지, limit은 해당 페이지에 보여줄 리스트 개수
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  // 총 게시글 수 가져오기
  const { count: total, error: totalError } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  if (totalError || total === null) {
    return NextResponse.json(
      { error: totalError?.message || 'Total count retrieval failed' },
      { status: 500 },
    );
  }

  // 페이지네이션 데이터 가져오기
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (postsError) {
    return NextResponse.json({ error: postsError.message }, { status: 500 });
  }

  // 각 게시물에 대해 댓글 수와 좋아요 수를 추가로 가져오기
  const postsWithCounts = await Promise.all(
    posts.map(async (post) => {
      const { count: commentsCount } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', post.id);

      const { count: likesCount } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', post.id);

      return {
        ...post,
        comments: commentsCount || 0,
        likes: likesCount || 0,
      };
    }),
  );

  // 데이터 반환
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
