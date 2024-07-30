import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react'

type Planet = {
  id: string;
  name: string;
  description: string;
  planet_img: string;
  english_name: string | null;
  title: string | null;
}

const useFetchTourDetail = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
        .from('planets')
        .select('*');

        if (error) {
          setError(error.message);
        } else {
          setPlanets(data || []);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  return { planets, loading, error };
}

export default useFetchTourDetail