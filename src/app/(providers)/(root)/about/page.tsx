'use client';

import { useScroll, motion } from 'framer-motion';
import Section1 from '@/components/about/Section1';
import Section2 from '@/components/about/Section2';
import Section3 from '@/components/about/Section3';
import Section4 from '@/components/about/Section4';
import Section5 from '@/components/about/Section5';
import Section7 from '@/components/about/section7/Section7';
import Section6 from '@/components/about/Section6';
import Section8 from '@/components/about/section8/Section8';

function AboutPage() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className='fixed z-50 top-0 right-0 left-0 h-[10px] bg-primary-300 origin-top-left'
        style={{ scaleX: scrollYProgress }}
      />

      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
    </>
  );
}

export default AboutPage;
