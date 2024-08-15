import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// 보호가 필요한 경로 목록
const protectedRoutes = [
  '/tour/payment',
  '/mypage/tour_orders/',
  '/wishlist',
  '/mypage/goods_orders/',
  '/community/write/',
  '/community/edit',
  '/shop/order/',
];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 현재 경로가 보호된 경로인지 확인
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (!session && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    const newResponse = NextResponse.redirect(redirectUrl);
    newResponse.cookies.set('message', 'login_first');
    return newResponse;
  }

  // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근하는 경우
  if (
    session &&
    (request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/signup')) &&
    request.headers.get('Purpose') !== 'prefetch'
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    const newResponse = NextResponse.redirect(redirectUrl);
    newResponse.cookies.set('message', 'login_already');
    return newResponse;
  }

  return response;
}
