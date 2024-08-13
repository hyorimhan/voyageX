'use client';

import Loading from '@/components/common/Loading';
import GoodsItem from '@/components/shop/GoodsItem';
import { useGetLikedGoodsByUser } from '@/hooks/apis/goods.api';
import { useEffect } from 'react';

interface LikedGoodsListPropsType {
  user_id: string;
  setHasLikedGoods: (hasItems: boolean) => void;
}

function LikedGoodsList({
  user_id,
  setHasLikedGoods,
}: LikedGoodsListPropsType) {
  const {
    data: likedGoods,
    isError,
    isPending,
  } = useGetLikedGoodsByUser(user_id, 'liked_goods');

  useEffect(() => {
    if (likedGoods && likedGoods.length === 0) {
      setHasLikedGoods(false);
    } else {
      setHasLikedGoods(true);
    }
  }, [likedGoods, setHasLikedGoods]);

  if (isError) return <div>에러</div>;
  if (isPending) return <Loading />;

  if (likedGoods.length === 0) {
    return null;
  }

  return (
    <ul className='text-black-50 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
      {likedGoods.length
        ? likedGoods.map((item) => (
            <div key={item.goods_id}>
              <GoodsItem
                key={item.goods_id}
                item={item.goods}
                user_id={user_id}
              />
            </div>
          ))
        : '찜한 상품이 없습니다!'}
    </ul>
  );
}

export default LikedGoodsList;
