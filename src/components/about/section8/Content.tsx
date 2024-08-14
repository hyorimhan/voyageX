import { useRef, useEffect } from 'react';
import { usePresence } from 'framer-motion';
import { gsap } from 'gsap';

function Content() {
  const ref = useRef(null);
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      gsap.to(ref.current, {
        opacity: 0,
        onComplete: () => safeToRemove?.(),
      });
    }
  }, [isPresent, safeToRemove]);
  return (
    <div
      ref={ref}
      className='w-[300px] h-[300px] flex items-start justify-center font-yuna bg-black-50 font-[240px] rounded-lg'
    >
      {''}
    </div>
  );
}

export default Content;
