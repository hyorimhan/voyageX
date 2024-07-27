import { Tour } from '@/types/tourPropsType';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightCircle } from 'react-icons/bs';

function TourCard({ tour }: { tour: Tour }) {
  return (
    <>
      <Link href={`/tour/${tour.id}`}>
        <div className='relative w-[352px] h-[491px] group overflow-hidden border rounded-lg shadow-md transition-transform transform'>
          <Image
            src={tour.planets.planet_img}
            alt={tour.planets.name}
            width={280}
            height={280}
            className='mx-auto mt-8'
          />
          <div className='mt-8 text-center text-[36px] group-hover:opacity-0 transition-opacity'>
            {tour.planets.name}
          </div>
          <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black-600'>
            <div className='absolute w-[36px] h-[36px] top-[44px] right-[34px]'>
              <BsArrowRightCircle size={39} />
            </div>
            <div className=' transform  translate-y-8 group-hover:translate-y-0 transition-transform text-[24px] w-[228px] h-[213px] text-left mt-[246px]'>
              <div>{tour.planets.name}</div>
              <div className='my-[16px]'>{tour.price.toLocaleString()}원</div>
              <div className='text-[16px]'>{tour.tag}</div>
              <div className='text-[16px]'>우주선명 스타라이저</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TourCard;
