'use client';

import ArrowRightIcon16px from '@/components/common/icons/16px/ArrowRightIcon16px';
import SpaceshipIcon16px from '@/components/common/icons/16px/SpaceshipIcon16px';
import SpaceshipIcon20px from '@/components/common/icons/20px/SpaceshipIcon20px';
import TourEndIcon from '@/components/common/icons/TourEndIcon';
import TourStartIcon from '@/components/common/icons/TourStartIcon';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import TourReviewModal from './TourReviewModal';
import useAuthStore from '@/zustand/store/useAuth';
import { toPng } from 'html-to-image';
import { useQuery } from '@tanstack/react-query';
import { getTourOrder } from '@/services/tour';
import Loading from '@/components/common/Loading';
import { TourOrderType } from '@/types/tour';
import { orbitron } from '../../../../public/fonts/orbitron';

const TourOrderListMobile = () => {
  const formatDate = (dateString: string, withDay: boolean = false) => {
    const date = new Date(dateString);
    let formattedDate = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    if (withDay) {
      formattedDate = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
      });
    }

    // 끝에 점과 요일 앞의 점을 제거
    formattedDate = formattedDate
      .replace(/\.$/, '')
      .replace(/(?<=\d)\.\s(?=\()/, ' ');

    return formattedDate;
  };

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString
      .split(':')
      .map((str) => parseInt(str, 10));
    const date = new Date();
    date.setHours(hour, minute);
    return date
      .toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .toUpperCase();
  };

  const ticketContainerRef = useRef<{ [key: string]: HTMLDivElement | null }>(
    {},
  );
  const [showText, setShowText] = useState<boolean>(true);
  const [showReviewFormAddModal, setShowReviewFormAddModal] =
    useState<boolean>(false);
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const user_id = user?.id;

  const ticketSave = useCallback((orderId: string) => {
    setShowText(false);
    const ticketContainer = ticketContainerRef.current[orderId];
    if (ticketContainer) {
      toPng(ticketContainer)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${orderId}.png`;
          link.href = dataUrl;
          link.click();
        })
        .then(() => {
          setShowText(true);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, []);

  const {
    data: tourOrders,
    isLoading,
    isError,
  } = useQuery<TourOrderType[]>({
    queryKey: ['tourOrders', user_id],
    queryFn: () => getTourOrder(user_id),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (
    isError ||
    !tourOrders ||
    !Array.isArray(tourOrders) ||
    tourOrders.length === 0
  ) {
    console.error('Error fetching tour orders or no orders found:', tourOrders);
    return (
      <div className='flex flex-col justify-center items-center gap-9 mt-16'>
        <Image
          src='/images/arcticons_spacenow.svg'
          alt='spacenow'
          width={80}
          height={80}
        />
        <div>
          <p className='text-xl'>주문한 상품이 없습니다.</p>
          <p className='text-sm mt-[7px]'>
            새로운 우주 여행상품으로 채워보세요.
          </p>
        </div>
        <Link
          href={'/tour'}
          className='h-[43px] w-[230px] bg-primary-600 rounded-md text-black-50 justify-center items-center flex hover:bg-primary-400 active:bg-primary-500'
        >
          TRAVEL PACKAGE 바로가기
        </Link>
      </div>
    );
  }

  return (
    <div className='md:hidden lg:hidden'>
      {tourOrders.map((order) => (
        <div key={order.id} className='gap-4 flex flex-col'>
          <div className='border-b-[1px] border-black-700 flex py-4 justify-between items-center'>
            <p className='text-lg'>주문일자 {formatDate(order.pay_at)}</p>
            <Link
              href={`/mypage/tour_orders/${order.id}`}
              className='flex gap-1'
            >
              <p className='text-sm'>상세정보</p>
              <ArrowRightIcon16px />
            </Link>
          </div>
          <div
            ref={(el) => {
              ticketContainerRef.current[order.id] = el;
            }}
          >
            <div className='mb-5 sm:mb-[10px]'>
              {showText && <p>여행시작 티켓</p>}
            </div>
            <div className='flex w-full text-white flex-wrap'>
              <div
                className='bg-black-800 rounded-2xl flex h-[424px] w-full'
                style={{
                  backgroundImage: `url('${order.planet.ticket_mobile_img}')`,
                  backgroundSize: 'cover',
                }}
              >
                <div className='flex-col flex'>
                  <div className='flex gap-2 ml-4 items-center mb-7 mt-4'>
                    <SpaceshipIcon20px />
                    <p className='text-xs font-semibold'>BOARDING PASS</p>
                  </div>
                  <div className='flex items-start'>
                    <Image
                      src={'/ticket/long_bar.svg'}
                      alt='ticket bar img'
                      width={7}
                      height={121}
                      className='mr-2 ml-[22px] mt-4'
                    />
                    <div className='flex flex-col'>
                      <div className='flex flex-col gap-7'>
                        <div className='flex gap-2 items-start'>
                          <div>
                            <p className={`${orbitron.className} text-xl`}>
                              DAEJEON
                            </p>
                            <p className='text-xs font-medium'>
                              {order.depart_place}
                            </p>
                            <div className='flex gap-2 items-center mt-3'>
                              <div className='flex flex-col gap-1 text-[10px]'>
                                <p className='text-black-300'>Date</p>
                                <p className='text-black-300 mt-1'>Dep time</p>
                              </div>
                              <div className='text-xs'>
                                <p>{formatDate(order.depart_date, true)}</p>
                                <p className=' mt-1'>
                                  {formatTime(order.depart_time)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-2 items-start'>
                          <div>
                            <p className={`${orbitron.className} text-xl`}>
                              {order.planet.english_name}
                            </p>
                            <p className='text-xs font-medium'>
                              {order.planet.name}, 우주
                            </p>
                            <div className='flex items-center mt-3'>
                              <div className='flex flex-col gap-1'>
                                <p className='text-black-300 text-xs w-[49px]'>
                                  Date
                                </p>
                                <p className='text-black-300 text-xs mt-1'>
                                  Arr time
                                </p>
                              </div>
                              <div>
                                <p className='text-sm'>
                                  {formatDate(order.depart_date, true)}
                                </p>
                                <p className='text-sm mt-1'>
                                  {formatTime(order.arrive_time)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col ml-7'>
                    <div className='flex gap-5 mt-[28px]'>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Departure</p>
                        <p className='text-sm font-medium'>
                          {formatTime(order.depart_time)}
                        </p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Spaceship Code</p>
                        <p className='text-sm font-medium'>
                          {order.spaceship_code}
                        </p>
                      </div>
                    </div>
                    <div className='flex gap-5 mt-3'>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Name</p>
                        <p className='text-sm font-medium'>{order.passenger}</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Passenger</p>
                        <p className='text-sm font-medium'>1 Adult</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Gate</p>
                        <p className='text-sm font-medium'>{order.gate}</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Boarding time</p>
                        <p className='text-sm'>11:30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-black-800 rounded-2xl text-black py-[30px] flex flex-col w-full'>
                <div className='flex justify-center'>
                  <Image
                    src='/images/barcode1.svg'
                    alt='barcode'
                    height={69}
                    width={213}
                  />
                </div>
              </div>
            </div>
            <div className='my-5'> {showText && <p>여행도착 티켓</p>}</div>
            <div className='flex w-full text-white flex-wrap'>
              <div
                className='bg-black-800 rounded-2xl flex h-[424px] w-full'
                style={{
                  backgroundImage: `url('${order.planet.ticket_mobile_img}')`,
                  backgroundSize: 'cover',
                }}
              >
                <div className='flex-col flex'>
                  <div className='flex gap-2 ml-4 items-center mb-7 mt-4'>
                    <SpaceshipIcon20px />
                    <p className='text-xs font-semibold'>BOARDING PASS</p>
                  </div>
                  <div className='flex items-start'>
                    <Image
                      src={'/ticket/long_bar.svg'}
                      alt='ticket bar img'
                      width={7}
                      height={121}
                      className='mr-2 ml-[22px] mt-4'
                    />
                    <div className='flex flex-col'>
                      <div className='flex flex-col gap-7'>
                        <div className='flex gap-2 items-start'>
                          <div>
                            <p className={`${orbitron.className} text-xl`}>
                              {order.planet.english_name}
                            </p>
                            <p className='text-xs font-medium'>
                              {order.planet.name}, 우주
                            </p>
                            <div className='flex gap-2 items-center mt-3'>
                              <div className='flex flex-col gap-1 text-[10px]'>
                                <p className='text-black-300'>Date</p>
                                <p className='text-black-300 mt-1'>Dep time</p>
                              </div>
                              <div className='text-xs'>
                                <p>{formatDate(order.arrive_date, true)}</p>
                                <p className=' mt-1'>
                                  {formatTime(order.depart_time)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-2 items-start'>
                          <div>
                            <p className={`${orbitron.className} text-xl`}>
                              DAEJEON
                            </p>
                            <p className='text-xs font-medium'>
                              {order.depart_place}
                            </p>
                            <div className='flex items-center mt-3'>
                              <div className='flex flex-col gap-1'>
                                <p className='text-black-300 text-xs w-[49px]'>
                                  Date
                                </p>
                                <p className='text-black-300 text-xs mt-1'>
                                  Arr time
                                </p>
                              </div>
                              <div>
                                <p className='text-sm'>
                                  {formatDate(order.arrive_date, true)}
                                </p>
                                <p className='text-sm mt-1'>
                                  {formatTime(order.arrive_time)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col ml-7'>
                    <div className='flex gap-5 mt-[28px]'>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Departure</p>
                        <p className='text-sm font-medium'>
                          {formatTime(order.depart_time)}
                        </p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Spaceship Code</p>
                        <p className='text-sm font-medium'>
                          {order.spaceship_code}
                        </p>
                      </div>
                    </div>
                    <div className='flex gap-5 mt-3'>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Name</p>
                        <p className='text-sm font-medium'>{order.passenger}</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Passenger</p>
                        <p className='text-sm font-medium'>1 Adult</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Gate</p>
                        <p className='text-sm font-medium'>{order.gate}</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Boarding time</p>
                        <p className='text-sm'>11:30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-black-800 rounded-2xl text-black py-[30px] flex flex-col w-full'>
                <div className='flex justify-center'>
                  <Image
                    src='/images/barcode1.svg'
                    alt='barcode'
                    height={69}
                    width={213}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex mb-5 gap-3 justify-end'>
            <button
              className='bg-primary-400 p-2 rounded-md w-[73px] text-xs'
              onClick={() => {
                setSelectedOrderId(order.id);
                setSelectedTourId(order.tour_id);
                setShowReviewFormAddModal(true);
              }}
            >
              {order.review_id ? '리뷰수정' : '리뷰작성'}
            </button>
            <button
              className='bg-primary-500 p-2 rounded-md w-[73px] text-xs'
              onClick={() => ticketSave(order.id)}
            >
              티켓 저장
            </button>
          </div>
        </div>
      ))}
      {showReviewFormAddModal && user && selectedTourId && selectedOrderId && (
        <TourReviewModal
          order_id={selectedOrderId}
          tourId={selectedTourId}
          userId={user.id}
          onClose={() => setShowReviewFormAddModal(false)}
        />
      )}
    </div>
  );
};

export default TourOrderListMobile;
