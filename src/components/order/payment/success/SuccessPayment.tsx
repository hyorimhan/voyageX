'use client';

import { userLoginInfo } from '@/services/auth';
import { tourDetail, tourPayment } from '@/services/tour';
import { Tour } from '@/types/tourPropsType';
import useAuthStore from '@/zustand/store/useAuth';
import useTourIdStore from '@/zustand/store/useTourId';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import useUpdateInfoStore from '@/zustand/store/useUpdateInfo';
import useQuantityStore from '@/zustand/store/useQuantity';

function SuccessPayment({ tourUrl }: { tourUrl: string }) {
  const updateInfo = useUpdateInfoStore((state) => state.updateInfo);
  const totalPrice = useQuantityStore((state) => state.totalPrice);
  const quantity = useQuantityStore((state) => state.quantity);
  const saveUser = useAuthStore((state) => state.saveUser);
  const setTourId = useTourIdStore((state) => state.setTourId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>();
  const [tours, setTours] = useState<Tour[]>([]);

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY!;
  const orderId = searchParams.get('orderId')!;
  const paymentKey = searchParams.get('paymentKey')!;
  const amount = searchParams.get('amount')!;
  const authKey = btoa(secretKey + ':')!;

  useEffect(() => {
    // 투어 아이디
    setTourId(tourUrl);

    const tourId = tourUrl;

    const tourPackage = async () => {
      const { tours, error } = await tourDetail(tourId);
      setTours(tours as Tour[]);
      if (error) {
        toast(error.message);
      }
    };

    const getOrderConfirmData = async () => {
      try {
        const confirm = await axios.post(
          'https://api.tosspayments.com/v1/payments/confirm',
          {
            paymentKey,
            amount,
            orderId,
          },
          {
            headers: {
              'Authorization': `Basic ${authKey}`,
              'Content-Type': 'application/json',
            },
          },
        );

        setResult(confirm.data);

        // 유저 정보
        const res = await userLoginInfo();
        saveUser(res.user);
        const userId = res.user?.id;

        if (!userId) {
          toast.error('사용자 정보가 없습니다.');
        }
        if (!tourId) {
          toast.error('투어 정보가 없습니다.');
        }

        const { error } = await tourPayment({
          userId: userId!,
          tourId,
          customerName: updateInfo?.name as string,
          customerMobilePhone: updateInfo?.phone as string,
          customerEmail: updateInfo?.email as string,
          totalPrice: totalPrice as number,
          amount: quantity as number,
        });
        if (error) {
          toast.error(error.message);
          router.replace('/tour');
        } else {
          toast.success('결제 되었습니다');
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (!orderId || !paymentKey || !amount || !authKey) {
      toast('오류가 발생했습니다');
      router.replace('/tour');
      return;
    }

    tourPackage();
    getOrderConfirmData();
  }, [tourUrl, orderId, paymentKey, amount, authKey]);

  if (!result) return <div>승인 중</div>;

  return (
    <>
      <div className='flex mt-[137px] mb-11 items-center justify-between'>
        <div className=' border-white text-4xl font-bold text-white w-[330px]'>
          주문이 완료되었습니다
        </div>
        <div className='flex gap-4 w-[571px] '>
          <div>
            <Link href={`/mypage/tour_orders/detail/${orderId}`}>
              <button className='border-[1.5px] border-primary-400 h-[53px] w-[277.5px] rounded-lg'>
                주문상세 보기
              </button>
            </Link>
          </div>
          <div>
            <Link href={'/tour'}>
              <button className=' bg-primary-600 h-[53px] w-[277.5px] rounded-lg'>
                쇼핑 계속하기
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className='mb-8'>주문상품 번호 {result.orderId}</div>

      <div className='border-[1px] border-black-300 rounded-lg p-5'>
        <div className='text-xl border-b pb-3 border-black-700 mb-4'>
          주문상품 정보
        </div>
        <div className='flex items-center'>
          <div className='mr-[18px]'>
            <Image
              src={tours[0].planets.planet_img}
              alt={tours[0].planets.name!}
              width={104}
              height={104}
            />
          </div>
          <div className='w-[818px] mr-[18px]'>
            <div>
              {tours[0].planets.name} {tours[0].planets.english_name}
            </div>
            <div>6박 7일 패키지</div>
          </div>
          <div className='border-l border-black-300 h-[104px] px-4 py-[30px] w-[122px]'>
            {totalPrice?.toLocaleString()}원 수량 {quantity}개
          </div>
        </div>
      </div>

      <div className='flex mt-8 gap-8'>
        <div className='border-black-300 w-1/2 border-[1px] rounded-lg p-5 text-sm'>
          <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
            결제 정보
          </div>
          <div className='pt-4 flex'>
            <div className='w-[104px]'>총 주문 금액 </div>
            {/* {result.totalAmount}원 */}
            {totalPrice?.toLocaleString()}원
          </div>
          <div className=' flex py-5 w-[504px]  border-b-black-700 border-b-[1px]'>
            <div className='w-[104px]'>총 배송비</div>
            무료
          </div>
          <div className=' flex pt-5'>
            <div className='w-[104px]'>총 결제 금액 </div>
            {/* {result.totalAmount}원 */}
            {totalPrice?.toLocaleString()}원
          </div>
        </div>

        <div className='border-black-300 w-1/2  border-[1px] rounded-lg p-5'>
          <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
            결제 수단
          </div>
          <div className='text-sm'>
            <div className='pt-4 flex'>
              <div className='w-[104px]'>결제 방법</div>
              {result.easyPay && `${result.easyPay.provider} ${result.method}`}
            </div>
            <div className='py-5 flex'>
              <div className='w-[104px]'>결제 수단</div>
              {result.card &&
                ` ${result.method} ${
                  result.card.installmentPlanMonths
                    ? `${result.card.installmentPlanMonths}개월 할부`
                    : '일시불'
                }`}
            </div>
            <div className='flex'>
              <div className='w-[104px]'> 결제 일시 </div>
              {result.approvedAt.slice(0, 10)}
            </div>
            <div className='pt-5 flex'>
              <div className='w-[104px]'>주문 상태</div> 결제완료
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessPayment;
