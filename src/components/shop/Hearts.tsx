'use client';

import { useState } from 'react';
import { IoHeart } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';

function Hearts() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <span
        className='cursor-pointer'
        onClick={() => setIsClicked((prev) => !prev)}
      >
        {isClicked ? <IoHeart /> : <IoHeartOutline />}
      </span>
    </>
  );
}

export default Hearts;
