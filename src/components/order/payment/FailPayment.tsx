'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function FailPayment() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') window.history.go(-3);
  });
  return <>{`결제를 취소하셨습니다. 기존 페이지로 돌아갑니다.`}</>;
}

export default FailPayment;
