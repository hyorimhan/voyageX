'use client';
import React, { useState } from 'react';
import AccordionImg from './tourTab/tourContents/AccordionImg';
import { useQuery } from '@tanstack/react-query';
import { TourDateList } from '@/types/tourPropsType';
import { getTourDateList } from '@/services/tour';
import Loading from '@/components/common/Loading';
import { useTourDate } from '@/zustand/store/useTourDate';

function DetailDate() {
  const [view, setView] = useState(false);
  const setTourDate = useTourDate((state) => state.setTourDate);
  const [selectDepart, setSelectDepart] = useState('날짜 선택, 변경');

  const { data: dateList, isLoading } = useQuery<TourDateList[]>({
    queryKey: ['dateList'],
    queryFn: getTourDateList,
  });
  if (isLoading) {
    return <Loading />;
  }
  const selectDate = (depart_date: string, arrive_date: string) => {
    setSelectDepart(depart_date);
    setTourDate(depart_date, arrive_date);
  };

  return (
    <>
      <div onClick={() => setView(!view)}>
        <div className=' flex lg:w-[560px] sm:flex-wrap md:mx-auto w-full sm:mx-auto '>
          <div className='justify-start md:mx-auto w-20 my-auto md:hidden sm:hidden'>
            여행 기간
          </div>
          <div className='flex sm:flex-wrap sm:w-full '>
            <div className='mx-auto sm:mr-0  md:w-64 sm:w-full lg:w-[440px] my-auto cursor-pointer '>
              {view ? (
                <span className='sm:ml-7'>{selectDepart}</span>
              ) : (
                <>
                  {' '}
                  <span>{selectDepart}</span>
                </>
              )}
            </div>
            <div className='sm:absolute sm:right-10 mr-3'>
              {view ? (
                <AccordionImg isEnter={true} />
              ) : (
                <AccordionImg isEnter={false} />
              )}
            </div>
          </div>
        </div>
        {view && (
          <div className='mt-3'>
            {dateList?.map((date) => (
              <button
                key={date.id}
                className='transition md:mx-auto w-full lg:flex  md:w-[700px] h-11 border-t border-t-black-500 items-center bg-black-800 hover:bg-black-700'
                onClick={() => selectDate(date.depart_date!, date.arrive_date!)}
              >
                <div className='lg:w-full lg:truncate '>
                  {date.depart_date} 12:30
                  <span className='lg:hidden '>{` ~ `}</span>
                </div>
                <div className='sm:hidden md:hidden'>~</div>

                <div className='lg:w-full  lg:truncate '>
                  {date.arrive_date} 19:30
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default DetailDate;
