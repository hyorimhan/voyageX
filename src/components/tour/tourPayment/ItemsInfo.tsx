'use client';
import { tourDetail } from '@/services/tour';
import { Tour } from '@/types/tourPropsType';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ItemsInfo({ id }: { id: string }) {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const tourPackage = async () => {
      const { tours, error } = await tourDetail(id);
      setTours(tours as Tour[]);
      if (error) {
        toast(error.message);
      }
    };
    tourPackage();
  }, [id]);

  return (
    <>
      <div className='border-[1px] border-black-300 rounded-lg '>
        <div className='items-center border-b-[1px] border-b-black-700 flex mt-[23px] mx-auto w-[672px] '>
          <div className='text-xl pb-3'>상품 정보 ㅣ 총 1개</div>
        </div>

        <div className='w-[672px] mx-auto flex  '>
          {tours.map((tour) => {
            return (
              <div key={tour.id} className='flex items-center'>
                <div>
                  <Image
                    src={tour.planets.planet_img}
                    alt={'tour.planets.name'}
                    width={104}
                    height={104}
                    className='mt-4 mb-5 w-[104px] h-[104px]'
                  />
                </div>
                <div className='w-[410px] mx-[18px] mr-[18px]'>
                  <div className='flex'>
                    <div className='mr-1'>{tour.planets.name}</div>
                    <div>{tour.planets.english_name}</div>
                  </div>
                  <div>
                    <div>6박 7일 패키지</div>
                  </div>
                </div>

                <div className='w-[122px] py-[30px] px-4 border-l h-[104px] flex flex-col items-center'>
                  <div> {tour.price?.toLocaleString()}원</div>
                  <div>수량 1개</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ItemsInfo;
