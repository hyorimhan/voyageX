'use client';

import SpaceshipIcon16px from '@/components/common/icons/16px/SpaceshipIcon16px';
import TourEndIcon from '@/components/common/icons/TourEndIcon';
import TourStartIcon from '@/components/common/icons/TourStartIcon';
import Image from 'next/image';
import { orbitron } from '../../../../public/fonts/orbitron';
import SpaceshipIcon20px from '@/components/common/icons/20px/SpaceshipIcon20px';
import { useQuery } from '@tanstack/react-query';
import { getTourOrder } from '@/services/tour';
import useAuthStore from '@/zustand/store/useAuth';
import { tourOrderListType } from '@/types/tour';
import ArrowRightIcon16px from '@/components/common/icons/16px/ArrowRightIcon16px';
import Link from 'next/link';
import TourReviewModal from './TourReviewModal';
import { useCallback, useRef, useState } from 'react';
import Loading from '@/components/common/Loading';
import { toPng } from 'html-to-image';

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
  const [hour, minute] = timeString.split(':').map((str) => parseInt(str, 10));
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

const TourOrdersList = () => {
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
  } = useQuery<tourOrderListType[]>({
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
    return (
      <div className='flex flex-col justify-center items-center gap-9 mt-16 sm:hidden'>
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
    <div className='sm:hidden'>
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
            <div className='flex w-full text-white flex-wrap '>
              <div
                className='bg-black-800 rounded-2xl flex py-6 px-4 w-[544px]'
                style={{
                  backgroundImage: `url('${order.tours.planets.ticket_web_img}')`,
                }}
              >
                <div className='mr-[18px] sm:hidden'>
                  <Image
                    src='/images/barcode2.svg'
                    alt='barcode'
                    height={213}
                    width={69}
                  />
                </div>
                <div className='flex-col flex'>
                  <div className='flex flex-col h-[46px]'>
                    <div className='flex'>
                      <div className='flex gap-2 items-start'>
                        <div>
                          <p className={`${orbitron.className} text-2xl`}>
                            DAEJEON
                          </p>
                          <p className='text-xs'>{order.depart_place}</p>
                          <div className='flex gap-2 items-center mt-3'>
                            <div className='flex flex-col gap-1'>
                              <p className='text-black-300 text-xs w-[49px]'>
                                Date
                              </p>
                              <p className='text-black-300 text-xs mt-1'>
                                Dep time
                              </p>
                            </div>
                            <div>
                              <p className='text-sm'>
                                {formatDate(order.depart_date, true)}
                              </p>
                              <p className='text-sm mt-1'>
                                {formatTime(order.depart_time)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='mt-2 mx-[9px] flex gap-1'>
                          <TourStartIcon />
                          <SpaceshipIcon16px />
                          <TourEndIcon />
                        </div>
                      </div>
                      <div className='flex h-[46px] gap-2 items-start'>
                        <div>
                          <p className={`${orbitron.className} text-2xl`}>
                            {order.tours.planets.english_name}
                          </p>
                          <p className='text-xs'>
                            {order.tours.planets.name}, 우주
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
                    <div className='flex gap-4 mt-[17px]'>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Departure</p>
                        <p className='text-sm'>
                          {formatTime(order.depart_time)}
                        </p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Spaceship Code</p>
                        <p className='text-sm'>{order.spaceship_code}</p>
                      </div>
                    </div>
                    <div className='flex gap-4 mt-3'>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Name</p>
                        <p className='text-sm'>{order.passenger}</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Passenger</p>
                        <p className='text-sm'>1 Adult</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Gate</p>
                        <p className='text-sm'>{order.gate}</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Boarding time</p>
                        <p className='text-sm'>11:30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-black-800 rounded-2xl text-black w-[292px] pl-[15px] py-4 flex flex-col sm:w-[335px]'>
                <div className='flex gap-2 h-5 mt-1 ml-[7px] items-center'>
                  <SpaceshipIcon20px />
                  <p className='text-xs font-semibold'>BOARDING PASS</p>
                </div>
                <div className='flex mt-[27px]'>
                  <div className='w-24'>
                    <p className='text-xl'>DAEJEON</p>
                    <p className='text-[10px]'>{order.depart_place}</p>
                    <p className='text-xs mt-3'>
                      {formatDate(order.depart_date, true)}
                    </p>
                    <p className='text-xs'>{formatTime(order.depart_time)}</p>
                  </div>
                  <div className='ml-2 mr-3 mt-3'>
                    <Image
                      src='/ticket/bar.svg'
                      alt='barcode'
                      height={7}
                      width={56}
                    />
                  </div>
                  <div>
                    <p className='text-xl'>
                      {order.tours.planets.english_name}
                    </p>
                    <p className='text-[10px]'>
                      {order.tours.planets.name}, 우주
                    </p>
                    <p className='text-xs mt-3'>
                      {formatDate(order.depart_date, true)}
                    </p>
                    <p className='text-xs'>{formatTime(order.arrive_time)}</p>
                  </div>
                </div>
                <div className='flex justify-center items-end mt-5'>
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
            <div className='flex w-full text-white flex-wrap '>
              <div
                className='bg-black-800 rounded-2xl flex py-6 px-4 w-[544px] sm:h-[424px]'
                style={{
                  backgroundImage: `url('${order.tours.planets.ticket_web_img}')`,
                }}
              >
                <div className='mr-[18px] sm:hidden'>
                  <Image
                    src='/images/barcode2.svg'
                    alt='barcode'
                    height={213}
                    width={69}
                  />
                </div>
                <div className='flex-col flex'>
                  <div className='flex flex-col h-[46px]'>
                    <div className='flex'>
                      <div className='flex gap-2 items-start'>
                        <div>
                          <p className={`${orbitron.className} text-2xl`}>
                            {order.tours.planets.english_name}
                          </p>
                          <p className='text-xs'>
                            {order.tours.planets.name}, 우주
                          </p>
                          <div className='flex gap-2 items-center mt-3'>
                            <div className='items-center flex flex-col gap-1'>
                              <p className='text-black-300 text-xs w-[49px]'>
                                Date
                              </p>
                              <p className='text-black-300 text-xs mt-1'>
                                Dep time
                              </p>
                            </div>
                            <div>
                              <p className='text-sm'>
                                {formatDate(order.arrive_date, true)}
                              </p>
                              <p className='text-sm mt-1'>
                                {formatTime(order.depart_time)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className='mt-2 mx-[9px] flex gap-1'>
                          <TourStartIcon />
                          <SpaceshipIcon16px />
                          <TourEndIcon />
                        </div>
                      </div>
                      <div className='flex h-[46px] gap-2 items-start'>
                        <div>
                          <p className={`${orbitron.className} text-2xl`}>
                            DAEJEON
                          </p>
                          <p className='text-xs'>{order.depart_place}</p>
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
                    <div className='flex gap-4 mt-[17px]'>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Departure</p>
                        <p className='text-sm'>
                          {formatTime(order.depart_time)}
                        </p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Spaceship Code</p>
                        <p className='text-sm'>{order.spaceship_code}</p>
                      </div>
                    </div>
                    <div className='flex gap-4 mt-3'>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Name</p>
                        <p className='text-sm'>{order.passenger}</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Passenger</p>
                        <p className='text-sm'>1 Adult</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Gate</p>
                        <p className='text-sm'>{order.gate}</p>
                      </div>
                      <div className='gap-2 flex-col'>
                        <p className='text-xs text-black-300'>Boarding time</p>
                        <p className='text-sm'>11:30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-black-800 rounded-2xl text-black w-[292px] pl-[15px] py-4 flex flex-col sm:w-[335px]'>
                <div className='flex gap-2 h-5 mt-1 ml-[7px] items-center'>
                  <SpaceshipIcon20px />
                  <p className='text-xs font-semibold'>BOARDING PASS</p>
                </div>
                <div className='flex mt-[27px]'>
                  <div className='w-24'>
                    <p className='text-xl'>
                      {order.tours.planets.english_name}
                    </p>
                    <p className='text-[10px]'>
                      {order.tours.planets.name}, 우주
                    </p>
                    <p className='text-xs mt-3'>
                      {formatDate(order.arrive_date, true)}
                    </p>
                    <p className='text-xs'>{formatTime(order.depart_time)}</p>
                  </div>
                  <div className='ml-2 mr-3 mt-3'>
                    <Image
                      src='/ticket/bar.svg'
                      alt='barcode'
                      height={7}
                      width={56}
                    />
                  </div>
                  <div>
                    <p className='text-xl'>DAEJEON</p>
                    <p className='text-[10px]'>{order.depart_place}</p>
                    <p className='text-xs mt-3'>
                      {formatDate(order.arrive_date, true)}
                    </p>
                    <p className='text-xs'>{formatTime(order.arrive_time)}</p>
                  </div>
                </div>
                <div className='flex justify-center items-end mt-5'>
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
              className='bg-transparent p-2 rounded-md w-[73px] text-xs border-[1px] border-primary-400 hover:border-primary-200 active:border-primary-300'
              onClick={() => {
                setSelectedOrderId(order.id);
                setSelectedTourId(order.tour_id);
                setShowReviewFormAddModal(true);
              }}
            >
              {order.review_id ? '리뷰수정' : '리뷰작성'}
            </button>
            <button
              className='bg-primary-400 p-2 rounded-md w-[73px] text-xs hover:bg-primary-200 active:bg-primary-300'
              onClick={() => ticketSave(order.id)}
            >
              티켓저장
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

export default TourOrdersList;
