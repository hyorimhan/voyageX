'use client';

// import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { customAlphabet } from 'nanoid';
import toast from 'react-hot-toast';

// interface PayButtonProps {
//   expressInfo: Address;
//   customerInfo: Customer;
//   itemList: ItemList;
//   totalPrice: number;
// }

function PayButton() {
  const router = useRouter();
  // const [isAgree, setIsAgree] = useState(false);

  // const handleClickPayButton = () => {
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

  //   const currentOrder = {
  //     orderId,
  //     orderName: `${customerInfo.customerName}님의 주문`,
  //     customerName: customerInfo.customerName,
  //     customerMobilePhone: customerInfo.customerPhone.split('-').join(''),
  //     itemInfo: `${itemList.map((item) => item.name)}`,
  //     totalPrice,
  //   };

  //   const orderInfo = JSON.stringify(currentOrder);
  //   const express = JSON.stringify(expressInfo);
  //   console.log(orderInfo);
  //   router.push(
  //     `/shop/payment/${orderId}?orderInfo=${orderInfo}&expressInfo=${express}`,
  //   );
  // };

  return (
    <>
      <div className='border-[1px] border-black-300 p-4 rounded-lg'>
        <div className='py-4'>
          <span className='text-xl'>주문요약</span>
        </div>
        <div className='flex flex-col items-start gap-4'>
          <div>
            <span>{`총 결제 금액 `}</span>
            <span className='text-primary-400'>
              {/* {totalPrice.toLocaleString()} */}
            </span>
          </div>
        </div>
      </div>
      <div className='border-[1px] border-black-300 p-4 rounded-lg mt-8 flex flex-col items-start gap-y-4'>
        <p className='text-xl'>주문동의</p>
        <div className='flex flex-row items-center justify-center gap-2'>
          {/* <button
            onClick={() => setIsAgree((prev) => !prev)}
            className={`p-2 border-2 border-white rounded ${
              isAgree ? 'bg-white' : 'bg-transparent'
            }`}
          ></button> */}
          <p className='text-xs self-center'>
            {'[필수] 주문 내역에 대한 필수 동의'}
          </p>
        </div>
      </div>
      {/* <button
        onClick={handleClickPayButton}
        className='bg-primary-400 rounded-md p-4 w-full mt-4 text-lg'
      >
        {`${totalPrice.toLocaleString()} 결제하기`}
      </button> */}
    </>
  );
}

export default PayButton;
