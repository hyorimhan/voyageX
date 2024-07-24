import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json({
      error: '로그아웃에 실패했습니다',
    });
  }
  return NextResponse.json({ message: '로그아웃 되었습니다' });
}
