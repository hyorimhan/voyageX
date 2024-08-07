'use client';
import { Tour, tourProps } from '@/types/tourPropsType';
import DetailCard from './DetailCard';
import { tourDetail } from '../../../services/tour';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';

function TourDetail({ params }: tourProps) {
  const { id } = params;
  const { data: tours, isLoading } = useQuery<Tour[]>({
    queryKey: ['tours', id],
    queryFn: () => tourDetail(id),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {tours?.map((tour) => (
        <DetailCard key={tour.id} tour={tour} />
      ))}
    </>
  );
}

export default TourDetail;
