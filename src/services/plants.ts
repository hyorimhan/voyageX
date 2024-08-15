import { createClient } from '@/supabase/client';
import { Planet } from '@/services/tour';

const supabase = createClient();

export const getPlanetsList = async (): Promise<Planet[]> => {
  const { data: planets, error } = await supabase.from('planets').select(`
    id,
    name,
    description,
    planet_img,
    title,
    english_name,
    tours (
      price
    )
  `);

  if (error) {
    throw error;
  }

  return (planets ?? []).map((planet) => {
    const tour = planet.tours?.[0];
    const price = tour?.price ?? 0;

    return {
      ...planet,
      price: parseInt(price.toString(), 10),
    };
  });
};
