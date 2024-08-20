import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import TourDetailContents from './TourDetailContents';
import { tourSchedule } from '@/services/tour';
import { Tour, TourSchedule } from '@/types/tourPropsType';
import { useQuery } from '@tanstack/react-query';
import AccordionImg from './AccordionImg';
import Image from 'next/image';

function TourAccordion({ tour }: { tour: Tour }) {
  const { data: schedule, isLoading } = useQuery<TourSchedule[]>({
    queryKey: ['schedule', tour.id],
    queryFn: () => tourSchedule(tour.id),
  });

  return (
    <Accordion allowMultiple className='mt-6 mb-60 md:mx-5'>
      {schedule?.map((sche) => (
        <div className='lg:flex mt-[50px]' key={sche.id}>
          <span className=' flex-none sm:hidden sm:h-11 md:hidden  flex justify-center items-center border rounded-full w-[74px] h-[74px] mr-4 bg-black-600 '>
            <div className='text-center sm:text-sm'>{sche.day} DAY</div>
          </span>

          <AccordionItem
            header={({ state: { isEnter } }) => (
              <div className='flex'>
                <span className=' flex-none sm:w-11 sm:h-11 flex justify-center items-center border rounded-full w-[74px] h-[74px] mr-4 lg:hidden bg-black-600 '>
                  <div className='text-center lg:hidden  sm:text-sm'>
                    {sche.day} DAY
                  </div>
                </span>

                <div className='w-60 md:mt-5  md:w-[400px] sm:mt-2 lg:w-[990px] mx-auto text-left'>
                  {sche.date}
                  <div className='sm:text-xs sm:hidden'>{sche.description}</div>
                </div>
                <div className='sm:mt-2 sm:w-full sm:my-auto md:mt-5 flex'>
                  <AccordionImg isEnter={isEnter} />
                </div>
              </div>
            )}
            key={sche.id}
            className='overflow-hidden mt-[11px] '
          >
            <div className='text-sm mt-4 sm:block lg:hidden md:hidden '>
              {sche.description}
            </div>
            <div className='mt-16 text-sm'>
              <div className='flex'>
                <Image
                  src={'/icons/16px/spaceDeco.svg'}
                  alt='space'
                  width={16}
                  height={160}
                  className='h-[160px] object-cover'
                />
                <div className='h-[160px]'>
                  <div className='ml-6 mb-4'>
                    {sche.tour_activities?.schedule}
                  </div>
                  <div className='w-[210px] h-[140px] ml-6 '>
                    {!isLoading && !schedule !== undefined ? (
                      <Image
                        src={sche.tour_activities?.tour_img!}
                        alt='tour_img'
                        width={210}
                        height={120}
                        className='w-[210px] h-[120px] object-cover'
                      />
                    ) : (
                      <div className='w-[210px] h-[120px] bg-black-500 animate-pulse rounded' />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <TourDetailContents
              title='숙박'
              description='본 일정의 숙박 시설은 우주선 내 시설을 이용할 예정입니다'
            />
            <TourDetailContents
              title='식사'
              description={sche.tour_activities?.meal!}
            />
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}

export default TourAccordion;
