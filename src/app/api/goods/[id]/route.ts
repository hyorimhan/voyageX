// // import { createClient } from '@/supabase/client';
// // import { NextRequest, NextResponse } from 'next/server';

// // const supabase = createClient();

// // export async function GET(
// //   request: NextRequest,
// //   { params }: { params: { id: string } },
// // ) {
// //   const { id } = params;

// //   const { data: goods, error } = await supabase
// //     .from('goods')
// //     .select('*')
// //     .eq('id', id)
// //     .single();

// //   if (error || !goods) {
// //     return NextResponse.json({ error: 'Goods not found' }, { status: 404 });
// //   }

// //   return NextResponse.json(goods);
// // }

// import { createClient } from '@/supabase/client';
// import { NextRequest, NextResponse } from 'next/server';

// const supabase = createClient();

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const { id } = params;

//   console.log('API route: Fetching goods data for ID:', id);

//   const { data: goods, error } = await supabase
//     .from('goods')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error || !goods) {
//     console.error('API route: Error fetching goods data:', error);
//     return NextResponse.json({ error: 'Goods not found' }, { status: 404 });
//   }

//   console.log('API route: Fetched goods data:', goods);

//   return NextResponse.json(goods);
// }
