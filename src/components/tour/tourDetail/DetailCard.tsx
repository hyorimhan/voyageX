'use client';
import GoodsDetailPageTabSelector from '@/components/shop/detail/GoodsDetailPageTabSelector';
import useAuthStore from '@/zustand/store/useAuth';
import Image from 'next/image';
import TourHearts from './TourHearts';
import { orbitron } from '../../../../public/fonts/orbitron';
import { Tour } from '@/types/tourPropsType';
import TourContents from './tourTab/tourContents/TourContents';
import GuideContents from './tourTab/guideContents/GuideContents';
import { useRouter } from 'next/navigation';
import useTourOrderInfoStore, {
  tourInfoType,
} from '@/zustand/store/useTourOrderInfoStore';
import TourRouter from './TourRouter';
import DetailInfo from './DetailInfo';
import DetailDate from './DetailDate';
import { useTourDate } from '@/zustand/store/useTourDate';
import toast from 'react-hot-toast';
import ShareLink from '@/components/common/ShareLink';
import { useGetTourReviews } from '@/hooks/apis/review.api';
import Loading from '@/components/common/Loading';
import { HiOutlineXMark } from 'react-icons/hi2';

function DetailCard({ tour }: { tour: Tour }) {
  const user = useAuthStore((state) => state.user);
  const TourDate = useTourDate((state) => state.tourDate);
  const setTourDateReset = useTourDate((state) => state.setTourDateReset);
  const { setTourOrder } = useTourOrderInfoStore((state) => state);
  const { data: tourReviews, isPending } = useGetTourReviews(tour.id);
  const router = useRouter();

  const handleGoToPayPage = () => {
    const tourOrder: tourInfoType = {
      tour_id: tour.id,
      planet_name: tour.planets?.name!,
      eng_name: tour.planets?.english_name!,
      planet_img: tour.planets?.planet_img!,
      price: tour.price,
      depart_date: TourDate.departDate!,
      arrive_date: TourDate.arriveDate!,
      gate: tour.ship_code!,
      qr_code: 'QR코드',
    };

    if (!TourDate.departDate || !TourDate.arriveDate) {
      toast.error('여행 기간을 선택해주세요');
      return;
    }
    setTourOrder(tourOrder);

    router.push(`/tour/payment/`);
  };

  if (isPending) return <Loading />;
  return (
    <>
      <div
        className={` mb-12 sm:mt-16 md:mt-16 sm:ml-5 md:ml-5 ${orbitron.className} font-semibold text-[28px]`}
      >
        <TourRouter url={'/tour'} />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1'>
        <div className='sm:w-[335px] sm:p-[27.5px] mx-auto mb-[10px]'>
          <Image
            src={tour.planets?.planet_img!}
            alt={tour.planets?.name!}
            width={500}
            height={500}
            className='md:mx-auto
            '
          />
        </div>

        <div className='sm:mx-5 md:mx-5'>
          <div className='text-2xl mb-4 font-semibold flex '>
            <span className='mr-3'>{tour.planets?.name}</span>
            <span className='text-black-700'>{tour.planets?.english_name}</span>
            <div className='ml-auto'>
              <ShareLink />
            </div>
          </div>
          <div className='text-sm mb-8 font-medium'>{tour.tag}</div>
          <div className='text-lg mb-[12px] font-semibold'>6박 7일 패키지</div>
          <div className='text-2xl mb-[32px] font-medium'>
            {tour.price?.toLocaleString()}원
          </div>
          <DetailInfo
            title={
              <span className='hidden sm:block  sm:whitespace-nowrap'>
                여행 기간
              </span>
            }
            description={<DetailDate />}
            borderTop={'border-t'}
          />
          <DetailInfo title={'출발지'} description={'대전, 한국'} />
          <DetailInfo title={'우주선 명'} description={`${tour.spaceship}`} />
          <DetailInfo title={'우주선 코드'} description={`${tour.ship_code}`} />
          {TourDate.departDate && (
            <div className='h-[84px] p-3 mt-10  grid-cols-2  bg-black-800 border-b border-b-white'>
              <div className='flex'>
                <div>
                  <div className='mb-2 sm:text-sm '>
                    {tour.planets?.name} 6박 7일 패키지 ㅣ 1매
                    <span className='text-black-300 text-xs'>
                      (수량 1인 1매 한정*)
                    </span>
                  </div>
                  <div className='sm:text-sm'>
                    {`${TourDate.departDate} ~
                  ${TourDate.arriveDate}`}
                  </div>
                </div>
                <div className='ml-auto text-right '>
                  <button onClick={() => setTourDateReset()}>
                    <HiOutlineXMark size={20} />
                  </button>
                  <div className='sm:text-sm'>
                    {tour.price.toLocaleString()}원
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='flex justify-end items-center mt-4'>
            <span className='mr-4 text-sm'>총 상품금액</span>
            <span className='text-xl font-semibold sm:text-lg'>
              {TourDate.departDate ? tour.price.toLocaleString() : '0'}원
            </span>
          </div>

          <div className='flex md:justify-center items-center gap-4 sm:justify-center'>
            <div className=' w-[53px] h-[53px] flex p-2 rounded-lg items-center border-2 justify-center border-solid border-primary-400 mt-4'>
              <TourHearts tour_id={tour.id} user_id={user?.id} />
            </div>
            <button
              onClick={handleGoToPayPage}
              className=' w-[487px] bg-primary-600 rounded-lg justify-center flex items-center mt-4 font-semibold sm:w-[266px] h-[53px]'
            >
              구매하기
            </button>
          </div>
        </div>
      </div>

      <div className='md:mx-5 sm:mx-5'>
        <GoodsDetailPageTabSelector
          goodsRating={tour?.rating_avg}
          goodsReviews={tourReviews}
          contents={<TourContents tour={tour} />}
          showTourGuideTab={true}
          guideContents={<GuideContents />}
        />
      </div>
    </>
  );
}

export default DetailCard;
