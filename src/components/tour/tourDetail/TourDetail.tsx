'use client';
import { Tour, tourProps } from '@/types/tourPropsType';
import DetailCard from './DetailCard';
import { tourList } from '../../../services/tour';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';

function TourDetail({ params }: tourProps) {
  const { id } = params;

  const { data: tours, isLoading } = useQuery<Tour[]>({
    queryKey: ['tours'],
    queryFn: tourList,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!tours || !Array.isArray(tours)) {
    return <div>투어 정보를 찾을 수 없습니다.</div>;
  }

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return <div>투어 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <DetailCard key={tour.id} tour={tour} />
    </>
  );
}

export default TourDetail;