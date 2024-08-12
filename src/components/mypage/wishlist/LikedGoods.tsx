import { useState } from 'react';
import { WishListPropsType } from '@/types/mypageType';
import LikedPlanetList from './liked_planets/LikedPlanetList';
import LikedGoodsList from './liked_goods/LikedGoodsList';
import RecommendList from './my_cart/RecommendList';
import Image from 'next/image';

function LikedGoods({ user_id }: WishListPropsType) {
  const [hasLikedPlanets, setHasLikedPlanets] = useState(true);
  const [hasLikedGoods, setHasLikedGoods] = useState(true);

  const hasNoItems = !hasLikedPlanets && !hasLikedGoods;

  return (
    <>
      {!hasNoItems ? (
        <>
          <section className='mb-8'>
            <p className='text-black-50 text-xl font-semibold mt-14'>
              여행상품
            </p>
            {user_id && (
              <LikedPlanetList
                user_id={user_id}
                setHasLikedPlanets={setHasLikedPlanets}
              />
            )}
          </section>
          <section className='mb-8'>
            <p className='text-black-50 text-xl font-semibold'>굿즈샵</p>
            {user_id && (
              <LikedGoodsList
                user_id={user_id}
                setHasLikedGoods={setHasLikedGoods}
              />
            )}
          </section>
        </>
      ) : (
        <div>
          <div className='mt-14 flex flex-col justify-center items-center mb-[104px]'>
            <Image
              src='/images/arcticons_spacenow.svg'
              alt='spacenow'
              width={80}
              height={80}
            />
            <p className='text-xl mt-9'>찜 한 상품이 없습니다.</p>
            <p className='text-sm mt-[7px]'>
              다양한 상품을 둘러보고 채워보세요.
            </p>
          </div>
          <div className='border-b-[1px] mb-[60px]'></div>
          <RecommendList />
        </div>
      )}
    </>
  );
}

export default LikedGoods;
