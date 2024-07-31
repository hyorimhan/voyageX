'use client';

import ExpressInfo from './ExpressInfo';
import PayButton from './PayButton';
import ItemsInfo from './ItemsInfo';
import CustomerInfo from './CustomerInfo';
import { useQuery } from '@tanstack/react-query';
import { getAddressList } from '@/services/address';
import { Tables } from '@/types/supabase';
import useAuthStore from '@/zustand/store/useAuth';
import { useEffect, useState } from 'react';
import useExpressInfoStore from '@/zustand/store/expressInfoStore';
import useCustomerInfoStore from '@/zustand/store/customrInfoStore';
import { Customer } from '@/types/userAddressType';

interface OrderFormPropsType {
  isTour: boolean;
}

function OrderForm({ isTour }: OrderFormPropsType) {
  const { setExpressAddress } = useExpressInfoStore((state) => state);
  const { customerInfo, setCustomerInfo } = useCustomerInfoStore(
    (state) => state,
  );
  const [currentAddress, setCurrentAddress] =
    useState<Tables<'addresses'> | null>(null);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useAuthStore((state) => state.user);
  const user_id = user?.id;
  const user_email = user?.email;
  console.log(user_id);

  const {
    data: addressList,
    isError,
    isPending,
  } = useQuery<Tables<'addresses'>[]>({
    queryKey: ['address', user_id],
    queryFn: () => getAddressList(user_id),
  });

  useEffect(() => {
    if (!addressList) return;
    const defaultAddress =
      addressList?.find((address) => address.is_default) ?? addressList[0];
    setCurrentAddress(defaultAddress);
    setExpressAddress(currentAddress);
    if (defaultAddress.recipient && defaultAddress.phone && user_email) {
      console.log('defaultAddress => ', defaultAddress);
      const defaultCustomer = {
        customerName: defaultAddress.recipient,
        customerPhone: defaultAddress.phone,
        customerEmail: user_email,
      };
      setCurrentCustomer(defaultCustomer);
      setCustomerInfo(defaultCustomer);
      console.log('customerInfo => ', customerInfo);
    }
  }, [addressList]);

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중..</div>;
  return (
    <>
      <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)] gap-x-10'>
        <div className='flex flex-col items-start'>
          {!isTour && (
            <div className='mt-4 w-full'>
              <ExpressInfo
                currentAddress={currentAddress}
                setCurrentAddress={setCurrentAddress}
              />
            </div>
          )}
          <div className='mt-4 w-full'>
            <CustomerInfo />
          </div>
          <div className='mt-4 w-full'>
            <ItemsInfo label='상품정보' />
          </div>
        </div>
        <div>
          <PayButton />
        </div>
      </div>
    </>
  );
}

export default OrderForm;
