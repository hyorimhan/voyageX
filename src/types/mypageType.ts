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

export type addCartItemParamsType = {
  user_id: string;
  goods_id: string;
  quantity: number;
};

export type DeleteCartItemParamsType = {
  user_id: string;
  idList: string;
};

export type adjustQuantityParamsType = {
  user_id: string;
  cart_id: string;
  quantity: number;
};

export type LikedPlanetType = {
  id: string;
  planet_id: string;
  price: number;
  tag: string;
  planets: Tables<'planets'>;
};
