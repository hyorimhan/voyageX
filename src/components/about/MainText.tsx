'use client';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { useRef } from 'react';
import { wrap } from '@motionone/utils';

interface ParallaxProps {
  children: string | React.ReactNode;
  baseVelocity: number;
}

function MainText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-5, 25, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className=' overflow-hidden whitespace-nowrap eading-[0.8] m-0 flex flex-nowrap '>
      <motion.div
        className='font-medium uppercase lg:text-6xl sm:text-xl flex whitespace-nowrap flex-nowrap'
        style={{ x }}
      >
        <span className='block mr-[10px]'>{children} </span>
        <span className='block mr-[10px]'>{children} </span>
        <span className='block mr-[10px]'>{children} </span>
        <span className='block mr-[10px]'>{children} </span>
      </motion.div>
    </div>
  );
}

export default MainText;
