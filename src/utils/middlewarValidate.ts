'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function useMiddlewareValidate() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const message = document.cookie
      .split('; ')
      .find((row) => row.startsWith('message='))
      ?.split('=')[1];
    if (message) {
      switch (message) {
        case 'login_first':
          break;
        case 'login_already':
          toast.error('이미 로그인 되어있습니다.');
          break;
        default:
          break;
      }

      // 메시지를 표시한 후 쿠키 삭제
      document.cookie =
        'message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }, [pathname]);
}

export function MiddlewareValidator() {
  useMiddlewareValidate();
  return null;
}
