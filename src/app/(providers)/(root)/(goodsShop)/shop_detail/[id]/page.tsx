'use client';

import Page from '@/components/pages/Page';
import Image from 'next/image';
import FAQ from '@/components/shop/detail/FAQ';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { useParams } from 'next/navigation';
import { Database } from '@/types/supabase';
import Hearts from '@/components/shop/Hearts';
import useAuthStore from '@/zustand/store/useAuth';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import ShareIcon32px from '@/components/common/icons/32px/ShareIcon32px';
import QuantityBtn from '@/components/shop/detail/QuantityBtn';

const supabase = createClient();

const ShopDetailPage = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [goods, setGoods] =
    useState<Database['public']['Tables']['goods']['Row']>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [selectedTab, setSelectedTab] = useState('Reviews');

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
          } else {
            setGoods(data);
          }
        } catch (error) {
          setIsError(true);
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
                <p className='text-lg text-black-500'>
                  {goods.goods_price.toLocaleString()}원
                </p>
                <div className='flex text-2xl font-bold'>
                  <p className='text-error-900 mr-2'>10%</p>
                  <p>{goods.goods_price.toLocaleString()}원</p>
                </div>
              </div>
              <div className='flex mt-5 text-base flex-col'>
                <div className='border-t-2 border-black-700'></div>
                <div className='flex py-3 px-4 ga text-sm p-[18px]'>
                  <p className=' w-[70px]'>배송정보</p>
                  <p>예약 출고 (2024. 08. 11 이내 출고)</p>
                </div>
                <div className='border-t-2 border-black-700'></div>
                <div className='flex py-3 px-4 ga text-sm p-[18px]'>
                  <p className=' w-[70px]'>배송비</p>
                  <p>무료배송</p>
                </div>
                <div className='border-t-2 border-black-700'></div>
                <div className='flex py-3 px-4 ga text-sm p-[18px]'>
                  <p className=' w-[70px]'>사이즈</p>
                  <p>FREE</p>
                </div>
                <div className='border-t-2 border-black-700'></div>
                <div className='flex py-3 px-4 ga text-sm p-[18px]'>
                  <p className=' w-[70px]'>색상</p>
                  <p>RED</p>
                </div>
                <div className='border-t-2 border-black-700'></div>
                <QuantityBtn goodsPrice={goods.goods_price} />
              </div>
              <div className='gap-4 flex mt-5 w-full'>
                {user && (
                  <div className='flex p-2 rounded-lg items-center border-2 border-solid border-primary-400'>
                    <Hearts goods_id={id} user_id={user.id} />
                  </div>
                )}
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
        )}
        <GoodsDetailPageTabSelector
          goodsRating={goods?.rating_avg}
          goodsId={id}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <FAQ />
      </Page>
    </div>
  );
};

export default ShopDetailPage;
