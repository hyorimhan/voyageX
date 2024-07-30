import LikedItems from './liked_goods/LikedItems';
import LikedPlanet from './liked_goods/LikedPlanet';
import { WishListPropsType } from '@/types/mypageType';

function LikedGoods({ user_id }: WishListPropsType) {
  return (
    <>
      <section className='mb-8'>
        <p className='text-black-50 text-base mb-4'>여행상품</p>
        {user_id && <LikedPlanet user_id={user_id} />}
      </section>
      <section className='mb-8'>
        <p className='text-black-50 text-base mb-4'>굿즈샵</p>
        {user_id && <LikedItems user_id={user_id} />}
      </section>
    </>
  );
}

export default LikedGoods;
