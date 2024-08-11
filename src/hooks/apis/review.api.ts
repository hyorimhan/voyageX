import { getGoodsReview, getOrderedGoodsReviewId } from '@/services/review';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

export const useGetGoodsReview = ({
  user_id,
  goods_id,
}: {
  user_id: string;
  goods_id: string;
}) => {
  return useQuery<Tables<'goods_reviews'>>({
    queryKey: ['reviews', user_id, goods_id],
    queryFn: () => getGoodsReview({ user_id, goods_id }),
  });
};

export const useGetOrderedGoodsReviewId = ({
  order_id,
  goods_id,
}: {
  order_id: string;
  goods_id: string;
}) => {
  return useQuery<{ review_id: string }>({
    queryKey: ['reviews', order_id, goods_id],
    queryFn: () => getOrderedGoodsReviewId({ order_id, goods_id }),
  });
};
