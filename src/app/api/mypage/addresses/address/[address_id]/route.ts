import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { address_id: string } },
) {
  const { address_id } = params;
  const { address } = await req.json();
  const supabase = createClient();

  if (!address_id || !address) {
    return NextResponse.json({ error: '주소 ID 또는 주소가 누락되었습니다.' });
  }

  const { data, error } = await supabase
    .from('addresses')
    .update(address)
    .eq('id', address_id);

  if (error) {
    return NextResponse.json({
      error: '주소를 업데이트하는 중 오류가 발생했습니다.',
    });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { address_id: string } },
) {
  const { address_id } = params;
  const supabase = createClient();

  if (!address_id) {
    return NextResponse.json({ error: '주소 ID가 누락되었습니다.' });
  }

  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', address_id);

  if (error) {
    return NextResponse.json({
      error: '주소를 삭제하는 중 오류가 발생했습니다.',
    });
  }

  return NextResponse.json({ message: '주소가 삭제되었습니다.' });
}
