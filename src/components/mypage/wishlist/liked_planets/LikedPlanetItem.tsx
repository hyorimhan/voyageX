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
    <li className='mx-auto my-4 w-full bg-black-1000'>
      <div className='relative'>
        <Image
          src={item.planets.planet_img}
          alt={item.planet_id}
          width={268}
          height={272}
          className='rounded-lg w-full h-72 object-cover cursor-pointer'
          style={{ objectFit: 'cover' }}
          onClick={() => handleGoToItem(item.id)}
        />
      </div>
      <div className='p-2'>
        <p
          className='flex justify-start text-base cursor-pointer'
          onClick={() => handleGoToItem(item.id)}
        >
          {item.planets.name}
        </p>
        <div className='flex flex-row'>
          <p className='flex justify-center text-xl'>{`${item.price.toLocaleString()}원`}</p>
        </div>
        <div className='flex flex-row justify-between items-center'>
          {user_id && <TourHearts tour_id={item.id} user_id={user_id} />}
        </div>
      </div>
    </li>
  );
}

export default LikedPlanetItem;
