'use client';
import { Tour, tourProps } from '@/types/tourPropsType';
import DetailCard from './DetailCard';
import { tourList } from '../../../services/tour';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';
import TopBtnMobile from '@/components/common/TopBtnMobile';

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

  const tour =
    tours.find((tour) => tour.id === id) ||
    tours.find((tour) => tour.planet_id === id);

  if (!tour) {
    return <div>투어 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <DetailCard key={tour.id} tour={tour} />
      <TopBtnMobile size={'lg:text-3xl sm:text-2xl'} />
    </>
  );
}

export default TourDetail;
