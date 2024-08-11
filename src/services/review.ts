import axios from 'axios';

export const getGoodsReview = async ({
  user_id,
  goods_id,
  review_id,
}: {
  user_id: string;
  goods_id: string;
  review_id: string;
}) => {
  const response = await axios.get(
    `/api/review/goods/${user_id}?goods_id=${goods_id}&review_id=${review_id}`,
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
    `/api/review/goods/order/${order_id}?goods_id=${goods_id}`,
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
  const response = await axios.post(`/api/review/goods/${user_id}`, {
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
  const response = await axios.patch(`/api/review/goods/${user_id}`, {
    review_id,
    goods_id,
    rating,
    review,
  });
  return response.data;
};

export const getTourReview = async ({
  user_id,
  tour_id,
  review_id,
}: {
  user_id: string;
  tour_id: string;
  review_id: string;
}) => {
  const response = await axios.get(
    `/api/review/tour/${user_id}?tour_id=${tour_id}&review_id=${review_id}`,
  );
  return response.data;
};

export const getOrderedTourReviewId = async ({
  order_id,
  tour_id,
}: {
  order_id: string;
  tour_id: string;
}) => {
  const response = await axios.get(
    `/api/review/tour/order/${order_id}?tour_id=${tour_id}`,
  );
  return response.data;
};

export const createTourReview = async ({
  review_id,
  user_id,
  tour_id,
  order_id,
  rating,
  review,
}: {
  review_id: string;
  user_id: string;
  tour_id: string;
  order_id: string;
  rating: number;
  review: string;
}) => {
  const response = await axios.post(`/api/review/tour/${user_id}`, {
    review_id,
    tour_id,
    order_id,
    rating,
    review,
  });
  return response.data;
};

export const modifyTourReview = async ({
  review_id,
  user_id,
  tour_id,
  rating,
  review,
}: {
  review_id: string;
  user_id: string;
  tour_id: string;
  rating: number;
  review: string;
}) => {
  const response = await axios.patch(`/api/review/tour/${user_id}`, {
    review_id,
    tour_id,
    rating,
    review,
  });
  return response.data;
};
