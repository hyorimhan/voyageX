import { ReactNode } from 'react';
import { TfiClose } from 'react-icons/tfi';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-40'>
      <div className='relative border-solid border-x-[38px] border-y-[50px] rounded-lg border-white w-2/6 h-3/4 bg-white'>
        <button
          onClick={onClose}
          className='absolute -top-10 -right-6 p-2 text-lg z-50 text-black-1000'
        >
          <TfiClose />
        </button>
        <div className='absolute -top-10 ml-8 transform -translate-x-1/2'>
          <p className='text-black-1000 text-xl font-bold'>주소검색</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
