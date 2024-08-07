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
  id: string;
  goods_id: string;
  goods: GoodsType;
  order: OrderType;
  pay_at: string;
  quantity: number;
  state: string;
  address: Address;
};
