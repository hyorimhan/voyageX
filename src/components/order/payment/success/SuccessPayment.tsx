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
import Link from 'next/link';
import useUpdateInfoStore from '@/zustand/store/useUpdateInfo';
import useQuantityStore from '@/zustand/store/useQuantity';
import Image from 'next/image';
import useItemListStore from '@/zustand/store/itemListStore';
import useExpressInfoStore from '@/zustand/store/expressInfoStore';
import useCustomerInfoStore from '@/zustand/store/customrInfoStore';
import { createClient } from '@/supabase/client';

function SuccessPayment() {
  const updateInfo = useUpdateInfoStore((state) => state.updateInfo);
  const totalPrice = useQuantityStore((state) => state.totalPrice);
  const quantity = useQuantityStore((state) => state.quantity);
  const saveUser = useAuthStore((state) => state.saveUser);
  const { tourUrl, setTourId } = useTourIdStore((state) => state);
  const { itemList, setItemList } = useItemListStore((state) => state);
  const { expressAddress, setExpressAddress } = useExpressInfoStore(
    (state) => state,
  );
  const { setCustomerInfo } = useCustomerInfoStore((state) => state);
  const { setUpdateInfo } = useUpdateInfoStore((state) => state);
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
    console.log('tourUrl => ', tourUrl);
    if (tourUrl) {
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
      console.log('tours => ', tours);
    } else if (itemList) {
      console.log('itemList => ', itemList);
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
          console.log('result =. ', result);
          const supabase = createClient();
          // 유저 정보
          const res = await userLoginInfo();
          saveUser(res.user);
          const user_id = res.user?.id;
          const { data, error } = await supabase.from('goods_orders').insert({
            id: orderId,
            user_id: user_id!,
            goods_id: itemList[0].goods.id,
          });
          if (error) console.error('error => ', error);
          console.log('data => ', data);
        } catch (error) {
          console.error(error);
        }
      };
      getOrderConfirmData();
    }
  }, [orderId, paymentKey, amount, authKey]);

  if (!result)
    return (
      <div className='w-full'>
        <div className='w-1/2 h-[700px] my-auto mx-auto flex flex-col items-center justify-center'>
          <p>화면이 지속된다면</p>
          <p>홈 화면으로 돌아가주세요.</p>
          <button
            className='border-2 rounded-lg p-2 hover:brightness-150 cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black-1000 hover:font-extrabold'
            onClick={() => router.replace('/')}
          >
            돌아가기
          </button>
        </div>
      </div>
    );

  return (
    <>
      <div className='flex mt-[137px] mb-11 items-center justify-between'>
        <div className=' border-white text-4xl font-bold text-white w-[330px]'>
          주문이 완료되었습니다
        </div>
        <div className='flex gap-4 w-[571px] '>
          <div>
            <Link
              href={
                tourUrl.length
                  ? `/mypage/tour_orders/detail/${orderId}`
                  : `/mypage/goods_orders`
              }
            >
              <button className='border-[1.5px] border-primary-400 h-[53px] w-[277.5px] rounded-lg bg-transparent transition-colors duration-200 hover:bg-primary-200 hover:text-black-1000 active:bg-primary-300'>
                주문상세 보기
              </button>
            </Link>
          </div>
          <div>
            <Link href={tourUrl.length ? '/tour' : '/shop'}>
              <button className=' bg-primary-600 h-[53px] w-[277.5px] rounded-lg duration-200 hover:bg-primary-400 active:bg-primary-500'>
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
              src={
                tourUrl.length
                  ? tours[0].planets.planet_img
                  : itemList[0].goods.goods_img
              }
              alt={
                tourUrl.length
                  ? tours[0].planets.name!
                  : itemList[0].goods.goods_name
              }
              width={104}
              height={104}
            />
          </div>
          <div className='w-[818px] mr-[18px]'>
            <div>
              {tourUrl.length
                ? `${tours[0].planets.name} ${tours[0].planets.english_name}`
                : `${itemList[0].goods.goods_name}`}
            </div>
            {tourUrl.length ? <div>6박 7일 패키지</div> : null}
          </div>
          <div className='flex flex-col border-l border-black-300 h-[104px] px-4 py-[30px] w-[122px]'>
            <p className='text-white text-base'>
              {tourUrl.length
                ? tours[0].price.toLocaleString()
                : itemList[0].goods.goods_price.toLocaleString()}
              원
            </p>
            <span className='text-white text-sm'>
              {itemList.length !== 0 && `수량 ${itemList[0].quantity}개`}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-8 mx-auto max-w-[1120px] flex flex-wrap gap-8'>
        {/* 배송 정보 */}
        {itemList.length !== 0 && (
          <div className='border-black-300 border-[1px] rounded-lg p-5 text-sm flex-1 min-w-[300px]'>
            <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
              배송 정보
            </div>
            <div className='pt-4 flex'>
              <div className='w-[104px] text-black-200'>받는 분 </div>
              {expressAddress?.recipient}
            </div>
            <div className='flex py-5'>
              <div className='w-[104px] text-black-200'>휴대전화 번호</div>
              {expressAddress?.phone}
            </div>
            <div className='flex gap-10'>
              <div className='w-[104px] text-black-200'>배송지 정보</div>
              <div>
                <div>
                  도로명: {expressAddress?.address}{' '}
                  {expressAddress?.detailAddress}
                </div>
                <div>
                  지번: {expressAddress?.oldAddress}{' '}
                  {expressAddress?.detailAddress}
                </div>
                <div>{`(${expressAddress?.postcode})`}</div>
              </div>
            </div>
          </div>
        )}

        {/* 결제 정보 */}
        <div className='border-black-300 border-[1px] rounded-lg p-5 text-sm flex-1 min-w-[300px]'>
          <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
            결제 정보
          </div>
          <div className='pt-4 flex'>
            <div className='w-[104px]'>총 주문 금액 </div>
            {(+amount).toLocaleString()}원
          </div>
          <div className='flex py-5 w-full border-b-black-700 border-b-[1px]'>
            <div className='w-[104px]'>총 배송비</div>
            무료
          </div>
          <div className='flex pt-5'>
            <div className='w-[104px]'>총 결제 금액 </div>
            {(+amount).toLocaleString()}원
          </div>
        </div>

        {/* 결제 수단 */}
        <div className='border-black-300 border-[1px] rounded-lg p-5 flex-1 min-w-[300px]'>
          <div className='text-xl border-b-black-700 border-b-[1px] pb-3'>
            결제 수단
          </div>
          <div className='text-sm'>
            <div className='pt-4 flex'>
              <div className='w-[104px]'>결제 방법</div>
              {result.easyPay
                ? `${result.easyPay.provider} ${result.method}`
                : result.method}
            </div>
            <div className='py-5 flex'>
              <div className='w-[104px]'>분할 납부</div>
              {result.card &&
                `${
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
