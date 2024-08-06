import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } },
) {
  const { user_id } = params;
  const supabase = createClient();

  if (!user_id) {
    return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다' });
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return NextResponse.json({ error: '작성한 게시물을 불러올 수 없습니다.' });
  }
  const postsWithComments = await Promise.all(
    data.map(async (post) => {
      const { count, error: commentError } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', post.id);

      if (commentError) {
        return { ...post, comments: 0 };
      }

      return { ...post, comments: count };
    }),
  );
  return NextResponse.json(postsWithComments);
}
