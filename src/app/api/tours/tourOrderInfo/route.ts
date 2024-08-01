import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { id } = await request.json();
    const { data: address, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', id);

    if (error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ address });
  } catch (error) {
    return NextResponse.json({ message: '오류가 발생했습니다' });
  }
}
