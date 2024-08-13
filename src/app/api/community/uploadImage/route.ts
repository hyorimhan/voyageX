import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const formData = await request.formData();
  const file = formData.get('file') as File;

  const { data, error } = await supabase.storage
    .from('posts')
    .upload(`public/${file.name}`, file);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { publicUrl } = supabase.storage.from('posts').getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
