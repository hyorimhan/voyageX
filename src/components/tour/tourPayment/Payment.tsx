'use client';
import { userAddress } from '@/services/tour';
import { tourProps } from '@/types/tourPropsType';
import React, { useEffect, useState } from 'react';
import CustomerInfo from './CustomerInfo';
import PayButton from './PayButton';
import ItemsInfo from './ItemsInfo';
import { userLoginInfo } from '@/services/auth';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/zustand/store/useAuth';
import { Address } from '@/types/userAddressType';
import toast from 'react-hot-toast';

function Payment({ params }: tourProps) {
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const { id } = params;

  useEffect(() => {
    const userAndAddress = async () => {
      try {
        const res = await userLoginInfo();
        saveUser(res.user);

        if (!res.user) {
          router.replace('/login');
          toast('로그인이 필요합니다');
          return;
        }
        const { address, error } = await userAddress(res.user.id);

        const defaulAdr =
          address?.find((adr) => adr.is_default === true) || null;
        setDefaultAddress(defaulAdr);

        if (error) {
          toast.error(error.message);
        }
      } catch (error) {
        toast.error('유저를 가져올 수 없습니다');
      }
    };
    userAndAddress();
  }, []);

  return (
    <>
      <div className='border-b-[1px] mt-[132px] pb-[12px] text-[28px]'>
        여행상품 결제
      </div>
      <div className='flex items-center gap-8 mt-8'>
        <div className='w-[712px] '>
          <CustomerInfo defaultAddress={defaultAddress as Address} />
          <ItemsInfo id={id} />
        </div>
        <div className='w-[376px]'>
          <PayButton />
        </div>
      </div>
    </>
  );
}

export default Payment;
