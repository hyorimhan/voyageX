import { tourInfoType } from '@/zustand/store/useTourOrderInfoStore';
import Image from 'next/image';

interface OrderedTourInfoPropsType {
  tourOrder: tourInfoType;
}

function OrderedTourInfo({ tourOrder }: OrderedTourInfoPropsType) {
  return (
    <div className='border-[1px] border-black-300 rounded-lg p-5'>
      <div className='text-xl border-b pb-3 border-black-700 mb-4'>
        주문상품 정보
      </div>
      <div className='flex items-center my-4'>
        <div className='mr-[18px]'>
          <Image
            src={tourOrder?.planet_img!}
            alt={tourOrder?.planet_name!}
            width={104}
            height={104}
          />
        </div>
        <div className='w-[818px] mr-[18px]'>
          <div>{`${tourOrder?.planet_name}`}</div>
        </div>
        <div className='flex flex-col border-l border-black-300 h-[104px] px-4 py-[30px] w-[122px]'>
          <p className='text-white text-base'>
            {tourOrder?.price.toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderedTourInfo;
