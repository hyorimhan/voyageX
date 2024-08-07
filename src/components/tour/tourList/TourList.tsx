'use client';
import TourCard from './TourCard';
import { Tour } from '@/types/tourPropsType';
import { tourList } from '@/services/tour';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';
import { orbitron } from '@/../public/fonts/orbitron';

function TourList() {
  const { data: tours, isLoading } = useQuery({
    queryKey: ['tours'],
    queryFn: () => tourList(),
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={`text-[28px] mt-32 text-center ${orbitron.className} font-semibold`}
      >
        Travel Package
      </div>
      <div className='grid grid-cols-3 gap-8 p-4 mt-10'>
        {tours?.map((tour) => (
          <TourCard key={tour.id} tour={tour as Tour} />
        ))}
      </div>
    </>
  );
}

export default TourList;
