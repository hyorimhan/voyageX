import { createClient } from '@/supabase/server';
import { Address } from '@/types/userAddressType';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const { userId } = await req.json();
  const supabase = createClient();

  if (!userId) {
    return NextResponse.json({ error: '유저 ID가 누락되었습니다.' });
  }

  const { error } = await supabase
    .from('addresses')
    .update({ is_default: false } as Partial<Address>)
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({
      error: '기본 배송지를 해제하는 중 오류가 발생했습니다.',
    });
  }

  return NextResponse.json({ message: '기본 배송지가 해제되었습니다.' });
}
