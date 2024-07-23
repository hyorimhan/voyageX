import Link from 'next/link';
import { IoMdHeart } from 'react-icons/io';

const MyPageSideBar = () => {
  return (
    <div className='w-fit sticky top-0 p-5'>
      <div className='mb-10'>
        <p>아이디</p>
        <p className='flex flex-row items-center'>
          작성글 수 5 |<IoMdHeart className='ml-1' /> 35
        </p>
      </div>
      <div className='gap-3 flex flex-col'>
        <Link href={'/tour_orders'}>여행상품 주문/배송조회</Link>
        <Link href={'/'}>굿즈샵 주문/배송조회</Link>
        <Link href={'/'}>비밀번호 변경</Link>
        <Link href={'/address_list'}>배송지 관리</Link>
        <Link href={'/post_list'}>커뮤니티 작성 글 목록</Link>
        <Link href={'/'}>문의하기</Link>
        <Link href={'/'}>회원탈퇴</Link>
      </div>
    </div>
  );
};

export default MyPageSideBar;
