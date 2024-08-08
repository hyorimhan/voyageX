import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { tourDetail, Tour } from '@/services/tour';

const useFetchTourDetail = (tourId: string): UseQueryResult<Tour | null, Error> => {
  return useQuery<Tour | null, Error>({
    queryKey: ['tourDetail', tourId],
    queryFn: () => tourDetail(tourId),
  });
};

export default useFetchTourDetail;
