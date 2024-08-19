import { getIsLikedPost, likePost, unlikePost } from '@/services/community';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useToggleLikePost = (post_id: string, user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isLiked: boolean) => {
      return isLiked
        ? unlikePost(post_id, user_id)
        : likePost(post_id, user_id);
    },
    onMutate: async (isLiked) => {
      await queryClient.cancelQueries({ queryKey: ['like', post_id, user_id] });
      await queryClient.cancelQueries({ queryKey: ['post', post_id] });

      const previousLikeStatus = queryClient.getQueryData([
        'like',
        post_id,
        user_id,
      ]);
      const previousPost = queryClient.getQueryData(['post', post_id]);

      queryClient.setQueryData(['like', post_id, user_id], !isLiked);
      queryClient.setQueryData(['post', post_id], (old: any) => ({
        ...old,
        likes: old.likes + (isLiked ? -1 : 1),
      }));

      return { previousLikeStatus, previousPost };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ['like', post_id, user_id],
        context?.previousLikeStatus,
      );
      queryClient.setQueryData(['post', post_id], context?.previousPost);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['like', post_id, user_id] });
      queryClient.invalidateQueries({ queryKey: ['post', post_id] });
    },
  });
};
