'use client';

import ShareIcon32px from '@/components/common/icons/32px/ShareIcon32px';
import Image from 'next/image';
import QuantityBtn from './QuantityBtn';
import useAuthStore from '@/zustand/store/useAuth';
import { Tables } from '@/types/supabase';
import GoodsHearts from '../GoodsHearts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addCartItem } from '@/services/goods';
import useGoodsOrderStore from '@/zustand/store/useGoodsOrderInfoStore';
import toast from 'react-hot-toast';
import GenericModal from '@/components/common/GenericModal';
import ShareLink from '../../common/ShareLink';
import useLastSelectWishListStore from '@/zustand/store/useLastSelectWishListStore';

type GoodsInfoProps = {
  goods: Tables<'goods'>;
  goods_id: string;
};

const GoodsInfo = ({ goods, goods_id }: GoodsInfoProps) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { setLastSelectTab } = useLastSelectWishListStore((state) => state);
  const { setGoodsOrderInfo } = useGoodsOrderStore((state) => state);
  const [totalPrice, setTotalPrice] = useState(goods.goods_price);
  const [quantity, setQuantity] = useState(1);
  const goodsPrice = goods?.goods_price || 0;
  const formattedPrice = goodsPrice.toLocaleString();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleAddCartItem = async () => {
    if (!user?.id) return toast.error('로그인 해주세요!');
    const response = await addCartItem({
      user_id: user?.id!,
      goods_id: goods.id,
      quantity,
    });
    if (response.error) {
      setIsErrorOpen(true);
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleGoToOrderPage = () => {
    if (!user?.id) toast.error('로그인 해주세요!');
    setGoodsOrderInfo([
      {
        goods,
        quantity: quantity,
      },
    ]);
    router.push('/shop/order');
  };

  return (
    <div className='sm:grid-cols-2 lg:flex'>
      <GenericModal
        isOpen={isConfirmOpen}
        title='장바구니에 담기 성공'
        content='장바구니를 확인해볼까요?'
        buttonText='보러가기'
        buttonAction={() => {
          setLastSelectTab('MyCart');
          router.push('/wishlist');
        }}
        cancelText='취소'
        cancelAction={() => setIsConfirmOpen(false)}
      />
      <GenericModal
        isOpen={isErrorOpen}
        title='이미 담은 상품입니다.'
        content='장바구니를 확인해볼까요?'
        buttonText='보러가기'
        buttonAction={() => {
          setLastSelectTab('MyCart');
          router.push('/wishlist');
        }}
        cancelText='취소'
        cancelAction={() => setIsErrorOpen(false)}
      />
      <div>
        <Image
          src={goods.goods_img}
          alt={goods.description}
          width={497}
          height={497}
          className='sm:w-[335px] sm:mx-auto'
        />
      </div>
      <div className='lg:ml-14 flex flex-col text-2xl flex-grow'>
        <div className='mb-4 flex justify-between items-start'>
          <div className='sm:mt-8 sm:flex sm:ml-auto w-full lg:flex'>
            <p className='w-full '>{goods.goods_name}</p>
            <ShareLink />
          </div>
        </div>
        <div className='flex gap-1 flex-col font-bold'>
          <p className='text-lg text-black-500 line-through'>
            {goods.pre_price.toLocaleString()}원
          </p>
          <div className='flex text-2xl font-bold'>
            <p className='text-error-900 mr-2'>{goods.discount}%</p>
            <p>{formattedPrice}원</p>
          </div>
        </div>
        <div className='flex mt-5 text-base flex-col'>
          <div className='border-t-[1px] border-black-700'></div>
          <div className='flex py-3 px-4 ga text-sm p-[18px]'>
            <p className=' w-[70px]'>배송정보</p>
            <p>예약 출고 (2024. 08. 30 이내 출고)</p>
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
            <p>{goods.color}</p>
          </div>
          <div className='border-t-[1px] border-black-700'></div>
          <QuantityBtn
            goodsPrice={goodsPrice}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
        <div className='gap-4 flex mt-5 w-full'>
          <div className='flex p-2 rounded-lg items-center border-2 border-solid border-primary-400'>
            <GoodsHearts goods_id={goods_id} user_id={user?.id} />
          </div>
          <div className='flex flex-grow gap-4 text-base h-[53px]'>
            <button
              onClick={handleAddCartItem}
              className='border-solid border-2 w-full border-primary-400 rounded-lg'
            >
              장바구니
            </button>
            <button
              onClick={handleGoToOrderPage}
              className='bg-primary-600 w-full rounded-lg'
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsInfo;
