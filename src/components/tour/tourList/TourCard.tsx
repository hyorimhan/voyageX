import { Tour, TourDateList } from '@/types/tourPropsType';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightCircle } from 'react-icons/bs';
import { orbitron } from '../../../../public/fonts/orbitron';
import { useQuery } from '@tanstack/react-query';
import { getTourDateList } from '@/services/tour';
import { format } from 'date-fns';

function TourCard({ tour }: { tour: Tour }) {
  const { data: dateList } = useQuery<TourDateList[]>({
    queryKey: ['dateList'],
    queryFn: getTourDateList,
  });

  const formatDate = (date: string | null) => {
    return date ? format(new Date(date), 'yyyy.MM.dd') : 'N/A';
  };

  return (
    <Link href={`/tour/${tour.id}`}>
      <div className='relative w-88 h-[491px] group overflow-hidden border-[1px] border-black-500 rounded-lg shadow-md lg:hover:scale-105 sm:h-[418px]'>
        <Image
          src={tour.planets?.planet_img!}
          alt={tour.planets?.name!}
          width={280}
          height={280}
          className='mx-auto mt-8 sm:mt-4 sm:h-[260px] sm:w-[260px]'
        />
        <div className='mt-8 text-center text-4xl group-hover:opacity-0 transition-opacity '>
          <div className='font-yangpyeong font-medium mb-[6px]'>
            {tour.planets?.name}
          </div>
          <div className={`${orbitron.className} font-semibold`}>
            {tour.planets?.english_name}
          </div>
        </div>
        <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black-1000 transition-opacity'>
          <div className='absolute w-9 h-9 top-11 right-8'>
            <BsArrowRightCircle size={39} />
          </div>
          <div className='transform translate-y-9 group-hover:translate-y-0 transition-transform text-xl w-[288px] h-[213px] text-left mb-8 mt-[246px] sm:mt-[160px]'>
            <div className='font-medium text-2xl'>
              {tour.planets?.name}ㅣ{tour.planets?.english_name}
            </div>
            <div className='my-4 font-medium text-primary-200 text-2xl'>
              {tour.price?.toLocaleString()}원 ~
            </div>
            <div className='text-sm'>{tour.tag}</div>
            <div className='text-base mt-4 flex gap-[25px]'>
              <div className='text-primary-300'>
                <p>출발확정</p>
                <p>여행기간</p>
                <p>우주선명</p>
              </div>
              <div>
                {dateList && dateList.length > 0 ? (
                  <p>{formatDate(dateList[0]?.depart_date)} </p>
                ) : (
                  <p>새로운 여행을 기다려주세요!</p>
                )}
                {dateList && dateList.length > 0 ? (
                  <p className='flex gap-1'>
                    {formatDate(dateList[0]?.depart_date)}
                    <p>~</p>
                    {formatDate(dateList[0]?.arrive_date)}
                  </p>
                ) : (
                  <p>새로운 여행을 기다려주세요!</p>
                )}
                <p>{tour.spaceship}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TourCard;
