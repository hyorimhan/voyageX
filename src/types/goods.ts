import { Tables } from './supabase';

export type ItemToBuyType = {
  quantity: number;
  goods: Tables<'goods'>;
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
