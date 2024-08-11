import axios from 'axios';

export const getGoodsReview = async ({
  user_id,
  goods_id,
}: {
  user_id: string;
  goods_id: string;
}) => {
  const response = await axios.get(
    `/api/review/${user_id}?goods_id=${goods_id}`,
  );
  return response.data;
};

export const getOrderedGoodsReviewId = async ({
  order_id,
  goods_id,
}: {
  order_id: string;
  goods_id: string;
}) => {
  const response = await axios.get(
    `/api/review/order/${order_id}?goods_id=${goods_id}`,
  );
  return response.data;
};

export const createGoodsReview = async ({
  review_id,
  user_id,
  goods_id,
  order_id,
  rating,
  review,
}: {
  review_id: string;
  user_id: string;
  goods_id: string;
  order_id: string;
  rating: number;
  review: string;
}) => {
  const response = await axios.post(`/api/review/${user_id}`, {
    review_id,
    goods_id,
    order_id,
    rating,
    review,
  });
  return response.data;
};

export const modifyGoodsReview = async ({
  review_id,
  user_id,
  goods_id,
  rating,
  review,
}: {
  review_id: string;
  user_id: string;
  goods_id: string;
  rating: number;
  review: string;
}) => {
  const response = await axios.patch(`/api/review/${user_id}`, {
    review_id,
    goods_id,
    rating,
    review,
  });
  return response.data;
};
