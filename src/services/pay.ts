import { ItemToBuyType } from '@/types/goods';
import { Customer } from '@/types/userAddressType';
import axios from 'axios';

type createOrderReceiptParamsType = {
  user_id: string;
  order_id: string;
  goodsList: ItemToBuyType[];
  customer: Customer;
  pay_method: string;
  installment?: number;
  address: string;
  old_address: string;
  detail_address: string;
  postcode: string;
};

export const createOrderReceipt = async ({
  user_id,
  order_id,
  goodsList,
  customer,
  pay_method,
  installment,
  address,
  old_address,
  detail_address,
  postcode,
}: createOrderReceiptParamsType) => {
  for (const goods of goodsList) {
    const response = await axios.post(`/api/goods/pay/${user_id}`, {
      order_id,
      goods_id: goods.goods.id,
      quantity: goods.quantity,
      total_price: goods.goods.goods_price * goods.quantity,
      customer,
      pay_method,
      installment,
      address,
      old_address,
      detail_address,
      postcode,
    });
  }
};

type createTourReceiptParamsType = {
  user_id: string;
  order_id: string;
  tour_id: string;
  customer: Customer;
  depart_date: string;
  arrive_date: string;
  gate: string;
  qr_code: string;
  pay_method: string;
  installment?: number;
};

export const createTourReceipt = async ({
  user_id,
  order_id,
  tour_id,
  customer,
  depart_date,
  arrive_date,
  gate,
  qr_code,
  pay_method,
  installment,
}: createTourReceiptParamsType) => {
  const response = await axios.post(`/api/tours/pay/${user_id}`, {
    order_id,
    tour_id,
    depart_date,
    customer,
    arrive_date,
    gate,
    qr_code,
    pay_method,
    installment,
  });
  return response;
};
