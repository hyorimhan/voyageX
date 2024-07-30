'use client';

import { tourDetail } from '@/services/tour';
import { Tour } from '@/types/tourPropsType';
import { Address } from '@/types/userAddressType';
import useShopStore from '@/zustand/store/useShop';
import { customAlphabet } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { customAlphabet } from 'nanoid';
import toast from 'react-hot-toast';
import { Order } from './TourPayWidget';

// interface PayButtonProps {
//   expressInfo: Address;
//   customerInfo: Customer;
//   itemList: ItemList;
//   totalPrice: number;
// }

function TourPayButton({
  id,
  defaultAddress,
}: {
  id: string;
  defaultAddress: Address;
}) {
  const router = useRouter();
  const setOrderType = useShopStore((state) => state.setOrderType);
  const saveOrder = useShopStore((state) => state.saveOrder);
  const userOrder = useShopStore((state) => state.userOrder);
  const [isAgree, setIsAgree] = useState(false);
  const [price, setPrice] = useState<number>();
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const tourPackage = async () => {
      const { tours, error } = await tourDetail(id);
      if (error) {
        toast(error.message);
      }
      setTours(tours as Tour[]);

      if (tours) {
        setPrice(tours[0].price);
      }
    };
    tourPackage();
  }, [id]);

  const handleClickPayButton = () => {
    //   if (!isAgree) {
    //     toast.error('약관에 동의하셔야합니다!');
    //     return;
    //   }
    //   const today = new Date();
    //   const year = today.getFullYear().toString().slice(-2);
    //   const month = (today.getMonth() + 1).toString().padStart(2, '0');
    //   const day = today.getDate().toString().padStart(2, '0');
    //   const yymmdd = year + month + day;

    //   const randomAlphabet = customAlphabet(
    //     '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    //     5,
    //   );
    //   const orderId = yymmdd + randomAlphabet();

    //   const currentOrder: Order = {
    //     orderId,
    //     orderName: `${defaultAddress.recipient}님의 주문`,
    //     customerName: defaultAddress.recipient!,
    //     customerMobilePhone: defaultAddress.phone?.split('-').join('')!,
    //     itemInfo: userOrder?.itemInfo!,
    //     totalPrice: price!,
    //   };

    //   saveOrder(currentOrder);
    //   setOrderType('tour');
    //   router.push('/tour/order');
    // };
    const handleClickPayButton = () => {
      if (!isAgree) {
        toast.error('약관에 동의하셔야합니다!');
        return;
      }
      const today = new Date();
      const year = today.getFullYear().toString().slice(-2);
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const yymmdd = year + month + day;

      const randomAlphabet = customAlphabet(
        '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        5,
      );

      const orderId = yymmdd + randomAlphabet();

      const currentOrder = {
        orderId,
        orderName: `${defaultAddress.recipient}님의 주문`,
        customerName: defaultAddress.recipient!,
        customerMobilePhone: defaultAddress.phone?.split('-').join('')!,
        itemInfo: userOrder?.itemInfo!,
        totalPrice: price!,
      };

      const orderInfo = JSON.stringify(currentOrder);
      const express = JSON.stringify(expressInfo);
      console.log(orderInfo);
      router.push(
        `/shop/payment/${orderId}?orderInfo=${orderInfo}&expressInfo=${express}`,
      );
    };

    return (
      <>
        <div className='border-[1px] h-[208px] w-[376px] border-black-300 p-5 rounded-lg'>
          <div className='border-b-black-700 border-b pb-3  '>
            <span className='text-xl'>주문요약</span>
          </div>
          <div className='flex flex-col items-start gap-4 w-[336px]'>
            <div className='flex pt-4'>
              <div className='w-[104px] text-sm '>총 주문 금액</div>
              <div className=' text-sm'>{price?.toLocaleString()}</div>
            </div>
            <div className='flex border-b w-[336px] pb-4'>
              <div className='w-[104px] text-sm'>배송비</div>
              <div className=' text-sm'>무료</div>
            </div>
            <div className='flex'>
              <div className='w-[104px] text-sm'>총 결제 금액</div>
              <div className='text-white '>{price?.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className='border-[1px] h-[195px] w-[376px] border-black-300 p-4 rounded-lg mt-8 flex flex-col items-start gap-y-4'>
          <p className='text-xl'>주문동의</p>
          <div className='flex flex-row items-center justify-center gap-2'>
            <button
              onClick={() => setIsAgree((prev) => !prev)}
              className={`p-2 border-2 border-white rounded ${
                isAgree ? 'bg-white' : 'bg-transparent'
              }`}
            ></button>
            <p className='text-xs self-center'>
              {'[필수] 주문 내역에 대한 필수 동의'}
            </p>
          </div>
          <button
            onClick={handleClickPayButton}
            className='bg-primary-400 rounded-md p-4 w-full mt-4 text-lg'
          >
            결제하기
          </button>
        </div>
      </>
    );
  };
}

export default TourPayButton;
