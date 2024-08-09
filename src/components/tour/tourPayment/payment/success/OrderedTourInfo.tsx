import { tourInfoType } from '@/zustand/store/useTourOrderInfoStore';
import Image from 'next/image';

interface OrderedTourInfoPropsType {
  tourOrder: tourInfoType;
}

function OrderedTourInfo({ tourOrder }: OrderedTourInfoPropsType) {
  return (
    <div className='border-[1px] border-black-300 rounded-lg pl-5 pt-5 pr-5 md:pb-5 sm:pb-5'>
      <div className='text-xl border-b pb-3 border-black-700 mb-4'>
        주문상품 정보
      </div>
      <div className='lg:flex lg:tems-center lg:my-4 sm:grid-cols-3 md:flex sm:grid  '>
        <div className='lg:mx-auto'>
          <Image
            src={tourOrder?.planet_img!}
            alt={tourOrder?.planet_name!}
            width={104}
            height={104}
            className='w-[104px] h-[104px]'
          />
        </div>

        <div className='grid grid-cols-[818px_122px] sm:grid-cols-1 md:grid-cols-1 lg:gap-[18px] lg:h-[104px] sm:ml-1 sm:w-[190px]'>
          <div className=' mr-[18px] ml-[18px] my-auto'>
            <div className='md:mx-auto md:text-left sm:text-center'>
              <div>
                {`${tourOrder?.planet_name} ${tourOrder?.eng_name}`}
                <div className='md:text-sm sm:text-xs'>
                  <span>{`${tourOrder?.depart_date} ~`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col lg:border-l  lg:border-black-300 sm:border-t sm:border-t-black-300 lg:h-[104px] px-4 lg:py-[30px] '>
            <div className='text-white text-base my-auto sm:mx-auto'>
              {tourOrder?.price.toLocaleString()}원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderedTourInfo;
