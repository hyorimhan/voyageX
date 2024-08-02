import Hearts from '@/components/shop/Hearts';
import Stars from '@/components/shop/Stars';
import { useGetLikedGoodsByUser } from '@/hooks/goodsHooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LikedItemsParamsType {
  user_id: string;
}

function LikedItems({ user_id }: LikedItemsParamsType) {
  const {
    data: likedGoods,
    isError,
    isPending,
  } = useGetLikedGoodsByUser(user_id, 'liked_goods');
  const router = useRouter();

  const handleGoToItem = (id: string) => {
    router.push(`/shop_detail/${id}`);
  };

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중..</div>;
  return (
    <>
      <ul className='text-black-50 mb-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {likedGoods.map((item) => (
          <li key={item.goods_id} className='mx-auto my-4 w-full bg-black-1000'>
            <div className='relative'>
              <Image
                src={item.goods.goods_img}
                alt={item.goods.description}
                width={268}
                height={272}
                className='rounded-lg w-full h-72 object-cover cursor-pointer'
                style={{ objectFit: 'cover' }}
                onClick={() => handleGoToItem(item.goods_id)}
              />
            </div>
            <div className='p-2'>
              <p
                className='flex justify-start text-base cursor-pointer'
                onClick={() => handleGoToItem(item.goods_id)}
              >
                {item.goods.goods_name}
              </p>
              <div className='flex flex-row'>
                <p className='text-red-600 text-xl mr-2'>10%</p>
                <p className='flex justify-center text-xl'>{`${item.goods.goods_price.toLocaleString()}원`}</p>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-2'>
                  <Stars ratingAvg={item.goods.rating_avg} />
                  <div className='bg-black-600 rounded-xl text-xs p-1.5'>
                    무료배송
                  </div>
                </div>
                {user_id && (
                  <Hearts goods_id={item.goods_id} user_id={item.user_id} />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default LikedItems;
