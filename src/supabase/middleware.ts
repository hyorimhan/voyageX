// import { createServerClient } from '@supabase/ssr';
// import { NextResponse, type NextRequest } from 'next/server';

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             request.cookies.set(name, value),
//           );
//           supabaseResponse = NextResponse.next({
//             request,
//           });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options),
//           );
//         },
//       },
//     },
//   );

//   // IMPORTANT: Avoid writing any logic between createServerClient and
//   // supabase.auth.getUser(). A simple mistake could make it very hard to debug
//   // issues with users being randomly logged out.

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (
//     !user &&
//     !request.nextUrl.pathname.startsWith('/login') &&
//     !request.nextUrl.pathname.startsWith('/signup')
//     // &&
//     // !request.nextUrl.pathname.startsWith('/')
//   ) {
//     // no user, potentially respond by redirecting the user to the login page
//     const url = request.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
//   }

//   // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
//   // creating a new response object with NextResponse.next() make sure to:
//   // 1. Pass the request in it, like so:
//   //    const myNewResponse = NextResponse.next({ request })
//   // 2. Copy over the cookies, like so:
//   //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
//   // 3. Change the myNewResponse object to fit your needs, but avoid changing
//   //    the cookies!
//   // 4. Finally:
//   //    return myNewResponse
//   // If this is not done, you may be causing the browser and server to go out
//   // of sync and terminate the user's session prematurely!

//   return supabaseResponse;
// }

// import { createServerClient } from '@supabase/ssr';
// import { NextResponse, type NextRequest } from 'next/server';

// export async function updateSession(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           // 쿠키를 request 객체에 설정하지 않고, supabaseResponse에 직접 설정
//           cookiesToSet.forEach(({ name, value, options }) => {
//             supabaseResponse.cookies.set(name, value, options);
//           });
//         },
//       },
//     },
//   );

//   // IMPORTANT: Avoid writing any logic between createServerClient and
//   // supabase.auth.getUser(). A simple mistake could make it very hard to debug
//   // issues with users being randomly logged out.

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (
//     !user &&
//     (request.nextUrl.pathname.startsWith('/mypage/tour_orders') ||
//       request.nextUrl.pathname.startsWith('/tour/payment') ||
//       request.nextUrl.pathname.startsWith('/community/write') ||
//       request.nextUrl.pathname.startsWith('/shop/order'))
//   ) {
//     // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
//     const url = request.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
//   }

//   // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
//   // creating a new response object with NextResponse.next() make sure to:
//   // 1. Pass the request in it, like so:
//   //    const myNewResponse = NextResponse.next({ request })
//   // 2. Copy over the cookies, like so:
//   //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
//   // 3. Change the myNewResponse object to fit your needs, but avoid changing
//   //    the cookies!
//   // 4. Finally:
//   //    return myNewResponse
//   // If this is not done, you may be causing the browser and server to go out
//   // of sync and terminate the user's session prematurely!

//   return supabaseResponse;
// }

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const isPrefetch = request.headers.get('Purpose') === 'prefetch';
  let response = NextResponse.next({ request });

  const protectedPaths = [
    '/mypage',
    '/tour/payment',
    '/community/write',
    '/shop/order',
    '/wishlist',
  ];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options?: any) {
          response.cookies.set(name, value, options);
        },
        remove(name: string, options?: any) {
          response.cookies.set(name, '', { ...options, maxAge: -1 });
        },
      },
    },
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (
      !isPrefetch &&
      !user &&
      protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
    ) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.error('Error in updateSession:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}
