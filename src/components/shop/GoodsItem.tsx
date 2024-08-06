import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Stars from './Stars';
import Hearts from './GoodsHearts';

interface GoodsItemPropsType {
  item: Tables<'goods'>;
  user_id: string | undefined;
}

function GoodsItem({ item, user_id }: GoodsItemPropsType) {
  const router = useRouter();
  const handleItemClick = (id: string) => {
    router.push(`/shop_detail/${id}`);
  };
  return (
    <li key={item.id} className='mx-auto my-4 w-full bg-black-1000'>
      <div className='relative'>
        <Image
          src={item.goods_img}
          alt={item.description}
          width={268}
          height={272}
          className='rounded-lg w-full h-72 object-cover cursor-pointer'
          style={{ objectFit: 'cover' }}
          onClick={() => handleItemClick(item.id)}
        />
      </div>
      <div className='p-2'>
        <p
          className='flex justify-start text-base cursor-pointer'
          onClick={() => handleItemClick(item.id)}
        >
          {item.goods_name}
        </p>
        <div className='flex flex-row'>
          <p className='text-red-600 text-xl mr-2'>10%</p>
          <p className='flex justify-center text-xl'>{`${item.goods_price.toLocaleString()}원`}</p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-2'>
            <Stars ratingAvg={item.rating_avg} />
            <div className='bg-black-600 rounded-xl text-xs p-1.5'>
              무료배송
            </div>
          </div>
          <Hearts goods_id={item.id} user_id={user_id} />
        </div>
      </div>
    </li>
  );
}

export default GoodsItem;
