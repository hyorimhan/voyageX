'use client';

import { useState } from 'react';
import { IoMdHeart } from 'react-icons/io';

function Hearts() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <span
        className='cursor-pointer'
        onClick={() => setIsClicked((prev) => !prev)}
      >
        {isClicked ? <IoMdHeart /> : '♡'}
      </span>
    </>
  );
}

export default Hearts;
