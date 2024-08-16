import Image from 'next/image';
import { useEffect, useState } from 'react';

interface topBtnProps {
  size: number;
}

function TopBtn({ size }: topBtnProps) {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleTopBtn = () => {
      if (window.scrollY > 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener('scroll', handleTopBtn);
    return () => window.removeEventListener('scroll', handleTopBtn);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!showBtn) {
    return null;
  }
  return (
    <button
      onClick={scrollToTop}
      className=' fixed right-[5%] bottom-[50%] sm:hidden z-50  transition-all duration-300 ease-in-out animate-bounce '
    >
      <Image
        src={'/icons/logo/logo1.svg'}
        alt='voyage_x_logo'
        width={size}
        height={size}
      />
    </button>
  );
}
export default TopBtn;
