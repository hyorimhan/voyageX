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
import goodsDetails, { GoodsDetails } from '@/utils/goods_details';

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

  const selectedGoods: GoodsDetails | undefined = goodsDetails.find(
    (item) => item.id === params.id,
  );

  if (isLoading || isPending) return <Loading />;
  if (goodsError || reviewError) return <div>에러 발생</div>;

  return (
    <Page>
      <div className='sm:mx-5 sm:mt-[102px]'>
        <div className='mb-[55px] sm:mb-5'>
          <Link
            href={'/shop'}
            className={`text-[28px] font-semibold ${orbitron.className}`}
          >
            GOODS SHOP
          </Link>
        </div>
        {goods && <GoodsInfo goods={goods} goods_id={params.id} />}
        <GoodsDetailPageTabSelector
          goodsRating={goods?.rating_avg}
          goodsReviews={goodsReviews}
          contents={
            selectedGoods ? (
              <>
                <div className='sm:w-full md:w-1/2 md:mx-auto lg:w-[660px] lg:mx-auto flex flex-col justify-center items-center mt-[247px]'>
                  <div className='flex flex-col items-center'>
                    <p className='text-4xl font-yangpyeong sm:text-3xl'>
                      {selectedGoods.제품명}
                    </p>
                    <p className='text-2xl mt-7 text-center sm:text-xl'>
                      {selectedGoods.제품소개.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className='mt-[100px] mb-20'>
                    <p className='text-primary-200 text-[28px] mb-4 sm:text-2xl'>
                      STYLE GUIDE
                    </p>
                    <p className='mb-4 text-2xl flex flex-col sm:text-xl'>
                      {selectedGoods.사용예시.split('\n').map((line, index) => (
                        <span
                          key={index}
                          className={index % 2 === 1 ? 'mb-4' : ''}
                        >
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                  <Image
                    src={`${goods.goods_detail_img}`}
                    alt={selectedGoods.제품명}
                    width={560}
                    height={250}
                  />
                </div>
                <ul className='mt-[100px] mb-[100px] w-[600px] mx-auto list-disc sm:w-full sm:px-5'>
                  <p className='text-2xl mb-6 sm:text-xl'>제품 상세 사양</p>
                  <p className='mb-[42px] text-xl sm:text-lg'>
                    {selectedGoods.상세사양.split('\n').map((line, index) => (
                      <li key={index}>
                        {line}
                        <br />
                      </li>
                    ))}
                  </p>
                  <p className='text-2xl mb-6 sm:text-xl'>
                    {selectedGoods.사용방법 ? '사용방법' : '주의 사항'}
                  </p>
                  <ol
                    className='mb-[42px] text-xl sm:text-lg list-decimal'
                    start={1}
                  >
                    {selectedGoods.사용방법
                      ? selectedGoods.사용방법
                          .split('\n')
                          .map((line, index) => (
                            <li key={index}>
                              {line}
                              <br />
                            </li>
                          ))
                      : selectedGoods.주의사항
                      ? selectedGoods.주의사항
                          .split('\n')
                          .map((line, index) => (
                            <li key={index}>
                              {line}
                              <br />
                            </li>
                          ))
                      : null}
                  </ol>
                  <p className='text-2xl mb-6 sm:text-xl'>구매 시 주의 사항</p>
                  <li className='text-xl mb-2 list-outside sm:text-lg'>
                    {selectedGoods['구매 시 주의사항']}
                  </li>
                </ul>
              </>
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
