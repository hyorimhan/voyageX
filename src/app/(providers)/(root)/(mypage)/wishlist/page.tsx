import RecommendList from '@/components/mypage/wishlist/my_cart/RecommendList';
import TabSelector from '@/components/mypage/wishlist/TabSelector';

const WishListPage = () => {
  return (
    <>
      <p className='text-2xl mb-[7px]'>찜 & 장바구니</p>
      <TabSelector />
      <RecommendList />
    </>
  );
};

export default WishListPage;
