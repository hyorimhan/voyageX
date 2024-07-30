'use client';
import { Dispatch, SetStateAction } from 'react';

interface AddressChangeModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export type Address = {
  alias: string | null;
  postcode: string | null;
  address: string | null;
  oldAddress: string | null;
  detailAddress: string | null;
  recipient: string | null;
  phone: string | null;
  is_default: boolean | null;
};

function AddressChangeModal({ setIsModalOpen }: AddressChangeModalProps) {
  const handleChangeAddress = () => {
    setIsModalOpen(false);
  };

  const addressList: Address[] = [
    {
      alias: '집',
      postcode: '03045',
      address: '서울 종로구 효자로 12 국립고궁박물관',
      oldAddress: '세종로 1-57',
      detailAddress: '테스트1',
      recipient: '세종대왕',
      phone: '010-1234-5678',
      is_default: true,
    },
    {
      alias: '회사',
      postcode: '03045',
      address: '경기도 수원시 영통구 삼성로 129 삼성전자공업단지',
      oldAddress: '경기도 수원시 영통구 매탄3동 416',
      detailAddress: '테스트2',
      recipient: '이재용',
      phone: '010-8765-4321',
      is_default: false,
    },
  ];

  return (
    <>
      <section
        className={`flex w-full h-full fixed top-0 left-0 justify-center`}
        onClick={handleChangeAddress}
      >
        <div className='relative bg-black-800 w-3/5 h-[700px] my-24 mx-auto rounded-lg'></div>
      </section>
    </>
  );
}

export default AddressChangeModal;
