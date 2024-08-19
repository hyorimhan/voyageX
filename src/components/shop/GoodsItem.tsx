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
    <li className='min-w-[160px] max-w-[268px] bg-black-1000'>
      <div className='relative w-full sm:h-[160px] md:h-[268px] lg:h-[268px]'>
        <Image
          src={item.goods_img}
          alt={item.description}
          fill
          className='absolute rounded-lg cursor-pointer w-full h-full'
          style={{ objectFit: 'cover' }}
          onClick={() => handleItemClick(item.id)}
        />
      </div>
      <div className='bg-black-600 rounded-xl text-xs py-1 px-2 w-min flex text-nowrap mt-3 mb-[6px] text-black-50'>
        무료배송
      </div>
      <div className='flex flex-col'>
        <p
          className='flex justify-start cursor-pointer font-medium text-base'
          onClick={() => handleItemClick(item.id)}
        >
          <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
            {item.goods_name}
          </span>
        </p>
        <span className='text-base text-black-200 line-through'>
          {item.pre_price.toLocaleString()}원
        </span>
        <div className='w-full'>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <p className='text-error-900 text-xl mr-2 font-semibold'>
                {item.discount}%
              </p>
              <p className='text-xl font-semibold'>{`${item.goods_price.toLocaleString()}원`}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <Stars ratingAvg={item.rating_avg} />
              <div className='sm:ml-auto'>
                <Hearts goods_id={item.id} user_id={user_id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default GoodsItem;
