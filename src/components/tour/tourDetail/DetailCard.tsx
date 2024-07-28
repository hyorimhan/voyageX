'use client';
import { Tour } from '@/types/tourPropsType';
import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import Link from 'next/link';

function DetailCard({ tour }: { tour: Tour }) {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <div className='  mt-[156px] flex '>
        <div className='flex w-[552px] h-[552px] rounded-[16px] border-[2px] border-black-600'>
          <Image
            src={tour.planets.planet_img}
            alt={tour.planets.name}
            width={500}
            height={500}
            className='m-[26px] '
          />
        </div>
        <div className='w-[504px] h-[552px] ml-[64px]'>
          <div className='text-[28px] mb-[16px]'>{tour.planets.name}</div>
          <div></div>
          <div className='text-[14px] mb-[32px]'>{tour.tag}</div>
          <div className='text-[18px] mb-[12px]'>6박 7일 패키지</div>
          <div className='text-[24px] mb-[32px]'>
            {tour.price.toLocaleString()}원
          </div>
          <div className='text-[14px] border-t-[1px] '>
            <div className=' border-b-[1px] my-3  pb-3'>
              출발확정 2025.10.10
            </div>
            <div className=' border-b-[1px] my-3  pb-3'>
              여행기간 2025.10.10 ~2025.10.20
            </div>
            <div className=' border-b-[1px] my-3  pb-3'>
              우주선명 스타라이저
            </div>
            <div className=' border-b-[1px] my-3  pb-3'>티켓 배송비 3000원</div>
          </div>
          <Link href={`/tourPayment/${tour.id}`}>
            <div className='h-[59px] bg-primary-600 rounded-[8px] justify-center flex items-center'>
              구매하기
            </div>
          </Link>
        </div>
      </div>
      <div className='mt-[48px] border-black-600 border-t-[1px]'>
        <div className='mt-[48px]'>달 여행 패키지 일정</div>
        <div>누구나 매일 밤마다 보는 달! 이제 가까이서 만져보세요~!</div>
        <div>
          달에는 정말 토끼가 살고 있을까요? 지구의 6분의 1밖에 되지 않는
          중력으로 높이뛰기도 가능합니다! 달의 흙은 인당 한 봉지씩만 지구로
          가져오실 수 있습니다.
        </div>
      </div>
    </>
  );
}

export default DetailCard;
