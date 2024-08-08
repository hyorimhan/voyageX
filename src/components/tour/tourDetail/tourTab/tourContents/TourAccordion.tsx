import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import TourDetailContents from './TourDetailContents';
import { tourSchedule } from '@/services/tour';
import { Tour, TourSchedule } from '@/types/tourPropsType';
import Loading from '@/components/common/Loading';
import { useQuery } from '@tanstack/react-query';
import AccordionImg from './AccordionImg';

function TourAccordion({ tour }: { tour: Tour }) {
  const { data: schedule, isLoading } = useQuery<TourSchedule[]>({
    queryKey: ['schedule', tour.id],
    queryFn: () => tourSchedule(tour.id),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Accordion allowMultiple className='mt-6 mb-60 md:mx-5'>
      {schedule?.map((sche) => (
        <div className='flex mt-[50px]' key={sche.id}>
          <div className=' flex-none  flex justify-center items-center border rounded-full w-[74px] h-[74px] mr-4 bg-black-600 '>
            <div className='text-center'>{sche.day} DAY</div>
          </div>

          <AccordionItem
            header={({ state: { isEnter } }) => (
              <div className='flex '>
                <div className='w-full sm:w-[200px] md:w-[600px] lg:w-[990px] mx-auto text-left'>
                  {sche.date}
                </div>
                <div>
                  <AccordionImg isEnter={isEnter} />
                </div>
              </div>
            )}
            key={sche.id}
            className='overflow-hidden mt-[11px] '
          >
            <div className='text-sm mt-4'>{sche.description}</div>
            <div className='mt-16 text-sm'>
              {sche.tour_activities?.schedule1}
            </div>
            <div className='text-sm'>{sche.tour_activities?.schedule2}</div>
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
