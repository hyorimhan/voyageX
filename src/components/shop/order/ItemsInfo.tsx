'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { ItemList } from './OrderForm';

interface ItemsInfoProps {
  itemList: ItemList;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

function ItemsInfo({ itemList, setTotalPrice }: ItemsInfoProps) {
  useEffect(() => {
    setTotalPrice(
      itemList.reduce((total, item) => (total = item.price * item.quantity), 0),
    );
  });

  return (
    <>
      <div className='border-2 border-white p-4 rounded-lg'>
        <div className='py-4 mb-4 border-b-2 border-black-700'>
          <span className='text-xl'>{`상품정보 총 ${itemList.length}개`}</span>
        </div>
        {itemList.map((item) => (
          <div
            key={item.id}
            className='grid grid-cols-[minmax(0,1fr)_100px] mb-3'
          >
            <div className='flex items-center justify-start gap-4'>
              <div className='w-20 h-24'>
                <img src={item.img} alt={item.name} className='w-full h-full' />
              </div>
              <p>{item.name}</p>
            </div>
            <div className='border-l-2 border-white flex flex-col items-center justify-center'>
              <p>{`${item.price.toLocaleString()}원`}</p>
              <p>{`수량 ${item.quantity}개`}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ItemsInfo;
