import SpaceshipIcon16px from '@/components/common/icons/16px/SpaceshipIcon16px';
import TourEndIcon from '@/components/common/icons/TourEndIcon';
import TourStartIcon from '@/components/common/icons/TourStartIcon';
import Image from 'next/image';
import { orbitron } from '../../../../public/fonts/orbitron';
import SpaceshipIcon20px from '@/components/common/icons/20px/SpaceshipIcon20px';

const TourOrdersList = () => {
  return (
    <>
      <div className='gap-2 flex flex-col'>
        <p className='p-4 h-[53px] border-b-[1px] border-black-700'>
          주문일자 2024 .07 .12
        </p>
        <div className='flex w-full text-white'>
          <div
            className='bg-black-800 rounded-2xl flex py-6 px-4 w-[544px]'
            style={{ backgroundImage: `url('/tiket/moon_web.svg')` }}
          >
            <div className='mr-[59px]'>
              <Image
                src='/images/barcode2.svg'
                alt='barcode'
                height={213}
                width={69}
              />
            </div>
            <div className='flex-col flex'>
              <div className='flex h-[46px]'>
                <div className='flex gap-2 items-start'>
                  <div>
                    <p className={`${orbitron.className} text-2xl`}>SEOUL</p>
                    <p className='text-xs'>서울, 한국, 지구</p>
                  </div>
                  <div className='mt-3'>
                    <TourStartIcon />
                  </div>
                </div>
                <div className='px-4 mt-[7px]'>
                  <SpaceshipIcon16px />
                </div>
                <div className='flex h-[46px] gap-2 items-start'>
                  <div className='mt-3'>
                    <TourEndIcon />
                  </div>
                  <div>
                    <p className={`${orbitron.className} text-2xl`}>MOON</p>
                    <p className='text-xs'>달, 우주</p>
                  </div>
                </div>
              </div>
              <div className='flex mt-[11px]'>
                <div className='flex-col gap-2 mr-[124px]'>
                  <p className='text-sm'>2037. 11. 12 (목)</p>
                  <p className='text-sm'>12:30 PM</p>
                </div>
                <div className='flex-col gap-2'>
                  <p className='text-sm'>2037. 11. 18 (화)</p>
                  <p className='text-sm'>19:30 PM</p>
                </div>
              </div>
              <div className='flex gap-4 mt-[17px]'>
                <div className='gap-2 flex-col'>
                  <p className='text-xs text-black-300'>Departure</p>
                  <p className='text-sm'>12:50 PM</p>
                </div>
                <div className='gap-2 flex-col'>
                  <p className='text-xs text-black-300'>Spaceship</p>
                  <p className='text-sm'>Star riser</p>
                </div>
                <div className='gap-2 flex-col'>
                  <p className='text-xs text-black-300'>Flight type</p>
                  <p className='text-sm'>Business</p>
                </div>
              </div>
              <div className='flex gap-4 mt-3'>
                <div className='gap-2 flex-col'>
                  <p className='text-xs text-black-300'>Name</p>
                  <p className='text-sm'>김철수</p>
                </div>
                <div className='gap-2 flex-col'>
                  <p className='text-xs text-black-300'>Passenger</p>
                  <p className='text-sm'>1 Adult</p>
                </div>
                <div className='gap-2 flex-col'>
                  <p className='text-xs text-black-300'>Spaceship Code</p>
                  <p className='text-sm'>GA-210</p>
                </div>
                <div className='gap-2 flex-col'>
                  <p className='text-xs text-black-300'>Gate/Seat number</p>
                  <p className='text-sm'>A7/A1</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-black-800 rounded-2xl text-black w-[292px] px-[15px] py-4 flex flex-col'>
            <div className='flex gap-2 h-5 mt-1 ml-[7px] items-center'>
              <SpaceshipIcon20px />
              <p className='text-xs font-semibold'>BOARDING PASS</p>
            </div>
            <div className='flex mt-[27px]'>
              <div className='w-24'>
                <p className='text-xl'>SEOUL</p>
                <p className='text-[10px]'>서울, 한국, 지구</p>
                <p className='text-xs mt-3'>2037. 11. 12 (목)</p>
                <p className='text-xs'>12:30 PM</p>
              </div>
              <div className='ml-2 mr-3 mt-3'>
                <Image
                  src='/tiket/bar.svg'
                  alt='barcode'
                  height={7}
                  width={56}
                />
              </div>
              <div>
                <p className='text-xl'>MOON</p>
                <p className='text-[10px]'>달, 우주</p>
                <p className='text-xs mt-3'>2037. 11. 18 (화)</p>
                <p className='text-xs'>19:30 PM</p>
              </div>
            </div>
            <div className='flex justify-center items-end mt-5'>
              <Image
                src='/images/barcode1.svg'
                alt='barcode'
                height={69}
                width={213}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourOrdersList;
