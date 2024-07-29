import { Tables } from './supabase';

export interface WishListPropsType {
  user_id: string;
}

export type CartListType = {
  goods_id: string;
  user_id: string;
  quantity: number;
  goods: Tables<'goods'>;
};
