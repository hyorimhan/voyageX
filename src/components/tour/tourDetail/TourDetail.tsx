import { Tour, tourProps } from '@/types/tourPropsType';
import toast from 'react-hot-toast';
import DetailCard from './DetailCard';
import { tourDetail } from '../../../services/tour';

async function TourDetail({ params }: tourProps) {
  const { id } = params;
  const { tours, error } = await tourDetail(id);

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      {tours?.map((tour) => (
        <DetailCard key={tour.id} tour={tour as Tour} />
      ))}
    </>
  );
}

export default TourDetail;
