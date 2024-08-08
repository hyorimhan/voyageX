import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { tourList, Tour } from '@/services/tour';

const useFetchTourDetail = (): UseQueryResult<Tour[], Error> => {
  return useQuery<Tour[], Error>({
    queryKey: ['tourList'],
    queryFn: () => tourList(),
  });
};

export default useFetchTourDetail;
