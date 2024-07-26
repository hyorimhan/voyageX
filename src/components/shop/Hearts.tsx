'use client';

import { useState } from 'react';
import { IoHeart } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';

function Hearts() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <span
        className={`cursor-pointer text-3xl ${
          isClicked ? 'text-primary-400' : 'text-black-50'
        }`}
        onClick={() => setIsClicked((prev) => !prev)}
      >
        {isClicked ? <IoHeart /> : <IoHeartOutline />}
      </span>
    </>
  );
}

export default Hearts;
