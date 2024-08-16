import { GoodsOrdersType, toggleLikeGoodsParamsType } from '@/types/goods';
import {
  addCartItemParamsType,
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
    return response;
  } else {
    const response = await axios.post(
      `/api/goods/${goods_id}/like?user_id=${user_id}`,
    );
    return response;
  }
};

export const getCartList = async (user_id: string) => {
  const response = await axios.get(`/api/goods/cart/${user_id}`);
  return response.data;
};

export const addCartItem = async ({
  user_id,
  goods_id,
  quantity,
}: addCartItemParamsType) => {
  const response = await axios.post(`/api/goods/cart/${user_id}`, {
    goods_id,
    quantity,
  });
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

export const adjustQuantity = async ({
  user_id,
  cart_id,
  quantity,
}: {
  user_id: string;
  cart_id: string;
  quantity: number;
}) => {
  const response = await axios.patch(
    `/api/goods/cart/${user_id}?cart_id=${cart_id}&quantity=${quantity}`,
  );
  return response.data;
};

// 굿즈 아이템 하나만 가져오기
export const getGoodsItem = async (id: string) => {
  const response = await axios.get(`/api/goods/${id}`);
  return response.data[0];
};

export const getGoodsOrderList = async (
  user_id: string | undefined,
): Promise<GoodsOrdersType[]> => {
  const response = await axios.get(
    `/api/mypage/my_goods_order/user/${user_id}`,
  );
  return response.data;
};

export const getGoodsOrderDetail = async (
  order_id: string,
): Promise<GoodsOrdersType[]> => {
  const response = await axios.get(
    `/api/mypage/my_goods_order/goods/${order_id}`,
  );
  return response.data;
};

export const deleteCartItemByGoodsId = async ({
  user_id,
  ids,
}: {
  user_id: string;
  ids: string[];
}) => {
  const idList = JSON.stringify(ids);
  const response = await axios.delete(
    `/api/goods/cart?user_id=${user_id}&idList=${idList}`,
  );
  return response.data;
};

// 마이페이지 주문목록 삭제
export const deleteGoodsOrderDetail = async (order_id: string) => {
  const response = await axios.delete(
    `/api/mypage/my_goods_order/goods/${order_id}`,
  );
  return response;
};
