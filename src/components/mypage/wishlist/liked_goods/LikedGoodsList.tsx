import Loading from '@/components/common/Loading';
import GoodsItem from '@/components/shop/GoodsItem';
import { useGetLikedGoodsByUser } from '@/hooks/apis/goods.api';

interface LikedGoodsListPropsType {
  user_id: string;
}

function LikedGoodsList({ user_id }: LikedGoodsListPropsType) {
  const {
    data: likedGoods,
    isError,
    isPending,
  } = useGetLikedGoodsByUser(user_id, 'liked_goods');

  if (isError) return <div>에러</div>;
  if (isPending) return <Loading />;
  return (
    <ul className='text-black-50 mb-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {likedGoods.length
        ? likedGoods.map((item) => (
            <GoodsItem
              key={item.goods_id}
              item={item.goods}
              user_id={user_id}
            />
          ))
        : '찜한 상품이 없습니다!'}
    </ul>
  );
}

export default LikedGoodsList;
