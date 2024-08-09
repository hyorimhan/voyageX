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
    <li key={item.id} className='my-4 w-full bg-black-1000'>
      <div className='relative'>
        <Image
          src={item.goods_img}
          alt={item.description}
          width={268}
          height={272}
          className='rounded-lg cursor-pointer h-[272px] w-[268px]'
          style={{ objectFit: 'cover' }}
          onClick={() => handleItemClick(item.id)}
        />
      </div>
      <div className='bg-black-600 rounded-xl text-xs py-1 px-2 w-min flex text-nowrap mt-3 mb-[6px] text-black-50'>
        무료배송
      </div>
      <div className='ml-1 flex flex-col'>
        <p
          className='flex justify-start cursor-pointer'
          onClick={() => handleItemClick(item.id)}
        >
          {item.goods_name}
        </p>
        <div className='flex justify-between items-end'>
          <div className='flex flex-col'>
            <div className='flex'>
              <p className='text-error-900 text-xl mr-2 font-semibold'>10%</p>
              <p className='text-xl font-semibold'>{`${item.goods_price.toLocaleString()}원`}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <Stars ratingAvg={item.rating_avg} />
            </div>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <Hearts goods_id={item.id} user_id={user_id} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default GoodsItem;
