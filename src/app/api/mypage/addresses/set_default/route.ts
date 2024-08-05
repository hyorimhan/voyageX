import { createClient } from '@/supabase/server';
import { Address } from '@/types/userAddressType';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const { addressId } = await req.json();
  const supabase = createClient();

  if (!addressId) {
    return NextResponse.json({ error: '주소 ID가 누락되었습니다.' });
  }

  const { error } = await supabase
    .from('addresses')
    .update({ is_default: true } as Partial<Address>)
    .eq('id', addressId);

  if (error) {
    return NextResponse.json({
      error: '기본 배송지를 설정하는 중 오류가 발생했습니다.',
    });
  }

  return NextResponse.json({ message: '기본 배송지가 설정되었습니다.' });
}
