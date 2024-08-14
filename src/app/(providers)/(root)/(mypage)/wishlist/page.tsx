import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import TabSelector from '@/components/mypage/wishlist/TabSelector';
import Link from 'next/link';

const WishListPage = () => {
  return (
    <>
      <div className='flex mb-[7px] gap-2 sm:mt-8'>
        <Link
          href={'/mypage/side_bar'}
          className='md:hidden lg:hidden self-center'
        >
          <ArrowLeftIcon24px />
        </Link>
        <p className='text-2xl sm:text-xl'>찜 & 장바구니</p>
      </div>
      <TabSelector />
    </>
  );
};

export default WishListPage;
