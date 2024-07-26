import { createClient } from '@/supabase/client';

async function TourList() {
  const supabase = createClient();

  const { data, error } = await supabase.from('tours').select('*');

  if (error) {
    console.error('Error fetching tours:', error.message, error.details);
  }

  console.log('data', data);

  return (
    <div>
      <div>
        <h1>Travel Package</h1>
      </div>
    </div>
  );
}

export default TourList;
