import { CartListType } from '@/types/mypageType';
import useItemListStore from '@/zustand/store/itemListStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CartButtonContainerPropsType {
  selectItems: CartListType[];
}

function CartButtonContainer({ selectItems }: CartButtonContainerPropsType) {
  const router = useRouter();
  const { setItemList } = useItemListStore((state) => state);
  const handleGoToPayPage = () => {
    if (!selectItems.length) return toast.error('상품을 선택해주세요!');
    const itemList = selectItems.map((item) => ({
      quantity: item.quantity,
      goods: item.goods,
    }));
    setItemList(itemList);
    router.push(`/shop/order`);
  };

  const handleGoToShop = () => {
    router.push('/shop');
  };
  return (
    <section className='flex flex-row gap-4 mb-20'>
      <button
        className='border-2 border-primary-400 w-1/2 rounded-lg p-4 text-base bg-transparent transition-colors duration-200 hover:bg-primary-200 hover:text-black-1000 active:bg-primary-300 active:text-black-1000'
        onClick={handleGoToShop}
      >
        쇼핑 계속하기
      </button>
      <button
        className='bg-primary-600 w-1/2 rounded-lg p-4 text-base transition-colors duration-200 hover:bg-primary-400 active:bg-primary-500'
        onClick={handleGoToPayPage}
      >
        구매하기
      </button>
    </section>
  );
}

export default CartButtonContainer;
