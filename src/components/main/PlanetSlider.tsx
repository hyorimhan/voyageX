'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Planet } from '@/services/tour';
import useSlideAnimation from '@/hooks/useSlideAnimation';

const PlanetSlider = ({ planets }: { planets: Planet[] }) => {
  const planetsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  const visiblePlanetsCount = 3;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useSlideAnimation(
    isClient,
    planets,
    currentSlide,
    visiblePlanetsCount,
    planetsRef,
  );

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % planets.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + planets.length) % planets.length);
  };

  return (
    <div className='scroll-container h-full w-full relative flex items-center justify-center'>
      <button
        onClick={handlePrevSlide}
        className='absolute left-2 sm:left-4 z-10 p-2'
        style={{
          background: "url('/images/left.png') no-repeat center",
          width: '40px',
          height: '40px',
          backgroundSize: 'contain',
        }}
      ></button>
      <div className='slider-container relative flex items-center justify-center'>
        {planets.map((planet, index) => {
          const totalPlanets = planets.length;
          const angle = (index / totalPlanets) * 2 * Math.PI;

          const xPos = 150 * Math.cos(angle);
          const yPos = 0;
          const zPos = 150 * Math.sin(angle);

          const isVisible =
            (index >= currentSlide &&
              index < currentSlide + visiblePlanetsCount) ||
            (index < currentSlide &&
              index + planets.length < currentSlide + visiblePlanetsCount);

          const isActive =
            index ===
            (currentSlide + Math.floor(visiblePlanetsCount / 2)) %
              planets.length;

          return (
            <Link href={`/tour/${planet.id}`} key={index} passHref>
              <div
                ref={(el) => {
                  planetsRef.current[index] = el;
                }}
                data-id={planet.id}
                className={`absolute w-20 h-20 sm:w-24 sm:h-24 transform-gpu transition-opacity duration-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transform: `translate3d(${xPos}px, ${yPos}px, ${zPos}px) scale(${
                    isActive ? 1.5 : 1
                  })`,
                  transformOrigin: 'center center',
                  zIndex: isActive ? 10 : 0,
                  opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                }}
              >
                <Image
                  src={planet.planet_img}
                  alt={`Planet ${index + 1}`}
                  fill
                  sizes='100vw'
                  style={{ objectFit: 'contain' }}
                />
                {isActive && (
                  <div className='text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-max'>
                    <p className='font-semibold text-black-50'>{planet.name}</p>
                    <p>
                      {planet.price
                        ? `₩${planet.price.toLocaleString()}`
                        : 'Price Does Not Exist'}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <button
        onClick={handleNextSlide}
        className='absolute right-2 sm:right-4 z-10 p-2'
        style={{
          background: "url('/images/right.png') no-repeat center",
          width: '40px',
          height: '40px',
          backgroundSize: 'contain',
        }}
      ></button>
    </div>
  );
};

export default PlanetSlider;
