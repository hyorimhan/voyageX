'use client';

import ShareIcon32px from '@/components/common/icons/32px/ShareIcon32px';
import Image from 'next/image';
import QuantityBtn from './QuantityBtn';
import useAuthStore from '@/zustand/store/useAuth';
import { Tables } from '@/types/supabase';
import GoodsHearts from '../GoodsHearts';

type GoodsInfoProps = {
  goods: Tables<'goods'>;
  goods_id: string;
};

const GoodsInfo = ({ goods, goods_id }: GoodsInfoProps) => {
  const user = useAuthStore((state) => state.user);
  const goodsPrice = goods?.goods_price || 0;
  const formattedPrice = goodsPrice.toLocaleString();

  return (
    <div className='flex'>
      <div>
        <Image
          src={goods.goods_img}
          alt={goods.description}
          width={497}
          height={497}
        />
      </div>
      <div className='ml-14 flex flex-col text-2xl flex-grow'>
        <div className='mb-4 flex justify-between items-start'>
          <div>
            <p>{goods.goods_name}</p>
            <p>{goods.goods_name}</p>
          </div>
          <button className='items-stretch'>
            <ShareIcon32px />
          </button>
        </div>
        <div className='flex gap-1 flex-col font-bold'>
          <p className='text-lg text-black-500'>{formattedPrice}원</p>
          <div className='flex text-2xl font-bold'>
            <p className='text-error-900 mr-2'>10%</p>
            <p>{formattedPrice}원</p>
          </div>
        </div>
        <div className='flex mt-5 text-base flex-col'>
          <div className='border-t-[1px] border-black-700'></div>
          <div className='flex py-3 px-4 ga text-sm p-[18px]'>
            <p className=' w-[70px]'>배송정보</p>
            <p>예약 출고 (2024. 08. 11 이내 출고)</p>
          </div>
          <div className='border-t-[1px] border-black-700'></div>
          <div className='flex py-3 px-4 ga text-sm p-[18px]'>
            <p className=' w-[70px]'>배송비</p>
            <p>무료배송</p>
          </div>
          <div className='border-t-[1px] border-black-700'></div>
          <div className='flex py-3 px-4 ga text-sm p-[18px]'>
            <p className=' w-[70px]'>사이즈</p>
            <p>FREE</p>
          </div>
          <div className='border-t-[1px] border-black-700'></div>
          <div className='flex py-3 px-4 ga text-sm p-[18px]'>
            <p className=' w-[70px]'>색상</p>
            <p>RED</p>
          </div>
          <div className='border-t-[1px] border-black-700'></div>
          <QuantityBtn goodsPrice={goods.goods_price} />
        </div>
        <div className='gap-4 flex mt-5 w-full'>
          <div className='flex p-2 rounded-lg items-center border-2 border-solid border-primary-400'>
            <GoodsHearts goods_id={goods_id} user_id={user?.id} />
          </div>
          <div className='flex flex-grow gap-4 text-base h-[53px]'>
            <button className='border-solid border-2 w-full border-primary-400 rounded-lg'>
              장바구니
            </button>
            <button className='bg-primary-600 w-full rounded-lg'>
              쇼핑 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsInfo;
