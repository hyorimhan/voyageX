import axios from 'axios';

export const getOrdersByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`/api/mypage/tour_order`, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    throw new Error('주문한 여행상품 리스트를 불러올수 없습니다');
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`/api/mypage/tour_order`, orderData);
    return response.data;
  } catch (error) {
    throw new Error('주문 목록 생성 불가능');
  }
};
