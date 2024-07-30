import { toggleLikeGoodsParamsType } from '@/types/goods';
import {
  adjustQuantityParamsType,
  DeleteCartItemParamsType,
} from '@/types/mypageType';
import axios from 'axios';

export const getGoods = async (order: string) => {
  const response = await axios.get(`/api/goods?order=${order}`);
  return response.data;
};

export const getLikedGoodsByUser = async (user_id: string, table: string) => {
  const response = await axios.get(
    `/api/goods/like?user_id=${user_id}&table=${table}`,
  );
  return response.data;
};

export const getIsLikedGoodsByUser = async (
  goods_id: string,
  user_id: string,
) => {
  const response = await axios.get(
    `/api/goods/${goods_id}/like?user_id=${user_id}`,
  );
  return response.data;
};

export const toggleLikeGoods = async (
  toggleLikeGoodsParams: toggleLikeGoodsParamsType,
) => {
  const { goods_id, user_id, isLiked } = toggleLikeGoodsParams;
  if (isLiked) {
    const response = await axios.delete(
      `/api/goods/${goods_id}/like?user_id=${user_id}`,
    );
    console.log(response);
    return response;
  } else {
    const response = await axios.post(
      `/api/goods/${goods_id}/like?user_id=${user_id}`,
    );
    console.log(response);
    return response;
  }
};

export const getCartList = async (user_id: string) => {
  const response = await axios.get(`/api/goods/cart/${user_id}`);
  return response.data;
};

export const deleteCartItem = async (
  deleteCartItemParams: DeleteCartItemParamsType,
) => {
  const { user_id, idList } = deleteCartItemParams;
  const response = await axios.delete(
    `/api/goods/cart/${user_id}?idList=${idList}`,
  );
  return response.data;
};

export const adjustQuantity = async (
  adjustQuantityParams: adjustQuantityParamsType,
) => {
  const { user_id, cart_id, prev, task } = adjustQuantityParams;
  const response = await axios.patch(
    `/api/goods/cart/${user_id}?cart_id=${cart_id}&prev=${prev}&task=${task}`,
  );
  return response.data;
};
