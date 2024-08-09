import { getIsLikedPost, likePost, unlikePost } from '@/services/community';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetIsLikedPostByUser = (post_id: string, user_id: string) => {
  return useQuery<boolean>({
    queryKey: ['like', post_id, user_id],
    queryFn: () => getIsLikedPost(post_id, user_id),
  });
};

export const useToggleLikePost = (post_id: string, user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isLiked: boolean) => {
      return isLiked
        ? unlikePost(post_id, user_id)
        : likePost(post_id, user_id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['like', post_id, user_id] });
      const previousLikeStatus = queryClient.getQueryData([
        'like',
        post_id,
        user_id,
      ]);
      queryClient.setQueryData(['like', post_id, user_id], !previousLikeStatus);
      return { previousLikeStatus };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ['like', post_id, user_id],
        context?.previousLikeStatus,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['like', post_id, user_id] });
    },
  });
};
