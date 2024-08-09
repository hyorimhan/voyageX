import { Tables } from './supabase';
import { Address } from './userAddressType';

export type ItemToBuyType = {
  goods: Tables<'goods'>;
  quantity: number;
};

export type toggleLikeGoodsParamsType = {
  goods_id: string;
  user_id: string;
  isLiked: boolean;
};

export type LikedGoodsType = {
  goods_id: string;
  user_id: string;
  goods: Tables<'goods'>;
};

export type GoodsType = {
  goods_name: string;
  goods_price: number;
  description: string;
  goods_img: string;
};

export type OrderType = {
  pay_at: string;
  state: string;
  total_price: number;
  express_cost: number;
  pay_method: string;
  installment: number;
  recipient: string;
  phone: string;
  address_id: string;
  quantity: number;
};

export type GoodsOrdersType = {
  user_id: string;
  pay_at: string;
  goods_id: string;
  id: string;
  quantity: number;
  state: string;
  total_price: number;
  express_cost: number;
  recipient: string;
  phone: string;
  pay_method: string;
  installment: number;
  address: string;
  old_address: string;
  detail_address: string;
  postcode: string;
  order_id: string;
  review_id: null;
  goods: {
    id: string;
    goods_img: string;
    created_at: string;
    goods_name: string;
    like_count: number;
    rating_avg: number;
    description: string;
    goods_price: number;
  };
};
