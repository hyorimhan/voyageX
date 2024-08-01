'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { customAlphabet } from 'nanoid';
import toast from 'react-hot-toast';
import { Address } from '@/types/userAddressType';
import { tourDetail } from '@/services/tour';
import useItemListStore from '@/zustand/store/itemListStore';

function TourPayButton({
  id,
  defaultAddress,
}: {
  id: string;
  defaultAddress: Address;
}) {
  const router = useRouter();
  const { setItemList } = useItemListStore((state) => state);
  const [isAgree, setIsAgree] = useState(false);
  const [price, setPrice] = useState<number>();

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const { tours, error } = await tourDetail(id);
        if (error) {
          toast.error(error.message);
          return;
        }

        if (tours) {
          const tour = tours[0];
          setPrice(tour.price);
        } else {
          toast.error('투어 정보를 찾을 수 없습니다.');
          return;
        }
      } catch (error) {
        console.error('Error in fetchTourDetail:', error);
        toast.error('처리 중 오류가 발생했습니다.');
      }
    };

    fetchTourDetail();
  }, [id]);

  const handleClickPayButton = async () => {
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

    setItemList([]);

    const currentOrder = {
      orderId,
      orderName: defaultAddress.recipient,
      customerName: defaultAddress.recipient,
      customerMobilePhone: defaultAddress.phone?.split('-').join('')!,
      itemInfo: id,
      totalPrice: price,
    };
    const orderInfo = JSON.stringify(currentOrder);

    router.push(`/shop/payment/${orderId}?orderInfo=${orderInfo}`);
  };

  const formatPrice = (price: number | undefined) => {
    return price !== undefined ? price.toLocaleString() : '가격 정보 없음';
  };
  return (
    <>
      <div className='border-[1px] border-black-300 p-4 rounded-lg mb-4 h-[208px]'>
        <div className='py-2 mb-4 border-b-[1px] border-black-700'>
          <span className='text-xl'>주문요약</span>
        </div>
        <div className='flex flex-col items-start gap-4'>
          <div className='w-full flex justify-between'>
            <span className='text-black-200'>총 주문 금액</span>
            <span className='text-black-50'>{formatPrice(price)}원</span>
          </div>
          <div className='w-full flex justify-between'>
            <span className='text-black-200'>총 배송비</span>
            <span className='text-black-50'>0원</span>
          </div>
          <div className='border-t-[1px] border-black-200 w-full pt-4 flex justify-between'>
            <span className='text-black-200'>{`총 결제 금액 `}</span>
            <span className='text-primary-400'>{formatPrice(price)}원</span>
          </div>
        </div>
      </div>
      <div className='border-[1px] border-black-300 px-4 py-2 rounded-lg mt-8 flex flex-col items-start gap-y-5 '>
        <div className='border-b-[1px] border-black-700 w-full py-2'>
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
          <span className='text-lg'>{formatPrice(price)}원</span>
          <span className='text-base'> 결제하기</span>
        </button>
      </div>
    </>
  );
}

export default TourPayButton;
