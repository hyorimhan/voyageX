'use client';

import { useState } from 'react';

function Hearts() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <span
        className='cursor-pointer'
        onClick={() => setIsClicked((prev) => !prev)}
      >
        {isClicked ? '♥️' : '♡'}
      </span>
    </>
  );
}

export default Hearts;
