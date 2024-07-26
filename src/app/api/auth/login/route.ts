import { NextRequest, NextResponse } from 'next/server';
import { formType } from '@/types/authFormType';
import { createClient } from '@/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { email, password }: formType = await request.json();
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({
        error: '로그인에 실패했습니다',
      });
    }
    if (user) {
      return NextResponse.json({ message: '로그인에 성공했습니다', user });
    }
  } catch (error) {
    return NextResponse.json({
      error: '네트워크 오류로 로그인에 실패했습니다',
    });
  }
}
