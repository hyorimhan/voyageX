import ArrowLeftIcon24px from '@/components/common/icons/24px/ArrowLeftIcon24px';
import DeleteAccountBtn from '@/components/mypage/delete_account/DeleteAccountBtn';
import Link from 'next/link';

const DeleteAccountPage = () => {
  return (
    <div>
      <div className='flex mb-[26px] gap-2 sm:mt-8 sm:mb-6'>
        <Link
          href={'/mypage/side_bar'}
          className='md:hidden lg:hidden self-center'
        >
          <ArrowLeftIcon24px />
        </Link>
        <p className='text-2xl sm:text-xl'>회원탈퇴</p>
      </div>
      <div className='py-8 border-y-[1px] border-black-700'>
        <p className='text-lg mb-9 sm:mb-6 sm:text-base'>탈퇴 유의사항</p>
        <div className='text-sm gap-6 flex-col flex sm:text-xs'>
          <div>
            <p className='mb-4 font-bold'>회원 재가입 제한</p>
            <li>
              회원탈퇴 후 재가입 시 신규회원으로 가입되며, 탈퇴 전의 회원정보,
              주문정보, 작성 글 확인은 복원되지 않습니다.
            </li>
            <li>
              사이트 정책에 따라 최대 15일 동안 회원 재가입이 불가능합니다.
            </li>
          </div>
          <div>
            <p className='mb-4 font-bold'>회원 재가입 유예기간</p>
            <li>주문이력이 없는 회원 : 5일 이내</li>
            <li>주문이력이 있는 회원 : 15일 이내</li>
          </div>
          <div>
            <p className='mb-4 font-bold'>개인정보 파기</p>
            <li>개인정보는 회원 재가입 유예기간 경과 후 즉시 파기됩니다.</li>
          </div>
        </div>
      </div>
      <DeleteAccountBtn buttonText='확인' />
    </div>
  );
};

export default DeleteAccountPage;
