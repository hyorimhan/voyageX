import { createClient } from '@/supabase/server';
import { Address } from '@/types/userAddressType';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } },
) {
  const { user_id } = params;
  const supabase = createClient();

  if (!user_id) {
    return NextResponse.json({ error: '유저 ID를 찾을 수 없습니다.' });
  }

  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user_id)
    .order('is_default', { ascending: false });

  if (error) {
    return NextResponse.json({ error: '배송지 목록을 불러올 수 없습니다.' });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { userId, address }: { userId: string; address: Partial<Address> } =
    await req.json();
  const supabase = createClient();

  console.log('address => ', address);

  if (!userId || !address) {
    return NextResponse.json({ error: '유저 ID 또는 주소가 누락되었습니다.' });
  }

  const { data, error } = await supabase.from('addresses').insert({
    user_id: userId,
    address: address.address,
    alias: address.alias,
    detailAddress: address.detailAddress,
    phone: address.phone,
    postcode: address.postcode,
    recipient: address.recipient,
    oldAddress: address.oldAddress,
    is_default: false,
  });

  if (error) {
    return NextResponse.json({
      error: error + '주소를 추가하는 중 오류가 발생했습니다.',
    });
  }

  return NextResponse.json(data);
}
