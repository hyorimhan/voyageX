import Scroll from '@/components/about/Scroll';

function Section4() {
  return (
    <section className=' relative sm:w-full sm:h-screen sm:overflow-hidden lg:min-h-screen flex flex-col justify-center items-center '>
      <video
        src='https://dl.dropboxusercontent.com/scl/fi/tdg9uxfik3oj3s2bdvecn/7664745-hd_1920_1080_25fps.mp4?rlkey=p59d4flvsgh4uclytlsowbue7&st=zgthsdij'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  w-full h-full object-cover'
      />
      <div className='relative'>
        <Scroll>
          <div className='text-center text-[20px] sm:text-sm'>
            <div className='text-[28px] font-semibold sm:text-lg text-center'>
              Page Features
            </div>
            <div className='my-5 bg-black-800 bg-opacity-50'>
              <div>
                <div className='relative z-10  '>
                  <div className='  sm:p-3 lg:p-5'>
                    메인 페이지는 스크롤 애니메이션과 행성 움직임을 통해 우주
                    여행의 분위기를 연출합니다. 사용자와의 상호작용을 위한 챗봇
                    기능도 함께 제공합니다.
                  </div>
                </div>
              </div>

              <div className='  lg:p-5'>
                <div className='sm:hidden'>
                  <p>
                    여행상품 페이지에서는 토스 페이먼츠 API를 사용해 우주 여행
                    상품을 결제할 수 있습니다. 장바구니 대신 찜 기능을 제공해
                    상품을 저장할 수 있습니다.
                  </p>
                </div>
                <div className='lg:hidden  sm:p-3'>
                  여행 상품 페이지에서는 다양한 우주 여행 상품을 탐색하고 구매할
                  수 있습니다. 상품 찜 기능과 리뷰 시스템을 갖추고 있으며, 토스
                  페이먼츠를 통한 간편 결제를 지원합니다.
                </div>
              </div>

              <div className='  lg:p-5'>
                <div className='sm:hidden'>
                  굿즈샵 페이지에서는 로고가 들어간 다양한 우주 관련 굿즈를
                  구경하고, 토스 페이먼츠 API를 통해 결제할 수 있습니다.
                </div>
                <div className='lg:hidden  sm:p-3'>
                  굿즈샵은 우주 테마의 상품을 판매하는 공간으로, 장바구니 기능과
                  리뷰 시스템을 제공합니다. 결제는 토스 페이먼츠를 통해
                  처리되며, 상품 정렬 기능으로 쇼핑 경험을 개선했습니다.
                </div>
              </div>

              <div className=' lg:p-5'>
                <div className=' sm:p-3'>
                  커뮤니티 페이지는 우주 애호가들의 소통 공간입니다. 주제별
                  필터링과 페이지네이션 기능으로 사용자 편의성을 높였습니다.
                </div>
              </div>

              <div className='  lg:p-5'>
                <div>
                  마이페이지에서는 구매한 티켓과 상품 정보를 확인할 수 있습니다.
                  티켓 이미지 저장, 리뷰 작성, 계정 관리 등 개인화된 서비스를
                  제공합니다.
                </div>
              </div>
              <div className='   lg:p-5 sm:p-3'>
                로그인 및 회원가입에서는 카카오, 구글 소셜 로그인 기능을
                제공합니다.
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </section>
  );
}

export default Section4;
