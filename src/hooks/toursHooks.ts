import { getLikedToursByUser } from '@/services/tour';
import { LikedPlanetType } from '@/types/mypageType';
import { useQuery } from '@tanstack/react-query';

export const useGetLikedToursByUser = (user_id: string) => {
  return useQuery<LikedPlanetType[]>({
    queryKey: ['likedTour', user_id],
    queryFn: () => getLikedToursByUser(user_id),
  });
};
