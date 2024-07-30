'use client';

import Page from '@/components/pages/Page';
import Image from 'next/image';
import { GoHeart } from 'react-icons/go';
import { HiStar, HiOutlineStar } from 'react-icons/hi2';
import { PiStarHalfFill } from 'react-icons/pi';
import { FaCircle } from 'react-icons/fa';
import FAQ from '@/components/shop/detail/FAQ';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { useParams } from 'next/navigation';
import { Database } from '@/types/supabase';
import { IoHeart } from 'react-icons/io5';

const supabase = createClient();

const ShopDetailPage = () => {
  const { id } = useParams();
  const [goods, setGoods] =
    useState<Database['public']['Tables']['goods']['Row']>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchGoods = async () => {
        try {
          const { data, error } = await supabase
            .from('goods')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            setIsError(true);
            console.error('Error fetching goods:', error.message);
          } else {
            setGoods(data);
          }
        } catch (error) {
          setIsError(true);
          console.error('Unexpected error fetching goods:', error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchGoods();
    }
  }, [id]);

  if (isLoading) return <div>로딩 중..</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className='mt-[170px]'>
      <Page>
        <p>GOODS SHOP</p>
        <div className='border-b-2 border-solid border-white mt-3 mb-8'></div>
        {goods && (
          <div className='flex'>
            <div>
              <Image
                src={goods.goods_img}
                alt={goods.description}
                width={1280}
                height={1280}
              />
            </div>
            <div className='ml-4 w-full gap-4 flex flex-col text- flex-grow'>
              <div>
                <p>{goods.goods_name}</p>
                <p>{goods.goods_name}</p>
              </div>

              <div className='flex gap-2 font-bold flex-col'>
                <p className='mt-4 text-2xl text-black-500'>
                  {goods.goods_price.toLocaleString()}원
                </p>
                <div className='flex'>
                  <p className='text-error-900 mr-2'>10%</p>
                  <p>{goods.goods_price.toLocaleString()}원</p>
                </div>
              </div>
              <div className='flex gap-14 mt-4'>
                <div className='flex flex-col text-2xl'>
                  <p className='mb-4'>배송정보</p>
                  <p className='mb-6'>배송비</p>
                  <p className='mb-8'>사이즈</p>
                  <p>색상</p>
                </div>
                <div className='flex flex-col text-2xl'>
                  <p className='mb-4'>예약 출고 2024.08.11 이내 출고</p>
                  <p className='mb-4'>2,500원</p>
                  <p className='mb-7 bg-primary-600 p-2 rounded-lg w-24 text-center'>
                    FREE
                  </p>

                  <p>
                    <FaCircle className='text-primary-600' />
                  </p>
                </div>
              </div>
              <div className='gap-2 w-full h-20 flex mt-auto'>
                <GoHeart className='border-solid h-20 border-2 p-4 w-40 rounded-lg border-black-800' />
                <button className='border-solid border-2 border-primary-600 rounded-lg p-2 w-full'>
                  장바구니
                </button>
                <button className='bg-primary-600 rounded-lg p-2 w-full'>
                  구매하기
                </button>
              </div>
            </div>
          </div>
        )}
        <div className='mt-24 mb-16'>
          <div className='flex w-full text-center text-2xl'>
            <p className='w-full '>상세정보</p>
            <p className='w-full'>리뷰 45</p>
          </div>
          <div className='flex'>
            <div className='border-b-2 border-solid border-white mt-3 w-full'></div>
            <div className='border-b-4 border-solid border-white mt-3 w-full'></div>
          </div>
          <div className='mt-12 text-3xl flex flex-col items-center'>
            <p>리뷰</p>
            <div className='flex mt-6'>
              <div className='flex items-center mr-4'>
                <HiStar />
                <HiStar />
                <HiStar />
                <PiStarHalfFill />
                <HiOutlineStar />
              </div>
              <p>4.0/5.0</p>
            </div>
          </div>
        </div>
        <div className='flex py-7 w-full flex-grow'>
          <div className='mr-6'>
            <p className='flex mb-2'>
              <HiStar />
              <HiStar />
              <HiStar />
              <PiStarHalfFill />
              <HiOutlineStar />
            </p>
            <p>아이디</p>
          </div>
          <div>
            <p>튼튼하고 목늘어짐 없이 좋아용 추천!</p>
          </div>
          <div className='ml-auto'>
            <p>2024.07.08</p>
          </div>
        </div>
        <FAQ />
      </Page>
    </div>
  );
};

export default ShopDetailPage;
