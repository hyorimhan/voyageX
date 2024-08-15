import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// 보호가 필요한 경로 목록
const protectedRoutes = [
  '/tour/payment',
  '/mypage',
  '/wishlist',
  '/community/write/',
  '/community/edit',
  '/shop/order/',
];

const isProtectedRoute = (path: string) =>
  protectedRoutes.some(
    (route) => path === route || path.startsWith(route + '/'),
  );

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  if (!session && isProtectedRoute(pathname)) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    const newResponse = NextResponse.redirect(redirectUrl);
    newResponse.cookies.set('message', 'login_first');
    supabaseResponse.cookies
      .getAll()
      .forEach((cookie) => newResponse.cookies.set(cookie.name, cookie.value));
    return newResponse;
  }

  // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근하는 경우
  if (
    session &&
    request.headers.get('Purpose') !== 'prefetch' &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/signup'))
  ) {
    const newResponse = NextResponse.redirect(new URL('/', request.url));
    newResponse.cookies.set('message', 'login_already');
    supabaseResponse.cookies
      .getAll()
      .forEach((cookie) => newResponse.cookies.set(cookie.name, cookie.value));
    return newResponse;
  }

  return supabaseResponse;
}
