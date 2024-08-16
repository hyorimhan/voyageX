'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { customAlphabet } from 'nanoid';
import toast from 'react-hot-toast';
import useTourOrderInfoStore from '@/zustand/store/useTourOrderInfoStore';
import useCustomerInfoStore from '@/zustand/store/useCustomrInfoStore';
import useExpressInfoStore from '@/zustand/store/useExpressInfoStore';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import TermsAndConditions from './TermsAndConditions';
import { termsAndConditionsList } from '@/constants/shop';
interface PayButtonPropsType {
  totalPrice: number;
  isTour: boolean;
}

function PayButton({ totalPrice, isTour }: PayButtonPropsType) {
  const router = useRouter();
  const [isAllAgree, setIsAllAgree] = useState<string[]>([]);
  const { expressAddress } = useExpressInfoStore((state) => state);
  const { goodsOrderInfo } = useGoodsOrderStore((state) => state);
  const { tourOrder } = useTourOrderInfoStore((state) => state);
  const { customerInfo } = useCustomerInfoStore((state) => state);

  const handleClickPayButton = () => {
    if (!customerInfo?.customerName.trim()) {
      toast.error('이름을 입력해주세요!');
      return;
    }
    if (!customerInfo.customerPhone.trim()) {
      toast.error('휴대전화 번호를 입력해주세요!');
      return;
    }
    if (!customerInfo.customerEmail.trim()) {
      toast.error('이메일 주소를 입력해주세요!');
      return;
    }
    if (isAllAgree.length < termsAndConditionsList.length) {
      toast.error('모든 약관에 동의하셔야합니다!');
      return;
    }
    let orderName: string = '';
    if (isTour) {
      if (!totalPrice || !tourOrder) {
        toast.error('상품을 다시 선택해주세요!');
        return;
      } else {
        orderName = `${tourOrder?.planet_name!} 티켓`;
      }
    } else {
      if (!expressAddress) {
        toast.error('배송지를 설정해주세요!');
        return;
      }
      if (!totalPrice || !goodsOrderInfo) {
        toast.error('상품을 다시 선택해주세요!');
        return;
      } else {
        orderName = `${goodsOrderInfo[0].goods.goods_name} ${goodsOrderInfo[0].quantity}개 등 총 ${goodsOrderInfo.length}건`;
      }
    }

    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const yymmdd = year + month + day;

    const randomAlphabet = customAlphabet(
      '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      9,
    );

    const orderId = yymmdd + randomAlphabet();

    const currentOrder = {
      orderId,
      orderName,
    };

    const orderInfo = JSON.stringify(currentOrder);
    router.push(
      `/shop/payment/${orderId}?orderInfo=${orderInfo}&isTour=${isTour}`,
    );
  };

  return (
    <>
      <div className='border-[1px] border-black-300 rounded-lg sm:p-4 md:pt-4 md:px-5 md:pb-5 lg:pt-4 lg:px-5 lg:pb-5 flex flex-col items-center gap-y-4'>
        <div className='pt-1 pb-3 h-[50px] border-b-[1px] border-black-700 w-full flex items-center'>
          <div className='h-[40px]'>
            <span className='text-xl font-medium'>주문 동의</span>
          </div>
        </div>
        <TermsAndConditions
          isAllAgree={isAllAgree}
          setIsAllAgree={setIsAllAgree}
        />
        <span className='text-black-200 text-sm font-normal'>
          본인은 만 14세 이상이며 주문내용을 확인하였습니다.
        </span>
        <button
          onClick={handleClickPayButton}
          className='bg-primary-600 rounded-md mb-1 flex flex-row gap-2 items-center justify-center p-4 w-[303px] h-[51px] text-lg transition-colors duration-200 hover:bg-primary-400 active:bg-primary-500'
        >
          <span className='text-lg font-semibold'>
            {totalPrice.toLocaleString()}원
          </span>
          <span className='text-base font-semibold'>결제하기</span>
        </button>
      </div>
    </>
  );
}

export default PayButton;
