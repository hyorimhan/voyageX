'use client';

import { useGetCartList } from '@/hooks/goodsHooks';
import { deleteCartItem } from '@/services/goods';
import { CartListType, WishListPropsType } from '@/types/mypageType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function MyCart({ user_id }: WishListPropsType) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectItems, setSelectItems] = useState<CartListType[]>([]);
  const { data: cartList, isError, isPending } = useGetCartList(user_id);

  const handleSelectAllItems = () => {
    if (cartList && selectItems.length < cartList.length)
      setSelectItems(cartList);
    else if (cartList && selectItems.length === cartList.length)
      setSelectItems([]);
  };

  const handleSelectItem = (goods: CartListType) => {
    if (!selectItems.includes(goods))
      setSelectItems((prev) => [...prev, goods]);
    else
      setSelectItems((prev) =>
        prev.filter((item) => item.goods.id !== goods.goods.id),
      );
    console.log('selectItems => ', selectItems);
  };

  const handleDeleteItem = () => {
    const selectedItemIds = selectItems.map((item) => item.id);
    const idList = JSON.stringify(selectedItemIds);
    deleteCartItemMutate({ user_id, idList });
  };

  const queryClient = useQueryClient();

  const { mutate: deleteCartItemMutate } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user_id] });
      setSelectItems([]);
    },
  });

  useEffect(() => {
    setTotalPrice(
      selectItems.reduce((total, item) => {
        const price = item.goods.goods_price;
        const quantity = item.quantity;
        return total + price * quantity;
      }, 0),
    );
  }, [selectItems]);

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중..</div>;

  return (
    <>
      <div>
        <div className='flex flex-row justify-between items-center mb-4'>
          <div className='flex flex-row items-center gap-4'>
            <button
              onClick={handleSelectAllItems}
              className={`w-5 h-5 border-2 border-black-50 rounded ${
                selectItems.length === cartList.length
                  ? cartList.length === 0
                    ? 'bg-transparent'
                    : 'bg-black-50'
                  : 'bg-transparent'
              }`}
            ></button>
            <span className='text-base'>
              전체 ({selectItems ? selectItems.length : 0}/{cartList.length}
              )선택
            </span>
          </div>
          <button
            onClick={handleDeleteItem}
            className='bg-primary-400 text-xs rounded p-1'
          >
            선택 삭제
          </button>
        </div>
        <ul className='flex flex-col gap-4'>
          {cartList.map((item) => (
            <li
              key={item.id}
              className='border-2 border-black-50 p-4 rounded-lg grid grid-cols-[minmax(0,0.2fr)_minmax(0,0.5fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.5fr)]'
            >
              <button
                onClick={() => handleSelectItem(item)}
                className={`w-5 h-5 border-2 border-black-50 rounded self-center ${
                  selectItems.includes(item) ? 'bg-black-50' : 'bg-transparent'
                }`}
              ></button>
              <div className='w-20 h-24 self-center'>
                <Image
                  width={80}
                  height={96}
                  src={item.goods.goods_img}
                  alt={item.goods.goods_name}
                />
              </div>
              <div className='self-center'>
                <span className='text-base'>{item.goods.goods_name}</span>
              </div>
              <div className='self-center flex flex-row gap-2 text-sm'>
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
              <div className='self-center'>
                <span className='text-base'>
                  {item.goods.goods_price.toLocaleString()}원
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className='border-t-2 border-white my-4'>
          <div className='flex flex-row justify-evenly p-4'>
            <div className='flex flex-col items-center'>
              <span className='text-base'>총 주문금액</span>
              <span className='text-lg'>{`${totalPrice.toLocaleString()}원`}</span>
            </div>
            <div className='self-center'>
              <span className='text-lg'>+</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-base'>총 배송비</span>
              <span className='text-lg'>0원</span>
            </div>
            <div className='self-center'>
              <span className='text-lg'>=</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-base'>총 결제금액</span>
              <span className='text-lg'>{`${totalPrice.toLocaleString()}원`}</span>
            </div>
          </div>
        </div>
        <section className='flex flex-row gap-4 mb-20'>
          <button className='border-2 border-primary-600 w-1/2 rounded-lg p-4 text-base'>
            쇼핑 계속하기
          </button>
          <button className='bg-primary-600 w-1/2 rounded-lg p-4 text-base'>
            구매하기
          </button>
        </section>
      </div>
    </>
  );
}

export default MyCart;
