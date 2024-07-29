import {
  deleteCartItem,
  getCartList,
  getGoods,
  getIsLikeOfGoodsByUser,
  getLikedGoodsByUser,
  toggleLikeGoods,
} from '@/services/goods';
import { LikedGoodsType } from '@/types/goods';
import { CartListType } from '@/types/mypageType';
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

export const useGetAllLIkedGoodsByUser = (user_id: string, table: string) => {
  return useQuery<LikedGoodsType[]>({
    queryKey: ['likedGoods', user_id, table],
    queryFn: () => getLikedGoodsByUser(user_id, table),
  });
};

export const useGetCartList = (user_id: string) => {
  return useQuery<CartListType[]>({
    queryKey: ['cart', user_id],
    queryFn: () => getCartList(user_id),
  });
};
