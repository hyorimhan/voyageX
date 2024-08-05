import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const newComment = await request.json();
  const supabase = createClient();

  const { data, error } = await supabase.from('comments').insert(newComment);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const { id, content } = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const id = await request.json();
  const supabase = createClient();
  const { data, error } = await supabase.from('comments').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
