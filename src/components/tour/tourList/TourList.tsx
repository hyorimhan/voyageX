'use client';
import TourCard from './TourCard';
import { Tour } from '@/types/tourPropsType';
import { tourList } from '@/services/tour';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';

function TourList() {
  const { data: tours, isLoading } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const { tours, error } = await tourList();
      if (error) {
        console.log(error);
      }
      return tours ?? [];
    },
  });
  if (isLoading) {
    return <Loading />;
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
