import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { RiNotionFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className='bg-black-900 bg-opacity-75 w-full text-white py-2 relative z-20'>
      <div className='container mx-auto px-6'>
        <div className='max-w-[1120px] mx-auto'>
          <div className='text-left py-8 sm:py-3 text-black-50 md:text-left mb-2 md:mb-0'>
            <p>(주) 보이지 엑스</p>
            <div className='text-black-400 sm:text-xs text-sm'>
              <p>
                스페이스원 타워 23층 인천광역시 연수구 유니버스대로 1001 송도
                우주산업단지 X-블록 우편번호: 21990
              </p>

              <p>고객상담팀(채널톡) (상담시간 월~금: AM 09:00 ~ PM 06:00) </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
