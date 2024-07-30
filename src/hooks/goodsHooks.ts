import {
  deleteCartItem,
  getCartList,
  getGoods,
  getGoodsItem,
  getIsLikedGoodsByUser,
  getLikedGoodsByUser,
  toggleLikeGoods,
} from '@/services/goods';
import { LikedGoodsType } from '@/types/goods';
import { CartListType } from '@/types/mypageType';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetOrderedGoods = (sortBy: string) => {
  let order = 'like_count';
  if (sortBy === '인기순') order = 'like_count';
  else if (sortBy === '최신순') order = 'created_at';
  else if (sortBy === '가격 높은 순') order = 'goods_price';
  else if (sortBy === '가격 낮은 순') order = '-goods_price';
  else if (sortBy === '별점 높은 순') order = 'rating_avg';
  else if (sortBy === '별점 낮은 순') order = '-rating_avg';
  return useQuery<Tables<'goods'>[]>({
    queryKey: ['goods', { order }],
    queryFn: () => getGoods(order),
  });
};

export const useGetIsLikedGoodsByUser = (goods_id: string, user_id: string) => {
  return useQuery<boolean>({
    queryKey: ['like', goods_id, user_id],
    queryFn: () => getIsLikedGoodsByUser(goods_id, user_id),
  });
};

export const useToggleLikeGoods = (
  goods_id: string,
  user_id: string,
  isLiked: boolean,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleLikeGoods,
    onMutate: async ({ goods_id, user_id, isLiked }) => {
      await queryClient.cancelQueries({
        queryKey: ['like', goods_id, user_id],
      });
      const previousHeart = queryClient.getQueryData([
        'like',
        goods_id,
        user_id,
      ]);
      queryClient.setQueriesData(
        { queryKey: ['like', goods_id, user_id] },
        !isLiked,
      );
      return { previousState: previousHeart };
    },
    onError: (err, isLiked, context) => {
      queryClient.setQueriesData(
        { queryKey: ['like', goods_id, user_id] },
        context?.previousState,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['like', goods_id, user_id] });
    },
  });
};

export const useGetLikedGoodsByUser = (user_id: string, table: string) => {
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

//굿즈 아이템 하나만 가져오기
export const useGetGoodsItem = (id: string) => {
  return useQuery<Tables<'goods'>>({
    queryKey: ['goods', id],
    queryFn: () => getGoodsItem(id),
  });
};
