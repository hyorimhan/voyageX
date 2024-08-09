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
    queryFn: () => getTourDateList(),
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
        <div className='flex lg:w-[560px] md:mx-auto w-full sm:w-[375px]'>
          <div className='justify-start md:mx-auto w-20 my-auto'>여행 기간</div>
          <div className='flex'>
            <div className='mx-auto w-96 md:w-64  sm:w-48 mr-6 my-auto cursor-pointer '>
              {selectDepart}
            </div>
            <div>
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
                className='transition md:mx-auto flex w-[560px] md:w-[700px] sm:w-[330px] h-11 border-t border-t-black-500 items-center bg-black-800 hover:bg-black-700'
                onClick={() => selectDate(date.depart_date!, date.arrive_date!)}
              >
                <div className='w-1/2 truncate'>{date.depart_date} 12:30</div>
                <div>~</div>
                <div className='w-1/2  truncate '>{date.arrive_date} 19:30</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default DetailDate;
