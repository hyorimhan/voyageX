import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' });
    }

    const { data, error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Network error occurred' });
  }
}

export async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    return POST(req);
  } else {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` });
  }
}
