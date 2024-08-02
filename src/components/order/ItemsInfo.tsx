import useItemListStore from '@/zustand/store/itemListStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';

interface ItemsInfoPropsType {
  label: string;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

function ItemsInfo({ label, setTotalPrice }: ItemsInfoPropsType) {
  const router = useRouter();
  const { itemList } = useItemListStore((state) => state);
  useEffect(() => {
    if (!itemList.length) {
      toast.error('상품을 다시 선택해주세요');
      router.back();
    }
    setTotalPrice(
      itemList.reduce((total, item) => {
        const price = item.goods.goods_price;
        const quantity = item.quantity;
        return total + price * quantity;
      }, 0),
    );
  });
  return (
    <>
      <div className='border-2 border-black-300 p-4 rounded-lg mb-4 text-black-50'>
        <div className='py-4 mb-4 border-b-2 border-black-700'>
          <span className='text-xl'>{`${label} 총 ${itemList.length}개`}</span>
        </div>
        {itemList.map((item) => (
          <div
            key={item.goods.id}
            className='grid grid-cols-[minmax(0,1fr)_100px] mb-3'
          >
            <div className='flex items-center justify-start gap-4'>
              <div className='w-20 h-24'>
                <Image
                  src={item.goods.goods_img}
                  alt={item.goods.goods_name}
                  width={80}
                  height={96}
                />
              </div>
              <p>{item.goods.goods_name}</p>
            </div>
            <div className='border-l-2 border-black-300 flex flex-col items-center justify-center'>
              <p>{`${item.goods.goods_price.toLocaleString()}원`}</p>
              <p>{`수량 ${item.quantity}개`}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ItemsInfo;
