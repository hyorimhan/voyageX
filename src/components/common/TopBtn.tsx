import Image from 'next/image';
import { useEffect, useState } from 'react';

function TopBtn() {
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
      className=' fixed right-[5%] sm:right-[1%] bottom-[20%]  z-50  transition-all duration-300 ease-in-out animate-bounce '
    >
      <Image
        src={'/icons/TopBtn.svg'}
        alt='voyage_x_logo'
        width={56}
        height={56}
      />
    </button>
  );
}
export default TopBtn;
