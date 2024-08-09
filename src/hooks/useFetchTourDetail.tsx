import { useQuery } from '@tanstack/react-query';
import { tourList } from '@/services/tour';
import { Tour } from '@/types/tourPropsType';

const useFetchTourDetail = () => {
  return useQuery<Tour[], Error>({
    queryKey: ['tourList'],
    queryFn: tourList,
  });
};

export default useFetchTourDetail;
