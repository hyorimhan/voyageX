import { createClient } from '@/supabase/client';
import TourCard from './TourCard';
import toast from 'react-hot-toast';
import { Tour } from '@/types/tourPropsType';

async function TourList() {
  const supabase = createClient();
  const { data: tours, error } = await supabase.from('tours').select(`
        id,
        price, 
        tag,
        planets (
          name, 
          planet_img,
          description
        )
      `);

  if (error) {
    toast(error.message);
  }

  return (
    <div className='grid grid-cols-3 gap-8 p-4 mt-[10%]'>
      {tours?.map((tour) => (
        <TourCard key={tour.id} tour={tour as Tour} />
      ))}
    </div>
  );
}

export default TourList;
