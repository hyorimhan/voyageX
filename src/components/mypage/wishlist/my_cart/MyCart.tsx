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

  return (
    <div>
      <CartItemSelector
        selectItems={selectItems}
        listLength={cartList.length}
        handleSelectAllItems={handleSelectAllItems}
        handleDeleteItem={handleDeleteItem}
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
    </div>
  );
}

export default MyCart;
