import Scroll from '@/components/about/Scroll';
import { orbitron } from '../../../public/fonts/orbitron';

function Section4() {
  return (
    <section className=' relative sm:w-full sm:h-full sm:overflow-hidden lg:min-h-screen flex flex-col justify-center items-center '>
      <video
        src='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/section6%20(2).mp4?t=2024-08-16T08%3A01%3A10.130Z'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full h-full object-cover'
      />
      <div className='relative  min-h-screen h-full  w-full mx-auto  z-10  md:h-full flex flex-col justify-center   bg-black-900 bg-opacity-70'>
        <div className='relative'>
          <Scroll>
            <div className='text-center text-[20px] sm:text-sm w-[1120px] sm:w-[335px] mx-auto'>
              <div
                className={`${orbitron.className} sm:mt-5 mb-8 text-[28px] font-semibold sm:text-lg text-left`}
              >
                PAGE FEATURES
              </div>

              <div className='grid grid-cols-3 gap-y-10 sm:grid-cols-1'>
                <div className='h-[200px] w-[335px] '>
                  <div
                    className=' rounded-full text-[16px] py-3 animate-gradient bg-gradient-to-r from-primary-800 via-primary-500 to-primary-400 font-semibold'
                    style={{ width: '100%', backgroundSize: '200% 200%' }}
                  >
                    메인 페이지
                  </div>
                  <div className='mt-4 relative '>
                    <div className='bg-black-900 inset-0 opacity-50 absolute rounded-2xl'></div>
                    <div className='text-sm font-medium h-[141px] relative flex flex-col justify-center '>
                      <p>스크롤 애니메이션과 행성 움직임을 통해</p>
                      <p>우주 여행의 분위기를 연출합니다.</p>
                      <p>
                        사용자와의 상호작용을 위한 챗봇 기능도 함께 제공합니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='h-[200px] w-[335px] '>
                  <div
                    className='rounded-full text-[16px] py-3 animate-gradient bg-gradient-to-r from-primary-800 via-primary-500 to-primary-400 font-semibold'
                    style={{ width: '100%', backgroundSize: '200% 200%' }}
                  >
                    굿즈샵 페이지
                  </div>
                  <div className='mt-4 relative '>
                    <div className='bg-black-900 inset-0 opacity-50 absolute rounded-2xl'></div>
                    <div className='text-sm font-medium h-[141px] relative flex flex-col justify-center '>
                      <p>토스 페이먼츠 AP를 사용해</p>
                      <p>우주 여행 상품을 결제할 수 있습니다.</p>
                      <p>또한, 장바구니 대신 찜 기능을 제공해</p>
                      <p>상품을 저장할 수 있습니다.</p>
                    </div>
                  </div>
                </div>

                <div className='h-[200px] w-[335px] '>
                  <div
                    className='rounded-full  py-3 text-[16px] animate-gradient bg-gradient-to-r from-primary-800 via-primary-500 to-primary-400 font-semibold'
                    style={{ width: '100%', backgroundSize: '200% 200%' }}
                  >
                    굿즈샵 페이지
                  </div>
                  <div className='mt-4 relative '>
                    <div className='bg-black-900 inset-0 opacity-50 absolute rounded-2xl'></div>
                    <div className='text-sm font-medium h-[141px] relative flex flex-col justify-center '>
                      <p>로고가 들어간 다양한 우주 관련 굿즈를 구경하고,</p>
                      <p>토스 페이먼츠 API를 통해 편리한 결제할 수 있습니다.</p>
                      <p>장바구니에 상품을 담고 구매할 수 있으며,</p>
                      <p>상품별로 리뷰를 조회하고 작성과 수정이 가능합니다.</p>
                      <p>상품 정렬 기능도 제공됩니다.</p>
                    </div>
                  </div>
                </div>

                <div className='h-[200px] w-[335px] '>
                  <div
                    className='rounded-full  py-3 text-[16px] animate-gradient bg-gradient-to-r from-primary-800 via-primary-500 to-primary-400 font-semibold'
                    style={{ width: '100%', backgroundSize: '200% 200%' }}
                  >
                    커뮤니티 페이지
                  </div>
                  <div className='mt-4 relative '>
                    <div className='bg-black-900 inset-0 opacity-50 absolute rounded-2xl'></div>
                    <div className='text-sm font-medium h-[141px] relative flex flex-col justify-center '>
                      <p>우주 여행사 컨셉에 맞는</p>
                      <p>우주 관련 커뮤니티 기능을 제공합니다.</p>
                      <p>페이지네이션으로 여러 페이지를 쉽게</p>
                      <p>오갈 수 있으며, 필터별로 글을 나눠볼 수 있습니다.</p>
                    </div>
                  </div>
                </div>

                <div className='h-[200px] w-[335px] '>
                  <div
                    className='rounded-full  py-3 text-[16px] animate-gradient bg-gradient-to-r from-primary-800 via-primary-500 to-primary-400 font-semibold'
                    style={{ width: '100%', backgroundSize: '200% 200%' }}
                  >
                    마이 페이지
                  </div>
                  <div className='mt-4 relative '>
                    <div className='bg-black-900 inset-0 opacity-50 absolute rounded-2xl'></div>
                    <div className='text-sm font-medium h-[141px] relative flex flex-col justify-center '>
                      <p>예약 및 구매 내역 조회, </p>
                      <p>티켓 디지털 보관, 여행 후기 작성, </p>
                      <p>그리고 계정 설정 등 사용자 중심의 기능을</p>
                      <p> 한 곳에서 편리하게 이용할 수 있습니다.</p>
                    </div>
                  </div>
                </div>
                <div className='h-[200px] w-[335px] '>
                  <div
                    className='rounded-full py-3 text-[16px] animate-gradient bg-gradient-to-r from-primary-800 via-primary-500 to-primary-400 font-semibold'
                    style={{ width: '100%', backgroundSize: '200% 200%' }}
                  >
                    로그인 및 회원가입
                  </div>
                  <div className='mt-4 relative'>
                    <div className='bg-black-900 inset-0 opacity-50 absolute rounded-2xl'></div>
                    <div className='text-sm font-medium h-[141px] relative flex flex-col justify-center '>
                      <p>로그인 및 회원가입에서는</p>
                      <p>카카오, 구글 소셜 로그인 기능을 제공합니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Scroll>
        </div>
      </div>
    </section>
  );
}

export default Section4;
