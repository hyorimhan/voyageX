import { tourInfoType } from '@/zustand/store/useTourOrderInfoStore';
import Image from 'next/image';

interface OrderedTourInfoPropsType {
  tourOrder: tourInfoType;
}

function OrderedTourInfoMobile({ tourOrder }: OrderedTourInfoPropsType) {
  return (
    <div className='border-[1px] border-black-300 rounded-lg p-5'>
      <div className='text-xl border-b pb-3 border-black-700 mb-4 flex flex-row gap-[10px]'>
        <span>주문상품 정보</span>
        <span>{' | '}</span>
        <span className='text-lg'>총 1개</span>
      </div>
      <div className='flex items-start justify-start gap-4 mb-4'>
        <div className='w-[104px] h-[104px]'>
          <Image
            src={tourOrder?.planet_img!}
            alt={tourOrder?.planet_name!}
            width={104}
            height={104}
          />
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1 text-white'>
            <span className='text-sm text-white'>
              {tourOrder?.planet_name} {tourOrder?.eng_name}
            </span>
            <span className='text-sm font-semibold text-white'>
              6박 7일 패키지
            </span>
            <span className='text-xs text-black-200'>수량 1개</span>
          </div>
          <div>
            <span className='text-base text-white font-semibold'>{`${tourOrder?.price.toLocaleString()}원`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderedTourInfoMobile;
