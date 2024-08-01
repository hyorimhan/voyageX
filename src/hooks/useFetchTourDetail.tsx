import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react'

type Planet = {
  id: string;
  name: string;
  description: string;
  planet_img: string;
  english_name: string | null;
  title: string | null;
  price?: number; 
}

type TourPrice = {
  id: string;
  price: number;
}

const useFetchTourDetail = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [tourPrices, setTourPrices] = useState<TourPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const supabase = createClient();

        const { data: planetData, error: planetError } = await supabase
          .from('planets')
          .select('*');

        if (planetError) {
          setError(planetError.message);
          return;
        } else {
          setPlanets(planetData || []);
        }

        const { data: tourData, error: tourError } = await supabase
          .from('tours')
          .select('planet_id, price');

        if (tourError) {
          setError(tourError.message);
          return;
        } 

        // planets와 tourPrices 데이터를 병합
        const enrichedPlanets = (planetData || []).map((planet) => {
          const priceObj = (tourData || []).find((price) => price.planet_id === planet.id);
          return { ...planet, price: priceObj?.price};
        });

        setPlanets(enrichedPlanets);

      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  return { planets, loading, error };
}

export default useFetchTourDetail;