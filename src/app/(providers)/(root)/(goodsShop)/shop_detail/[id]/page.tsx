'use client';

import Page from '@/components/pages/Page';
import FAQ from '@/components/shop/detail/FAQ';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import { useGetGoodsItem } from '@/hooks/goodsHooks';
import GoodsInfo from '@/components/shop/detail/GoodsInfo';

type Params = {
  params: {
    id: string;
  };
};

const ShopDetailPage = ({ params }: Params) => {
  const { data: goods, isLoading, isError } = useGetGoodsItem(params.id);
  const contents = '콘텐츠';

  if (isLoading) return <div>로딩 중..</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <Page>
      <div className='mt-[183px]'>
        <p className='text-xl'>GOODS SHOP</p>
        <div className='border-b-[1px] border-solid border-white mt-3 mb-8'></div>
        {goods && <GoodsInfo goods={goods} goods_id={params.id} />}
        <GoodsDetailPageTabSelector
          goodsRating={goods?.rating_avg}
          goodsId={params.id}
          contents={contents}
        />
        <FAQ />
      </div>
    </Page>
  );
};

export default ShopDetailPage;
