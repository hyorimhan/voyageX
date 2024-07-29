import { Tables } from './supabase';

export interface WishListPropsType {
  user_id: string;
}

export type CartListType = {
  id: string;
  goods_id: string;
  user_id: string;
  quantity: number;
  goods: Tables<'goods'>;
};

export type DeleteCartItemParamsType = {
  user_id: string;
  idList: string;
};

export type adjustQuantityParamsType = {
  user_id: string;
  cart_id: string;
  task: string;
  prev: number;
};
