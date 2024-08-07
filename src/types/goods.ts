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
