import useAuthStore from '@/zustand/store/useAuth';
import LikedItems from './liked_goods/LikedItems';
import LikedPlanet from './liked_goods/LikedPlanet';

function LikedGoods() {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <section className='mb-8'>
        <p className='text-black-50 text-base mb-4'>여행상품</p>
        {user && <LikedPlanet user_id={user.id} />}
      </section>
      <section className='mb-8'>
        <p className='text-black-50 text-base mb-4'>굿즈샵</p>
        {user && <LikedItems user_id={user.id} />}
      </section>
    </>
  );
}

export default LikedGoods;
