import { createClient } from '@/supabase/client';
import { Planet } from '@/services/tour';

const supabase = createClient();

export const getPlanetsList = async (): Promise<any[]> => {
  const { data: planets, error } = await supabase.from('planets').select(`*`);
  if (error) {
    throw error;
  }

  return planets as unknown as Planet[];
};