import {
  getGoodsReview,
  getOrderedGoodsReviewId,
  getOrderedTourReviewId,
  getTourReview,
} from '@/services/review';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

export const useGetGoodsReview = ({
  user_id,
  goods_id,
  review_id,
}: {
  user_id: string;
  goods_id: string;
  review_id: string;
}) => {
  return useQuery<Tables<'goods_reviews'>>({
    queryKey: ['reviews', review_id],
    queryFn: () => getGoodsReview({ user_id, goods_id, review_id }),
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

export const useGetTourReview = ({
  user_id,
  tour_id,
  review_id,
}: {
  user_id: string;
  tour_id: string;
  review_id: string;
}) => {
  return useQuery<Tables<'tour_reviews'>>({
    queryKey: ['reviews', review_id],
    queryFn: () => getTourReview({ user_id, tour_id, review_id }),
  });
};

export const useGetOrderedTourReviewId = ({
  order_id,
  tour_id,
}: {
  order_id: string;
  tour_id: string;
}) => {
  return useQuery<{ review_id: string }>({
    queryKey: ['reviews', order_id, tour_id],
    queryFn: () => getOrderedTourReviewId({ order_id, tour_id }),
  });
};
