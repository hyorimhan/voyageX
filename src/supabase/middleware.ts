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

    if (
      user &&
      request.headers.get('Purpose') !== 'prefetch' &&
      (request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/signup'))
    ) {
      const newResponse = NextResponse.redirect(new URL('/', request.url));
      response.cookies
        .getAll()
        .forEach((cookie) =>
          newResponse.cookies.set(cookie.name, cookie.value),
        );
      return newResponse;
    }
  } catch (error) {
    console.error('Error in updateSession:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}
