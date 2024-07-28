import { createClient } from '@/supabase/client';

const supabase = createClient();

export const tourList = async () => {
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
  return { tours, error };
};

export const tourDetail = async (id: string) => {
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

  return { tours, error };
};
