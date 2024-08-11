import StarTrueIcon16px from '@/components/common/icons/16px/StarTrueIcon16px';
import StarFalseIcon24px from '@/components/common/icons/24px/StarFalseIcon24px';
import StarTrueIcon24px from '@/components/common/icons/24px/StarTrueIcon24px';
import TourHearts from '@/components/tour/tourDetail/TourHearts';
import { LikedPlanetType } from '@/types/mypageType';
import Image from 'next/image';

interface LikedPlanetItemPropsType {
  user_id: string;
  item: LikedPlanetType;
  handleGoToItem: (id: string) => void;
}

function LikedPlanetItem({
  user_id,
  item,
  handleGoToItem,
}: LikedPlanetItemPropsType) {
  return (
    <li className='text-black-50 mb-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
      <Image
        src={item.planets.planet_img}
        alt={item.planet_id}
        width={268}
        height={272}
        className='rounded-lg cursor-pointer h-[272px] w-[268px] p-4 border-[2px] border-black-600 bg-transparent'
        onClick={() => handleGoToItem(item.id)}
      />
      <div className='mb-4 justify-center flex flex-col gap-[6px] mt-3'>
        <p className='text-xs w-min text-black-700 bg-white border-[1px] border-black-200 text-center py-[6px] px-2 rounded-3xl'>
          HOT
        </p>
        <p
          className='flex justify-start text-base cursor-pointer'
          onClick={() => handleGoToItem(item.id)}
        >
          {item.planets.name} 6박 7일 패키지
        </p>
        <div className='flex justify-between items-end'>
          <div>
            <p className='text-xl mb-1 font-semibold'>{`${item.price.toLocaleString()}원`}</p>
            <div className='flex gap-1'>
              <StarTrueIcon16px />
              <p className='text-sm'>4.0</p>
            </div>
          </div>
          {user_id && <TourHearts tour_id={item.id} user_id={user_id} />}
        </div>
      </div>
    </li>
  );
}

export default LikedPlanetItem;
