import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

interface Planet {
  id: string;
  planet_img: string;
  name: string;
  price?: number;
}

interface TourDetail {
  planets: Planet[];
}

const fetchTourDetail = async (): Promise<TourDetail> => {
  const { data } = await axios.get('/api/tourDetail');
  return data;
};

const useFetchTourDetail = (): UseQueryResult<TourDetail, Error> => {
  return useQuery<TourDetail, Error>({
    queryKey: ['tourDetail'],
    queryFn: fetchTourDetail,
  });
};

export default useFetchTourDetail;