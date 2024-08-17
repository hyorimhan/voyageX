import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 });
  }

  // Base64 이미지를 버퍼로 변환
  const buffer = Buffer.from(image.split(',')[1], 'base64');

  // 이미지 용량 제한 (3MB = 1 * 1024 * 1024 bytes
  const MAX_SIZE = 3 * 1024 * 1024;
  if (buffer.length > MAX_SIZE) {
    return NextResponse.json({ error: '3MB 용량 제한' }, { status: 413 });
  }

  // Supabase Storage에 업로드
  const { data, error } = await supabase.storage
    .from('posts')
    .upload(`public/${Date.now()}.png`, buffer, {
      contentType: 'image/png',
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const imageUrl = data?.path
    ? supabase.storage.from('posts').getPublicUrl(data.path).data.publicUrl
    : null;

  return NextResponse.json({ imageUrl });
}
