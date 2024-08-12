import Link from 'next/link';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { RiNotionFill } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className='bg-black bg-opacity-75 text-white py-6 relative z-20'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-center md:text-left mb-4 md:mb-0'>
            <p className='text-lg'>(주) 보이지 엑스</p>
            <div className='text-gray-300'>
              <p>
                스페이스원 타워 23층 인천광역시 연수구 유니버스대로 1001 송도
                우주산업단지 X-블록 우편번호: 21990
              </p>
              <p>고객상담팀(채널톡) (상담시간 월~금: AM 09:00 ~ PM 06:00)</p>
            </div>
          </div>
          <div className='text-center flex md:text-right space-x-4 text-gray-300 '>
            {/* <a href="#" className="hover:underline">서비스이용약관</a>
            <span> | </span>
            <a href="#" className="hover:underline">개인정보처리방침</a>
            <span> | </span>
            <a href="#" className="hover:underline">영상정보처리방침</a>
            <span> | </span>
            <a href="#" className="hover:underline">우주여행문의</a>
            <span> | </span>
            <a href="#" className="hover:underline">찾아오는 길</a> */}
            <Link href={'https://github.com/hyorimhan/voyageX'}>
              <AiFillGithub className='w-8 h-8' />
            </Link>
            <Link
              href={
                'https://www.notion.so/teamsparta/A-11-10-1-a6343ef77fc84599a941ba2a50f7f72d'
              }
            >
              <RiNotionFill className='w-8 h-8' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
