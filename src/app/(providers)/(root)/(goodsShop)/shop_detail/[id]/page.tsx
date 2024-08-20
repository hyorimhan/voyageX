'use client';

import Loading from '@/components/common/Loading';
import Page from '@/components/pages/Page';
import FAQ from '@/components/shop/detail/FAQ';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import GoodsInfo from '@/components/shop/detail/GoodsInfo';
import { useGetGoodsItem } from '@/hooks/apis/goods.api';
import { orbitron } from '../../../../../../../public/fonts/orbitron';
import Image from 'next/image';
import { useGetGoodsReviews } from '@/hooks/apis/review.api';
import TopBtn from '@/components/common/TopBtn';
import Link from 'next/link';
import goodsDetails from '@/utils/goods_details';

type Params = {
  params: {
    id: string;
  };
};

const ShopDetailPage = ({ params }: Params) => {
  const {
    data: goods,
    isLoading,
    isError: goodsError,
  } = useGetGoodsItem(params.id);
  const {
    data: goodsReviews,
    isPending,
    isError: reviewError,
  } = useGetGoodsReviews(params.id);

  // goodsDetails 배열에서 params.id와 일치하는 항목 찾기
  const selectedGoods = goodsDetails.find((item) => item.id === params.id);

  if (isLoading || isPending) return <Loading />;
  if (goodsError || reviewError) return <div>에러 발생</div>;

  return (
    <Page>
      <div className='sm:mx-5'>
        <Link
          href={'/shop'}
          className={`text-[28px] font-semibold mb-[55px] ${orbitron.className}`}
        >
          GOODS SHOP
        </Link>
        {goods && <GoodsInfo goods={goods} goods_id={params.id} />}
        <GoodsDetailPageTabSelector
          goodsRating={goods?.rating_avg}
          goodsReviews={goodsReviews}
          contents={
            selectedGoods ? (
              <div className='self-center'>
                {goods?.wearing_shot && (
                  <Image
                    src={`${goods?.wearing_shot}`}
                    alt={selectedGoods.제품명}
                    width={1120}
                    height={500}
                  />
                )}
                <Image
                  src={`/${selectedGoods.detailImg}`}
                  alt={selectedGoods.제품명}
                  width={1120}
                  height={500}
                />
                <div className='mt-8 mb-8 flex flex-col'>
                  <p className='text-xl mb-2'>제품명</p>
                  <p className='mb-4'>{selectedGoods.제품명}</p>
                  <p className='text-xl mb-2'>제품소개</p>
                  <p className='mb-4'>{selectedGoods.제품소개}</p>
                  <p className='text-xl mb-2'>제품특징</p>
                  <p className='mb-4'>
                    {selectedGoods.제품특징.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <p className='text-xl mb-2'>상세사양</p>
                  <p className='mb-4'>
                    {selectedGoods.상세사양.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <p className='text-xl mb-2'>사용예시</p>
                  <p className='mb-4'>
                    {selectedGoods.사용예시.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ) : (
              <div>상품 정보를 찾을 수 없습니다.</div>
            )
          }
          defaultTab='Details'
        />
        <FAQ />
        <TopBtn />
      </div>
    </Page>
  );
};

export default ShopDetailPage;
