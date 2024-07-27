import { createClient } from '@/supabase/client';
import { Tour, tourProps } from '@/types/tourPropsType';
import toast from 'react-hot-toast';
import DetailCard from './DetailCard';

async function TourDetail({ params }: tourProps) {
  const supabase = createClient();
  const { id } = params;
  const { data: tours, error } = await supabase
    .from('tours')
    .select(
      `
    price,
    tag,
    id,
    planets (
      name,
      description,
      planet_img
    )
  `,
    )
    .eq('id', id);

  if (error) {
    toast(error.message);
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
