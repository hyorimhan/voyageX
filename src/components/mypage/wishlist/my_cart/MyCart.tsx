'use client';

import Loading from '@/components/common/Loading';
import { useGetCartList } from '@/hooks/apis/goods.api';
import { deleteCartItem, adjustQuantity } from '@/services/goods';
import { CartListType, WishListPropsType } from '@/types/mypageType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import CartTotalPrice from './CartTotalPrice';
import CartButtonContainer from './CartButtonContainer';
import CartItemSelector from './CartItemSelector';
import GenericModal from '@/components/common/GenericModal';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import CartItemMobile from './CartItemMobile';
import CartTotalPriceMobile from './CartTotalPriceMobile';

function MyCart({ user_id }: WishListPropsType) {
  const queryClient = useQueryClient();
  const { data: cartData, isError, isPending } = useGetCartList(user_id);
  const [cartList, setCartList] = useState<CartListType[]>([]);
  const [selectItemIds, setSelectItemIds] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleSelectAllItems = () => {
    if (cartList && selectItemIds.length < cartList.length)
      setSelectItemIds(cartList.map((item) => item.id));
    else if (cartList && selectItemIds.length === cartList.length)
      setSelectItemIds([]);
  };

  const handleSelectItem = (itemId: string) => {
    setSelectItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleDeleteItem = () => {
    const idList = JSON.stringify(selectItemIds);
    const cleanedCartList = cartList.filter(
      (item) => !selectItemIds.includes(item.id),
    );
    setCartList(cleanedCartList);
    deleteCartItemMutate({ user_id, idList });
  };

  const handleAdjustItemQuantity = ({
    id,
    operator,
    quantity,
  }: {
    id: string;
    operator: string;
    quantity: number;
  }) => {
    if (!selectItemIds.includes(id)) setSelectItemIds((prev) => [...prev, id]);
    if (
      cartList.find((item) => item.id === id)?.quantity === 3 &&
      operator === '+'
    ) {
      toast.error('한 번에 3개까지 구매가능합니다!');
    }
    setCartList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity =
            operator === '+'
              ? Math.min(item.quantity + 1, 3)
              : Math.max(item.quantity - 1, 1);
          quantityMutate({ user_id, cart_id: id, quantity: newQuantity });
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      }),
    );
  };

  const { mutate: deleteCartItemMutate } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user_id] });
      toast.success('삭제 되었습니다');
    },
  });

  const { mutate: quantityMutate } = useMutation({
    mutationFn: adjustQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user_id] });
    },
  });

  useEffect(() => {
    setCartList(cartData!);
  }, [cartData]);

  useEffect(() => {
    setTotalPrice(
      selectItemIds.reduce((total, itemId) => {
        const cartItem = cartList.find((item) => item.id === itemId);
        return total + cartItem?.goods.goods_price! * cartItem?.quantity!;
      }, 0),
    );
  }, [selectItemIds, cartList]);

  if (isError) return <div>에러</div>;
  if (isPending) return <Loading />;

  if (!cartList || cartList.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center gap-9 mt-16'>
        <Image
          src='/images/arcticons_spacenow.svg'
          alt='spacenow'
          width={80}
          height={80}
        />
        <div className='flex flex-col items-center font-medium'>
          <p className='text-xl'>장바구니에 담은 상품이 없습니다.</p>
          <p className='text-sm mt-[7px]'>다양한 상품을 둘러보고 채워보세요.</p>
        </div>
        <Link
          href={'/shop'}
          className='font-medium h-[43px] w-[230px] bg-primary-600 rounded-md text-black-50 justify-center items-center flex hover:bg-primary-400 active:bg-primary-500'
        >
          GOODS SHOP 바로가기
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <CartItemSelector
          selectItemIds={selectItemIds}
          listLength={cartList.length}
          handleSelectAllItems={handleSelectAllItems}
          setIsDeleteOpen={setIsDeleteOpen}
        />
      </div>
      <div className='sm:hidden'>
        <ul className='flex flex-col'>
          {cartList.length
            ? cartList?.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  selectItemIds={selectItemIds}
                  handleSelectItem={handleSelectItem}
                  handleAdjustItemQuantity={handleAdjustItemQuantity}
                />
              ))
            : '장바구니에 담은 상품이 없습니다!'}
        </ul>
      </div>
      <div className='md:hidden lg:hidden'>
        <ul className='flex flex-col gap-4'>
          {cartList?.map((item) => (
            <CartItemMobile
              key={item.id}
              item={item}
              selectItemIds={selectItemIds}
              handleSelectItem={handleSelectItem}
              handleAdjustItemQuantity={handleAdjustItemQuantity}
            />
          ))}
        </ul>
      </div>
      <div className='sm:hidden'>
        <CartTotalPrice totalPrice={totalPrice} />
      </div>
      <div className='md:hidden lg:hidden'>
        <CartTotalPriceMobile totalPrice={totalPrice} />
      </div>
      <div>
        <CartButtonContainer
          selectItemIds={selectItemIds}
          cartList={cartList}
        />
      </div>
      <GenericModal
        isOpen={isDeleteOpen}
        title='장바구니 상품 삭제'
        content='선택한 상품을 삭제하시겠습니까?'
        buttonText='삭제'
        buttonAction={() => {
          handleDeleteItem();
          setIsDeleteOpen(false);
        }}
        cancelText='취소'
        cancelAction={() => setIsDeleteOpen(false)}
      />
    </>
  );
}

export default MyCart;
