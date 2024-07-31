'use client';
import { Dispatch, SetStateAction } from 'react';

interface AddressChangeModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

function AddressChangeModal({ setIsModalOpen }: AddressChangeModalProps) {
  const handleChangeAddress = () => {
    setIsModalOpen(false);
  };

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
