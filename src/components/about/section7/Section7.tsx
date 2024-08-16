import React from 'react';
import Scroll from '../Scroll';
import Card from './Card';
import { SiNaver } from 'react-icons/si';
import { IoLogoGithub } from 'react-icons/io';

import Link from 'next/link';
const member = [
  {
    imgSrc: '/images/member/chan.png',
    name: '이성찬',
    tasks: '커뮤니티',
    icon: (
      <Link href={'https://github.com/SNGCHN'}>
        <IoLogoGithub size={30} className='hover:text-black-600' />
      </Link>
    ),
  },
  {
    imgSrc: '/images/member/rim.png',
    name: '한효림',
    tasks: '회원가입 & 로그인 & 여행 상품 & ABOUT US',
    icon: (
      <Link href={'https://github.com/hyorimhan'}>
        <IoLogoGithub size={30} className='hover:text-black-600' />
      </Link>
    ),
  },
  {
    imgSrc: '/images/member/jeong.png',
    name: '정현욱',
    tasks: '굿즈샵 & 마이페이지 & 결제',
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
    tasks: '굿즈샵 & 마이페이지',
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

function Section7() {
  return (
    <section className='relative w-full h-full  '>
      <video
        src='https://uvjnwqdttdhvwexypdhx.supabase.co/storage/v1/object/public/background/section7.mp4?t=2024-08-16T08%3A01%3A19.037Z'
        autoPlay
        muted
        playsInline
        loop
        className='absolute top-0 left-0  object-cover w-full h-full'
      />

      <div className='relative z-10  flex flex-col mx-auto'>
        <Scroll>
          <div className='text-center mt-[150px] font-yuna'>
            <div className='text-6xl '>A11조</div>
            <div className='text-5xl'>팀 소개</div>
          </div>
          {member.map(({ imgSrc, name, tasks, icon }) => (
            <Card
              member={imgSrc}
              key={name}
              name={name}
              tasks={tasks}
              icon={icon}
            />
          ))}
        </Scroll>
      </div>
    </section>
  );
}

export default Section7;
