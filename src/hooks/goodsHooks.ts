import {
  getGoods,
  getIsLikeOfGoodsByUser,
  toggleLikeGoods,
} from '@/services/goods';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetOrderedGoods = (order: string) => {
  return useQuery<Tables<'goods'>[]>({
    queryKey: ['goods', { order }],
    queryFn: () => getGoods(order),
  });
};

export const useGetLikedGoodsByUser = (goods_id: string, user_id: string) => {
  return useQuery<Tables<'liked_goods'>[]>({
    queryKey: ['like', goods_id, user_id],
    queryFn: () => getIsLikeOfGoodsByUser(goods_id, user_id),
  });
};

export const useToggleLikeGoods = (goods_id: string, user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleLikeGoods,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like', goods_id, user_id] });
    },
  });
};
