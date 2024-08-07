'use client';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import QuantityBtn from '@/components/shop/detail/QuantityBtn';
import { Tour } from '@/types/tourPropsType';
import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import TourHearts from './TourHearts';
import TourGuideSWiper from './TourGuideSWiper';
import { orbitron } from '../../../../public/fonts/orbitron';
import { useRouter } from 'next/navigation';
import useTourOrderInfoStore, {
  tourInfoType,
} from '@/zustand/store/useTourOrderInfoStore';

function DetailCard({ tour }: { tour: Tour }) {
  const user = useAuthStore((state) => state.user);
  const { setTourOrder } = useTourOrderInfoStore((state) => state);
  const router = useRouter();

  const handleGoToPayPage = () => {
    const tourOrder: tourInfoType = {
      tour_id: tour.id,
      planet_name: tour.planets?.name!,
      eng_name: tour.planets?.english_name!,
      planet_img: tour.planets?.planet_img!,
      price: tour.price,
      depart_date: '2024-08-07',
      arrive_date: '2024-08-14',
      gate: 'A3',
      qr_code: 'QR코드',
    };
    setTourOrder(tourOrder);
    router.push(`/tour/payment/`);
  };

  const contents = (
    <div>
      <div className='mt-12 text-2xl font-semibold'>
        {tour.planets?.name} 여행 패키지 일정
      </div>
      <div className='mt-6 font-medium'>{tour.planets?.title}</div>
      <div className='mt-6 font-medium'>{tour.planets?.description}</div>
      <div className='mt-6'>
        <ul>
          <li>
            1 DAY
            <ul>
              <li>아리조나 트레이닝 센터 내 조식</li>
              <li>무중력 적응훈련/Final</li>
              <li>중식(아리조나 현지식)</li>
              <li>우주선 탑승 및 이륙</li>
              <li>석식(특식 제공: 안심스테이크)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>2 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>
                지구 및 우주 사진촬영 진행(선택옵션: 전용망원경으로 촬영가능,
                $400/1장)
              </li>
              <li>중식(우주식)</li>
              <li>무중력에서 즐기는 보드게임 및 레크레이션</li>
              <li>석식(특식 제공: 샤브샤브)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>3 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>달 도착</li>
              <li>중식(우주식)</li>
              <li>
                달 내 무중력 탐험, 사진촬영 진행(선택옵션: 전용망원경으로
                촬영가능, $400/1장)
              </li>
              <li>석식(특식 제공: 달 현지식)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>4 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>
                달 탐험 및 무중력 체험 2차(달 암초들 탐사작 진행) 및 중식(휴대용
                우주식)
              </li>
              <li>석식(특식 제공: 달 현지식)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>5 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>
                달 탐험 및 무중력 체험 3차 진행(높이뛰기/멀리뛰기를 가라타나)
              </li>
              <li>중식(우주식)</li>
              <li>
                달 내 2차 촬영(선택옵션: 전용망원경으로 촬영가능, $400/1장) 및
                달 이착 준비
              </li>
              <li>석식(특식 제공: 삼겹살)</li>
              <li>이륙 - 우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>6 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>무중력에서 즐기는 보드게임 및 레크레이션 2차</li>
              <li>중식(우주식)</li>
              <li>
                지구와의 무전 커뮤니케이션 프로그램(강력추천 옵션: $80/1회)
              </li>
              <li>석식(특식 제공: 떡갈비 정식)</li>
              <li>우주선 내 휴식</li>
            </ul>
          </li>
          <li>
            <div className='mt-6'>7 DAY</div>
            <ul>
              <li>조식(우주식)</li>
              <li>
                지구 및 우주 2차 사진촬영(선택옵션: 전용망원경으로 촬영가능,
                $400/1장) 및 지구 착륙 준비
              </li>
              <li>지구 착륙 후 석식(아리조나 현지식)</li>
              <li>아리조나 트레이닝 센터 내 휴식</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-4 '>
        <TourGuideSWiper />
      </div>
    </div>
  );

  return (
    <>
      <div
        className={` mb-14 mt-[132px] ${orbitron.className} font-semibold text-[28px]`}
      >
        Travel Package
      </div>
      <div className='flex'>
        <div className='flex w-[500px] h-[500px]'>
          <Image
            src={tour.planets?.planet_img!}
            alt={tour.planets?.name!}
            width={500}
            height={500}
            className='m-6 '
          />
        </div>
        <div className='w-[556px] h-[552px] ml-16'>
          <div className='text-2xl mb-4 font-semibold'>
            <span className='mr-3'>{tour.planets?.name}</span>
            <span className='text-black-700'>{tour.planets?.english_name}</span>
          </div>
          <div></div>
          <div className='text-sm mb-8 font-medium'>{tour.tag}</div>
          <div className='text-lg mb-[12px] font-semibold'>6박 7일 패키지</div>
          <div className='text-2xl mb-[32px] font-medium'>
            {tour.price?.toLocaleString()}원
          </div>
          <div className='text-[14px] border-t font-medium '>
            <div className=' border-b my-3  pb-3'>출발확정 2025.10.10</div>
            <div className=' border-b my-3  pb-3'>
              여행기간 2025.10.10 ~2025.10.20
            </div>
            <div className=' border-b my-3  pb-3 '>우주선 명 스타라이저</div>
            <div className=' border-b my-3  pb-3'>수량 1개 (1인 1개 한정)</div>
          </div>
          <QuantityBtn tourPrice={tour.price} />
          <div className='flex items-center gap-4'>
            <div className=' w-[53px] h-[53px] flex p-2 rounded-lg items-center border-2 justify-center border-solid border-primary-400 mt-8'>
              <TourHearts tour_id={tour.id} user_id={user?.id} />
            </div>
            <button
              onClick={handleGoToPayPage}
              className='h-[60px] w-[487px] bg-primary-600 rounded-lg justify-center flex items-center mt-8 font-semibold'
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
      <div>
        <GoodsDetailPageTabSelector
          goodsRating={tour?.rating_avg}
          goodsId={tour.id}
          contents={contents}
        />
      </div>
    </>
  );
}

export default DetailCard;
