import { Tables } from './supabase';

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

export type GoodsOrdersType = {
  id: string;
  goods_id: string;
  quantity: number;
  goods: GoodsType;
  pay_at: string;
  state: string;
};

export type GoodsType = {
  goods_name: string;
  goods_price: number;
  description: string;
  goods_img: string;
};
