import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Content from './Content';
import Scroll from '../Scroll';

function Section8() {
  const [show, setShow] = useState(false);
  return (
    <section className='relative sm:w-full sm:h-screen md:w-full md:h-screen md:overflow-hidden sm:overflow-hidden'>
      <div className='about-section'>
        <div className='z-10 relative flex flex-col items-center justify-center h-full'>
          <Scroll>
            <div className='flex flex-col items-center justify-start '>
              <div className='flex flex-col p-0 pb-12 items-cente '>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShow(!show)}
                  className='font-yuna text-5xl  rounded-lg py-2 px-7 bg-primary-400'
                >
                  {show ? 'close' : '출처, 기타'}
                </motion.button>
              </div>
              <AnimatePresence>{show ? <Content /> : null}</AnimatePresence>
            </div>
          </Scroll>
        </div>
      </div>
    </section>
  );
}

export default Section8;
