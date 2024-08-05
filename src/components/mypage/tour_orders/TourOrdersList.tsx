'use client';

import { getOrdersByUserId } from '@/services/tour_orders';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type TourOrderList = {
  id: number;
  order_date: string;
  customer_name: string;
  tour: {
    name: string;
    planet_id: number;
  };
  planet: {
    english_name: string;
  };
};

const TourOrdersList = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams.get('user_id');
  const [orders, setOrders] = useState<TourOrderList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user_id) {
        try {
          const data = await getOrdersByUserId(user_id);
          console.log('Fetched Orders:', data); // API 응답 확인
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user_id]);

  if (loading) return <div>Loading...</div>;

  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <>
      {orders.map((order) => (
        <div key={order.id} className='gap-2 flex flex-col'>
          <p className='p-4 h-[53px] border-b-[1px] border-black-700'>
            주문일자 {order.order_date}
          </p>
          <div className='flex h-56 w-full text-slate-950 font-bold '>
            <div className='bg-primary-200 rounded-2xl flex py-6 px-12 w-full '>
              <div className='flex-grow'>
                <p className='text-xl'>FROM</p>
                <p className='text-4xl'>SEOUL</p>
                <p className='text-xl'>KOREA EARTH</p>
                <p className='mt-4 text-xl'>JULY 08, 2029</p>
                <p className='text-xl'>11:30 AM</p>
              </div>
              <div className='ml-auto'>
                <p className='text-xl'>TO</p>
                <p className='text-4xl font-bold'>
                  {order.planet.english_name}
                </p>
                <p className='text-xl'>UNIVERSE</p>
                <p className='mt-4 text-xl'>JULY 08, 2029</p>
                <p className='text-xl'>11:30 AM</p>
              </div>
            </div>
            <div className=' border-dashed border-l-2 border-slate-950 bg-white h-52 mt-2'></div>
            <div className='bg-white rounded-2xl text-black w-96 p-6 flex flex-col'>
              <p className='mb-3 font-bold text-xl'>Boarding Pass</p>
              <div className='flex justify-between mb-1'>
                <div>
                  <p className='text-sm'>FROM</p>
                  <p className='text-2xl font-bold'>SEOUL</p>
                  <p className='text-sm'>EARTH</p>
                </div>
                <div>
                  <p className='text-sm'>TO</p>
                  <p className='text-2xl font-bold'>
                    {order.planet.english_name}
                  </p>
                  <p className='text-sm'>UNIVERSE</p>
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <Image
                  src='/images/barcode.svg'
                  alt='barcode'
                  height={50}
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TourOrdersList;
