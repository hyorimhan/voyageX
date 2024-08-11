'use client';

import Loading from '@/components/common/Loading';
import Page from '@/components/pages/Page';
import FAQ from '@/components/shop/detail/FAQ';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import GoodsInfo from '@/components/shop/detail/GoodsInfo';
import { useGetGoodsItem } from '@/hooks/apis/goods.api';

type Params = {
  params: {
    id: string;
  };
};

const ShopDetailPage = ({ params }: Params) => {
  const { data: goods, isLoading, isError } = useGetGoodsItem(params.id);
  const contents = '콘텐츠';

  if (isLoading) return <Loading />;
  if (isError) return <div>에러 발생</div>;

  return (
    <Page>
      <div className='sm:mx-5'>
        <p className='text-xl '>GOODS SHOP</p>
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
