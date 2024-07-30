import { Address } from '@/types/userAddressType';
import useAuthStore from '@/zustand/store/useAuth';

function CustomerInfo({ defaultAddress }: { defaultAddress: Address }) {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <div className='border-[1px] border-black-300 rounded-lg  mb-8 '>
        <div className=' mb-5 flex'>
          <div className='items-center border-b border-b-black-700 flex mt-5 ml-5'>
            <div className='w-[570px] text-xl '>주문자 정보</div>
            <button className='bg-primary-400 rounded-lg p-2 h-[30px] text-xs mb-3'>
              주문자 정보 변경
            </button>
          </div>
        </div>

        <div className='mx-auto w-[672px] text-sm'>
          <div className='flex'>
            <div className='w-[104px] mr-[18px]'>받는 분</div>
            <div>{defaultAddress?.recipient}</div>
          </div>
          <div className='flex'>
            <div className='w-[104px] mr-[18px] my-5'>휴대전화 번호</div>
            <div className='my-5'>{defaultAddress?.phone}</div>
          </div>
          <div className='flex'>
            <div className='w-[104px] mr-[18px] mb-5'>이메일 주소</div>
            <div className='mb-5'>{user?.email}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
