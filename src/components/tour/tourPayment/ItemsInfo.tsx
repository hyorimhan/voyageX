'use client';
import Loading from '@/components/common/Loading';
import { tourDetail } from '@/services/tour';
import { Tour } from '@/types/tourPropsType';
import useQuantityStore from '@/zustand/store/useQuantity';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

function ItemsInfo({ id }: { id: string }) {
  const totalPrice = useQuantityStore((state) => state.totalPrice);
  const quantity = useQuantityStore((state) => state.quantity);

  const { data: tourList, isLoading } = useQuery<Tour[]>({
    queryKey: ['tours', id],
    queryFn: async () => {
      const { tours, error } = await tourDetail(id);
      if (error) {
        console.log(error);
      }
      return tours ?? [];
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='border-[1px] border-black-300 rounded-lg '>
        <div className='items-center border-b-[1px] border-b-black-700 flex mt-[23px] mx-auto w-[672px] '>
          <div className='text-xl pb-3'>상품 정보 ㅣ 총 {quantity}개</div>
        </div>
        <div className='w-[672px] mx-auto flex'>
          {tourList?.map((tour) => {
            return (
              <div key={tour.id} className='flex items-center'>
                <div>
                  <Image
                    src={tour.planets?.planet_img!}
                    alt={'tour.planets.name'}
                    width={104}
                    height={104}
                    className='mt-4 mb-5 w-[104px] h-[104px]'
                  />
                </div>
                <div className='w-[410px] mx-[18px] mr-[18px]'>
                  <div className='flex'>
                    <div className='mr-1'>{tour.planets?.name}</div>
                    <div>{tour.planets?.english_name!}</div>
                  </div>
                  <div>
                    <div>6박 7일 패키지</div>
                  </div>
                </div>

                <div className='w-[122px] py-[30px] px-4 border-l h-[104px] flex flex-col items-center'>
                  <div> {totalPrice?.toLocaleString()}원</div>
                  <div>수량 {quantity}</div>
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
