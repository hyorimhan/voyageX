import { ItemToBuyType } from '@/types/goods';
import { Customer } from '@/types/userAddressType';
import axios from 'axios';

type createReceiptParamsType = {
  user_id: string;
  order_id: string;
  goodsList: ItemToBuyType[];
  customer: Customer;
  address_id: string;
  pay_method: string;
  installment?: number;
};

export const createReceipt = async ({
  user_id,
  order_id,
  goodsList,
  customer,
  address_id,
  pay_method,
  installment,
}: createReceiptParamsType) => {
  for (const goods of goodsList) {
    const response = await axios.post(`/api/goods/pay/${user_id}`, {
      order_id,
      goods_id: goods.goods.id,
      quantity: goods.quantity,
      total_price: goods.goods.goods_price * goods.quantity,
      customer,
      address_id,
      pay_method,
      installment,
    });
    console.log(`response of ${goods} => `, response);
  }
};
