// 'use client';

// import { tourDetail } from '@/services/tour';
// import { Tour } from '@/types/tourPropsType';
// import { Address } from '@/types/userAddressType';
// import useShopStore from '@/zustand/store/useShop';
// import { customAlphabet } from 'nanoid';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// // import { customAlphabet } from 'nanoid';
// import toast from 'react-hot-toast';
// import { Order } from './TourPayWidget';

// // interface PayButtonProps {
// //   expressInfo: Address;
// //   customerInfo: Customer;
// //   itemList: ItemList;
// //   totalPrice: number;
// // }

// function TourPayButton({
//   id,
//   defaultAddress,
// }: {
//   id: string;
//   defaultAddress: Address;
// }) {
//   const router = useRouter();
//   const setOrderType = useShopStore((state) => state.setOrderType);
//   const saveOrder = useShopStore((state) => state.saveOrder);
//   const userOrder = useShopStore((state) => state.userOrder);
//   const [isAgree, setIsAgree] = useState(false);
//   const [price, setPrice] = useState<number>();
//   const [tours, setTours] = useState<Tour[]>([]);

//   useEffect(() => {
//     const tourPackage = async () => {
//       const { tours, error } = await tourDetail(id);
//       if (error) {
//         toast(error.message);
//       }
//       setTours(tours as Tour[]);

//       if (tours) {
//         setPrice(tours[0].price);
//       }
//     };
//     tourPackage();
//   }, [id]);

//   const handleClickPayButton = () => {
//     //   if (!isAgree) {
//     //     toast.error('약관에 동의하셔야합니다!');
//     //     return;
//     //   }
//     //   const today = new Date();
//     //   const year = today.getFullYear().toString().slice(-2);
//     //   const month = (today.getMonth() + 1).toString().padStart(2, '0');
//     //   const day = today.getDate().toString().padStart(2, '0');
//     //   const yymmdd = year + month + day;

//     //   const randomAlphabet = customAlphabet(
//     //     '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//     //     5,
//     //   );
//     //   const orderId = yymmdd + randomAlphabet();

//     //   const currentOrder: Order = {
//     //     orderId,
//     //     orderName: `${defaultAddress.recipient}님의 주문`,
//     //     customerName: defaultAddress.recipient!,
//     //     customerMobilePhone: defaultAddress.phone?.split('-').join('')!,
//     //     itemInfo: userOrder?.itemInfo!,
//     //     totalPrice: price!,
//     //   };

//     //   saveOrder(currentOrder);
//     //   setOrderType('tour');
//     //   router.push('/tour/order');
//     // };
//     const handleClickPayButton = () => {
//       if (!isAgree) {
//         toast.error('약관에 동의하셔야합니다!');
//         return;
//       }
//       const today = new Date();
//       const year = today.getFullYear().toString().slice(-2);
//       const month = (today.getMonth() + 1).toString().padStart(2, '0');
//       const day = today.getDate().toString().padStart(2, '0');
//       const yymmdd = year + month + day;

//       const randomAlphabet = customAlphabet(
//         '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//         5,
//       );

//       const orderId = yymmdd + randomAlphabet();

//       const currentOrder = {
//         orderId,
//         orderName: `${defaultAddress.recipient}님의 주문`,
//         customerName: defaultAddress.recipient!,
//         customerMobilePhone: defaultAddress.phone?.split('-').join('')!,
//         itemInfo: userOrder?.itemInfo!,
//         totalPrice: price!,
//       };

//       const orderInfo = JSON.stringify(currentOrder);
//       const express = JSON.stringify(expressInfo);
//       console.log(orderInfo);
//       router.push(
//         `/shop/payment/${orderId}?orderInfo=${orderInfo}&expressInfo=${express}`,
//       );
//     };

//
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { customAlphabet } from 'nanoid';
import toast from 'react-hot-toast';
import { Tour } from '@/types/tourPropsType';
import { Address } from '@/types/userAddressType';
import { tourDetail } from '@/services/tour';

function TourPayButton({
  id,
  defaultAddress,
}: {
  id: string;
  defaultAddress: Address;
}) {
  const router = useRouter();
  const [isAgree, setIsAgree] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);

  const handleClickPayButton = async () => {
    const { tours, error } = await tourDetail(id);
    if (error) {
      toast(error.message);
    }
    setTours(tours as Tour[]);
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
      orderName: defaultAddress.recipient,
      customerName: defaultAddress.recipient,
      customerMobilePhone: defaultAddress.phone?.split('-').join('')!,
      itemInfo: id,
      totalPrice: tours![0].price,
    };

    const orderInfo = JSON.stringify(currentOrder);
    const express = JSON.stringify('배송지정보');
    console.log(orderInfo);
    router.push(
      `/shop/payment/${orderId}?orderInfo=${orderInfo}&expressInfo=${express}`,
    );
  };
  console.log(tours);

  return (
    <>
      <div className='border-2 border-black-300 p-4 rounded-lg mt-4'>
        <div className='py-2 mb-4 border-b-2 border-black-700'>
          <span className='text-xl'>주문요약</span>
        </div>
        <div className='flex flex-col items-start gap-4'>
          <div className='w-full flex justify-between'>
            <span className='text-black-200'>총 주문 금액</span>
            <span className='text-black-50'>{'50,000'}원</span>
          </div>
          <div className='w-full flex justify-between'>
            <span className='text-black-200'>총 배송비</span>
            <span className='text-black-50'>0원</span>
          </div>
          <div className='border-t-2 border-black-200 w-full pt-4 flex justify-between'>
            <span className='text-black-200'>{`총 결제 금액 `}</span>
            <span className='text-primary-400'>{'50,000'}원</span>
          </div>
        </div>
      </div>
      <div className='border-2 border-black-300 px-4 py-2 rounded-lg mt-4 flex flex-col items-start gap-y-5'>
        <div className='border-b-2 border-black-700 w-full py-2'>
          <p className='text-xl'>주문동의</p>
        </div>
        <div className='flex flex-row items-center justify-center gap-2'>
          <button
            onClick={() => setIsAgree((prev) => !prev)}
            className={`p-2 border-2 border-black-50 rounded ${
              isAgree ? 'bg-black-50' : 'bg-transparent'
            }`}
          ></button>
          <p className='text-xs self-center text-black-50'>
            {'[필수] 주문 내역에 대한 필수 동의'}
          </p>
        </div>
        <button
          onClick={handleClickPayButton}
          className='bg-primary-600 rounded-md p-4 w-full h-14 mb-5 text-lg'
        >
          <span className='text-lg'>{'50,000'}원</span>
          <span className='text-base'> 결제하기</span>
        </button>
      </div>
    </>
  );
}

export default TourPayButton;
