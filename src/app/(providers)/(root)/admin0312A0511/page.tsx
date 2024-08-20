'use client';

import NewsCrawlingList from '@/components/crawling/NewsCrawlingList';
import Page from '@/components/pages/Page';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ADMIN_SECRET_KEY =
  process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || 'default_secret_key';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthentication = () => {
    if (secretKey === ADMIN_SECRET_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      alert('잘못된 비밀 키입니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <Page>
        <div className='flex flex-col items-center min-h-screen text-black-1000 gap-10 translate-y-36'>
          <p className='text-5xl text-white'>관.리.자. 페.이.지.</p>
          <input
            type='password'
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder='관리자 비밀번호'
            className='mb-4 p-2 rounded-lg border-2'
          />
          <button
            onClick={handleAuthentication}
            className='px-6 py-3 bg-primary-600 text-white rounded-xl'
          >
            인증
          </button>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold'>크롤링 페이지</h1>
          <button
            onClick={handleLogout}
            className='px-4 py-3 bg-primary-100 text-primary-700 rounded-xl'
          >
            메인 페이지로 이동
          </button>
        </div>
        <NewsCrawlingList />
      </div>
    </Page>
  );
};

export default AdminPage;
