import '@/./app/globals.css';
import 'aos/dist/aos.css';

import { useEffect } from 'react';
import AOS from 'aos';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
