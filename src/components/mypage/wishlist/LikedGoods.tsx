import { WishListPropsType } from '@/types/mypageType';
import LikedPlanetList from './liked_planets/LikedPlanetList';
import LikedGoodsList from './liked_goods/LikedGoodsList';

function LikedGoods({ user_id }: WishListPropsType) {
  return (
    <>
      <section className='mb-8'>
        <p className='text-black-50 text-base mb-4'>여행상품</p>
        {user_id && <LikedPlanetList user_id={user_id} />}
      </section>
      <section className='mb-8'>
        <p className='text-black-50 text-base mb-4'>굿즈샵</p>
        {user_id && <LikedGoodsList user_id={user_id} />}
      </section>
    </>
  );
}

export default LikedGoods;
