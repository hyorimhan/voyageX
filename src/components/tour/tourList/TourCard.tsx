'use client';
import { Tour } from '@/types/tourPropsType';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { BsArrowRightCircle } from 'react-icons/bs';

function TourCard({ tour }: { tour: Tour }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (container) {
        const x = e.offsetX;
        const rotateY = (-1 / 5) * x + 20;

        container.style.transform = `perspective(600px) rotateY(${rotateY}deg)`;
      }
    };

    const handleMouseOut = () => {
      if (container) {
        container.style.transform =
          'perspective(600px) rotateY(0deg) rotateX(0deg)';
      }
    };

    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseout', handleMouseOut);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, []);

  return (
    <Link href={`/tour/${tour.id}`}>
      <div
        ref={containerRef}
        className='relative w-88 h-[491px] group overflow-hidden border rounded-lg shadow-md transition-transform transform '
      >
        <Image
          src={tour.planets.planet_img}
          alt={tour.planets.name!}
          width={280}
          height={280}
          className='mx-auto mt-8'
        />
        <div className='mt-8 text-center text-3xl group-hover:opacity-0 transition-opacity'>
          <div>{tour.planets.name}</div>
          <div>{tour.planets.english_name}</div>
        </div>
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className='absolute w-9 h-9 top-11 right-8'>
            <BsArrowRightCircle size={39} />
          </div>
          <div className='transform translate-y-8 group-hover:translate-y-0 transition-transform text-xl w-[228px] h-[213px] text-left mt-60'>
            <div>
              {tour.planets.name}ㅣ{tour.planets.english_name}
            </div>
            <div className='my-4'>{tour.price?.toLocaleString()}원 ~</div>
            <div className='text-sm'>{tour.tag}</div>
            <div className='text-base mt-2'>우주선 명 스타라이저</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TourCard;
