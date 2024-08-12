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

function MyCart({ user_id }: WishListPropsType) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectItems, setSelectItems] = useState<CartListType[]>([]);
  const { data: cartList, isError, isPending } = useGetCartList(user_id);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
  };

  const handleDeleteItem = () => {
    const selectedItemIds = selectItems.map((item) => item.id);
    const idList = JSON.stringify(selectedItemIds);
    deleteCartItemMutate({ user_id, idList });
  };

  const handleAdjustItemQuantity = ({
    id,
    operator,
    prev,
  }: {
    id: string;
    operator: string;
    prev: number;
  }) => {
    if (operator === '+') {
      quantityMutate({ user_id, cart_id: id, task: 'increase', prev });
    } else {
      quantityMutate({ user_id, cart_id: id, task: 'decrease', prev });
    }
  };

  const queryClient = useQueryClient();

  const { mutate: deleteCartItemMutate } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user_id] });
      setSelectItems([]);
      setTotalPrice(0);
      toast.success('삭제 되었습니다');
    },
  });

  const { mutate: quantityMutate } = useMutation({
    mutationFn: adjustQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', user_id] });
      setSelectItems([]);
      setTotalPrice(0);
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
        <div className='flex flex-col items-center'>
          <p className='text-xl'>장바구니에 담은 상품이 없습니다.</p>
          <p className='text-sm mt-[7px]'>다양한 상품을 둘러보고 채워보세요.</p>
        </div>
        <Link
          href={'/shop'}
          className='h-[43px] w-[230px] bg-primary-600 rounded-md text-black-50 justify-center items-center flex hover:bg-primary-400 active:bg-primary-500'
        >
          GOODS SHOP 바로가기
        </Link>
      </div>
    );
  }

  return (
    <section>
      <CartItemSelector
        selectItems={selectItems}
        listLength={cartList.length}
        handleSelectAllItems={handleSelectAllItems}
        setIsDeleteOpen={setIsDeleteOpen}
      />
      <ul className='flex flex-col gap-4'>
        {cartList.length
          ? cartList?.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                selectItems={selectItems}
                handleSelectItem={handleSelectItem}
                handleAdjustItemQuantity={handleAdjustItemQuantity}
              />
            ))
          : '장바구니에 담은 상품이 없습니다!'}
      </ul>
      <CartTotalPrice totalPrice={totalPrice} />
      <CartButtonContainer selectItems={selectItems} />
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
    </section>
  );
}

export default MyCart;
