'use client';

import Loading from '@/components/common/Loading';
import Page from '@/components/pages/Page';
import FAQ from '@/components/shop/detail/FAQ';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import GoodsInfo from '@/components/shop/detail/GoodsInfo';
import { useGetGoodsItem } from '@/hooks/apis/goods.api';
import { orbitron } from '../../../../../../../public/fonts/orbitron';
import Image from 'next/image';
import TopBtn from '@/components/common/TopBtn';

type Params = {
  params: {
    id: string;
  };
};

const ShopDetailPage = ({ params }: Params) => {
  const { data: goods, isLoading, isError } = useGetGoodsItem(params.id);

  if (isLoading) return <Loading />;
  if (isError) return <div>에러 발생</div>;

  return (
    <Page>
      <div className='sm:mx-5'>
        <p
          className={`text-[28px] font-semibold mb-[55px] ${orbitron.className}`}
        >
          GOODS SHOP
        </p>
        {goods && <GoodsInfo goods={goods} goods_id={params.id} />}
        <GoodsDetailPageTabSelector
          goodsRating={goods?.rating_avg}
          goodsId={params.id}
          contents={
            <>
              <Image
                src={goods?.description}
                alt='goods_detail'
                width={1000}
                height={500}
              />
            </>
          }
          defaultTab='Details'
        />
        <FAQ />

        <TopBtn size={80} />
      </div>
    </Page>
  );
};

export default ShopDetailPage;
