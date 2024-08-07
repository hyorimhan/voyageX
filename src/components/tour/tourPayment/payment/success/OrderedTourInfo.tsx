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
      <div className='lg:flex lg:tems-center lg:my-4 sm:grid-cols-2 md:flex sm:grid '>
        <div className='lg:mx-auto'>
          <Image
            src={tourOrder?.planet_img!}
            alt={tourOrder?.planet_name!}
            width={104}
            height={104}
            className='w=104px h-[104px]'
          />
        </div>
        <div className='grid grid-cols-[818px_122px] sm:grid-cols-1 md:grid-cols-2 gap-[18px] h-[104px] '>
          <div className=' mr-[18px] ml-[18px] my-auto'>
            <div>{`${tourOrder?.planet_name}`}</div>
          </div>
          <div className='flex flex-col lg:border-l  lg:border-black-300 sm:border-t sm:border-t-black-300 h-[104px] px-4 py-[30px] '>
            <p className='text-white text-base my-auto'>
              {tourOrder?.price.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderedTourInfo;
