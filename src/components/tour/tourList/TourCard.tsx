import { Tour } from '@/types/tourPropsType';
import Image from 'next/image';
import Link from 'next/link';

import { BsArrowRightCircle } from 'react-icons/bs';
import { orbitron } from '../../../../public/fonts/orbitron';

function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/tour/${tour.id}`}>
      <div className='relative w-88 h-[491px] group overflow-hidden border-[1px] border-black-500 rounded-lg shadow-md lg:hover:scale-105'>
        <Image
          src={tour.planets?.planet_img!}
          alt={tour.planets?.name!}
          width={280}
          height={280}
          className='mx-auto mt-8'
        />
        <div className='mt-8 text-center text-4xl group-hover:opacity-0  transition-opacity '>
          <div className='font-yangpyeong font-medium mb-[6px]'>
            {tour.planets?.name}
          </div>
          <div className={`${orbitron.className} font-semibold`}>
            {tour.planets?.english_name}
          </div>
        </div>
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black-400 transition-opacity'>
          <div className='absolute w-9 h-9 top-11 right-8'>
            <BsArrowRightCircle size={39} />
          </div>
          <div className='transform translate-y-8 group-hover:translate-y-0 transition-transform   text-xl w-[228px] h-[213px] text-left mt-60'>
            <div className='font-medium'>
              {tour.planets?.name}ㅣ{tour.planets?.english_name}
            </div>
            <div className='my-4 font-medium'>
              {tour.price?.toLocaleString()}원 ~
            </div>
            <div className='text-sm'>{tour.tag}</div>
            <div className='text-base mt-2'>우주선 명 {tour.spaceship}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TourCard;
