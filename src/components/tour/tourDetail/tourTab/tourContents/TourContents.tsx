import { Tour } from '@/types/tourPropsType';
import TourAccordion from './TourAccordion';

function TourContents({ tour }: { tour: Tour }) {
  return (
    <div>
      <div className='mt-12 text-2xl font-semibold'>
        {tour.planets?.name} 여행 패키지 일정
      </div>
      <div className='mt-6 font-medium'>{tour.planets?.title}</div>
      <div className='mt-6 font-medium'>{tour.planets?.description}</div>
      <TourAccordion tour={tour} />
    </div>
  );
}

export default TourContents;
