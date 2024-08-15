'use client';
import React, { useEffect, useState } from 'react';
import { GoMoveToTop } from 'react-icons/go';

function TopBtn() {
  const [showBtn, setShowBtn] = useState(false);

  const scrollTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowBtn = () => {
      if (window.scrollY > 500) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener('scroll', handleShowBtn);
    return () => {
      window.removeEventListener('scroll', handleShowBtn);
    };
  }, []);
  return (
    showBtn && (
      <button onClick={scrollTop} className='absolute text-white'>
        <GoMoveToTop />
      </button>
    )
  );
}
export default TopBtn;
