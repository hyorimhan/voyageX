import {
  getIsLikeTourByUser,
  getLikedToursByUser,
  getTourListByOrder,
  toggleLikeTours,
} from '@/services/tour';
import { LikedPlanetType } from '@/types/mypageType';
import { TourOrderType } from '@/types/tour';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetLikedToursByUser = (user_id: string) => {
  return useQuery<LikedPlanetType[]>({
    queryKey: ['likedTour', user_id],
    queryFn: () => getLikedToursByUser(user_id),
  });
};

export const useGetIsLikedTourByUser = (tour_id: string, user_id: string) => {
  return useQuery<boolean>({
    queryKey: ['like', tour_id, user_id],
    queryFn: () => getIsLikeTourByUser(tour_id, user_id),
  });
};

export const useToggleLikeTours = (tour_id: string, user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleLikeTours,
    onMutate: async ({ tour_id, user_id, isLiked }) => {
      await queryClient.cancelQueries({
        queryKey: ['like', tour_id, user_id],
      });
      const previousHeart = queryClient.getQueryData([
        'like',
        tour_id,
        user_id,
      ]);
      queryClient.setQueriesData(
        { queryKey: ['like', tour_id, user_id] },
        !isLiked,
      );
      return { previousState: previousHeart };
    },
    onError: (err, isLiked, context) => {
      queryClient.setQueriesData(
        { queryKey: ['like', tour_id, user_id] },
        context?.previousState,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['like', tour_id, user_id] });
    },
  });
};

export const useGetTourListByRating = async () => {
  return useQuery<TourOrderType[]>({
    queryKey: ['tours', 'rating'],
    queryFn: getTourListByOrder,
  });
};
