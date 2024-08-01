import TourCard from './TourCard';
import {toast} from 'react-hot-toast';
import { Tour } from '@/types/tourPropsType';
import { tourList } from '@/services/tour';

async function TourList() {
  const { tours, error } = await tourList();

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <div className='text-2xl mt-32 text-center'>Travel Package</div>
      <div className='grid grid-cols-3 gap-8 p-4 mt-10'>
        {tours?.map((tour) => (
          <TourCard key={tour.id} tour={tour as Tour} />
        ))}
      </div>
    </>
  );
}

export default TourList;