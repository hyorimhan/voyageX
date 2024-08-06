import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다.' });
    }

    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ message: '회원탈퇴가 완료되었습니다.' });
  } catch (error) {
    return NextResponse.json({ error: '네트워크 에러 발생' });
  }
}
