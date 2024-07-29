import { Tables } from './supabase';

export type toggleLikeGoodsParamsType = {
  goods_id: string;
  user_id: string;
  isLiked: Tables<'liked_goods'>[] | undefined;
};

export type LikedGoodsType = {
  goods_id: string;
  user_id: string;
  goods: Tables<'goods'>;
};
