import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 5; // 리스트에는 항상 5개 항목

  try {
    // 최신 글 3개 가져오기
    const { data: topThree, error: topThreeError } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (topThreeError) throw topThreeError;

    // 페이지네이션된 리스트 가져오기
    let from, to;
    if (page === 1) {
      from = 3; // topThree 다음부터 시작
      to = from + pageSize - 1;
    } else {
      from = (page - 1) * pageSize + 3; // 두 번째 페이지부터는 topThree를 고려하여 시작 위치 조정
      to = from + pageSize - 1;
    }

    const {
      data: list,
      count,
      error: listError,
    } = await supabase
      .from('news')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (listError) throw listError;

    const totalItems = (count || 0) - 3; // topThree를 제외한 총 아이템 수
    const totalPages = Math.ceil(totalItems / pageSize);

    return NextResponse.json({
      topThree,
      list,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 },
    );
  }
}
