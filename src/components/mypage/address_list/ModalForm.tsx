import CloseBlackIcon24px from '@/components/common/icons/24px/CloseBlackIcon24px';
import { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-40'>
      <div className='relative border-solid border-[38px] rounded-lg border-white w-2/6 h-3/4 bg-white'>
        <button
          onClick={onClose}
          className='absolute -top-9 -right-3 p-2 text-lg z-50 text-black-1000'
        >
          <CloseBlackIcon24px />
        </button>
        <div className='absolute -top-10 ml-8 transform -translate-x-1/2'></div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
