import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { user_id: string } },
) => {
  const { user_id } = params;
  const supabase = createClient();

  const { data: likeGoods, error: likeGoodsError } = await supabase
    .from('liked_goods')
    .select('*')
    .eq('user_id', user_id);

  if (likeGoodsError) {
    return NextResponse.json({ error: '찜한 굿즈를 불러올 수 없습니다.' });
  }

  const { data: likeTour, error: likeTourError } = await supabase
    .from('liked_tours')
    .select('*')
    .eq('user_id', user_id);

  if (likeTourError) {
    return NextResponse.json({ error: '찜한 투어를 불러올 수 없습니다.' });
  }

  const totalLikedItems = (likeGoods?.length || 0) + (likeTour?.length || 0);

  return NextResponse.json({
    totalLikedItems,
    likeGoodsCount: likeGoods.length,
    likeTourCount: likeTour.length,
    likeGoods,
    likeTour,
  });
};
