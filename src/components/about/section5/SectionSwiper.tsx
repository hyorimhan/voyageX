import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import Link from 'next/link';
import { IoLogoGithub } from 'react-icons/io5';
import { SiNaver } from 'react-icons/si';
import Card from './Card';

function SectionSwiper() {
  const member = [
    {
      imgSrc: '/images/member/chan.png',
      name: '이성찬',
      tasks: '커뮤니티 • 뉴스',
      icon: (
        <Link href={'https://github.com/SNGCHN'}>
          <IoLogoGithub size={30} className='hover:text-black-600' />
        </Link>
      ),
    },
    {
      imgSrc: '/images/member/rim.png',
      name: '한효림',
      tasks: (
        <div>
          <p>회원가입 • ABOUT US </p>
          <p>• 여행 상품 • 로그인 </p>
        </div>
      ),
      icon: (
        <Link href={'https://github.com/hyorimhan'}>
          <IoLogoGithub size={30} className='hover:text-black-600' />
        </Link>
      ),
    },
    {
      imgSrc: '/images/member/jeong.png',
      name: '정현욱',
      tasks: (
        <div>
          <p>굿즈샵 </p>
          <p>• 마이페이지 • 결제 </p>
        </div>
      ),
      icon: (
        <Link href={'https://github.com/ghastlymouse'}>
          <IoLogoGithub size={30} className='hover:text-black-600' />
        </Link>
      ),
    },
    {
      imgSrc: '/images/member/jin.png',
      name: '김휘진',
      tasks: '메인',
      icon: (
        <Link href={'https://github.com/hwijinkim22'}>
          <IoLogoGithub size={30} className='hover:text-black-600' />
        </Link>
      ),
    },
    {
      imgSrc: '/images/member/ji.png',
      name: '유수지',
      tasks: '굿즈샵 • 마이페이지',
      icon: (
        <Link href={'https://github.com/suzy0504'}>
          <IoLogoGithub size={30} className='hover:text-black-600' />
        </Link>
      ),
    },
    {
      imgSrc: '/images/member/momo.png',
      name: '김모아',
      tasks: '디자인',
      icon: (
        <Link href={'https://blog.naver.com/pepper_3'}>
          <SiNaver size={20} className='text-green-500 hover:text-green-400' />
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className='sm:hidden'>
        <Swiper
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {member.map(({ imgSrc, name, tasks, icon }) => (
            <SwiperSlide key={name}>
              <div className='py-10 px-4'>
                <Card
                  member={imgSrc}
                  key={name}
                  name={name}
                  tasks={tasks}
                  icon={icon}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='lg:hidden'>
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {member.map(({ imgSrc, name, tasks, icon }) => (
            <SwiperSlide key={name}>
              <div className='py-10 px-4'>
                <Card
                  member={imgSrc}
                  key={name}
                  name={name}
                  tasks={tasks}
                  icon={icon}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default SectionSwiper;
