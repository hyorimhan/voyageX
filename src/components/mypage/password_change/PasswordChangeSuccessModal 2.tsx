'use client';

import CloseIcon32px from '@/components/common/icons/32px/CloseIcon32px';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PasswordChangeSuccessModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-50 text-white'>
      <div className='bg-black-800 w-[414px] h-[249px] rounded-lg p-6 flex flex-col items-center pt-14 pb-9'>
        <p className='text-xl mb-5'>비밀번호 변경완료</p>
        <p className='text-sm'>비밀번호가 재설정 되었습니다.</p>
        <p className='text-sm'>
          안전한 거래를 위해 재로그인 해주시기 바랍니다.
        </p>
        <button
          onClick={onClose}
          className='bg-primary-600 p-4 w-full rounded-lg mt-7'
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PasswordChangeSuccessModal;
