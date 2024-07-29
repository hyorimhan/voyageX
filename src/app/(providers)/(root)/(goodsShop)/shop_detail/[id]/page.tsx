'use client';

import Page from '@/components/pages/Page';
import Image from 'next/image';
import { HiStar, HiOutlineStar } from 'react-icons/hi2';
import { PiStarHalfFill } from 'react-icons/pi';
import FAQ from '@/components/shop/detail/FAQ';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { useParams } from 'next/navigation';
import { Database } from '@/types/supabase';
import Hearts from '@/components/shop/Hearts';
import useAuthStore from '@/zustand/store/useAuth';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';

const supabase = createClient();

const ShopDetailPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [goods, setGoods] =
    useState<Database['public']['Tables']['goods']['Row']>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [selectedTab, setSelectedTab] = useState('Details');

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
    <div className='mt-[183px]'>
      <Page>
        <p className='text-xl'>GOODS SHOP</p>
        <div className='border-b-2 border-solid border-white mt-3 mb-8'></div>
        {goods && (
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
              <div className='mb-4'>
                <p>{goods.goods_name}</p>
                <p>{goods.goods_name}</p>
              </div>
              <div className='flex gap-1 flex-col'>
                <p className='text-xl text-black-500'>
                  {goods.goods_price.toLocaleString()}원
                </p>
                <div className='flex text-2xl'>
                  <p className='text-error-900 mr-2'>10%</p>
                  <p>{goods.goods_price.toLocaleString()}원</p>
                </div>
              </div>
              <div className='flex gap-4 mt-5 text-base'>
                <div className='flex flex-col gap-[14px]'>
                  <p>배송정보</p>
                  <p>배송비</p>
                  <p>사이즈</p>
                  <p>색상</p>
                </div>
                <div className='flex flex-col gap-[14px]'>
                  <p>예약 출고 2024.08.11 이내 출고</p>
                  <p>2,500원</p>
                  <p>FREE</p>
                  <p>RED</p>
                </div>
              </div>
              <div className='gap-2 flex mt-auto w-full'>
                {user && (
                  <div className='flex p-[14px] rounded-lg items-center border-2 border-solid border-black-800'>
                    <Hearts goods_id={id} user_id={user.id} />
                  </div>
                )}
                <div className='flex flex-grow gap-2'>
                  <button className='border-solid border-2 w-full border-primary-600 rounded-lg p-2 text-base'>
                    장바구니
                  </button>
                  <button className='bg-primary-600 w-full rounded-lg p-2 text-base'>
                    구매하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <GoodsDetailPageTabSelector
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <FAQ />
      </Page>
    </div>
  );
};

export default ShopDetailPage;
