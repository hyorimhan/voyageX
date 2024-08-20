import React from 'react';
import PlanetSlider from './PlanetSlider';
import Link from 'next/link';
import { Planet } from '@/services/tour';
import { orbitron } from '../../../public/fonts/orbitron';

interface PlanetSectionProps {
  planets: Planet[];
  videoLoaded: boolean;
}

const PlanetSection: React.FC<PlanetSectionProps> = ({
  planets,
  videoLoaded,
}) => {
  return (
    <section
      className='section h-screen flex flex-col items-center justify-center relative bg-center bg-cover bg-no-repeat transition-opacity duration-500 opacity-100'
      style={{
        backgroundImage: 'url(/images/section2_bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <p
        className={`absolute top-32 left-4 text-white text-4xl font-semibold fade-text ${orbitron.className} sm:text-2xl sm:font-medium sm:top-24`}
      >
        <span className='hidden sm:inline'>
          Let's Find <br className='sm:block hidden' /> Popular Planets!
        </span>
        <span className='sm:hidden'>Let's Find Popular Planets!</span>
      </p>

      <Link href='/tour'>
        <p className='absolute top-36 right-20 sm:right-6 z-10 sm:text-xs sm:top-36 text-lg font-normal underline'>
          MORE+
        </p>
      </Link>

      <PlanetSlider planets={planets} />
    </section>
  );
};

export default PlanetSection;
