import React from 'react';

type ModalProps = {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  buttonText: string;
  buttonAction: () => void;
  cancelText?: string;
  cancelAction?: () => void;
};

const GenericModal = ({
  isOpen,
  title,
  content,
  buttonText,
  buttonAction,
  cancelText,
  cancelAction,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-50 text-white'>
      <div className='bg-black-800 sm:w-[300px] w-[414px] rounded-lg flex flex-col items-center px-5 pt-14 pb-9'>
        <p className='text-xl mb-5'>{title}</p>
        <p className='text-sm mb-7 text-center'>{content}</p>
        <div className='flex w-full gap-4 text-black-50 font-semibold h-[51px]'>
          {cancelText && cancelAction && (
            <button
              onClick={cancelAction}
              className='bg-transparent border-primary-400 border-[2px] w-full rounded-lg hover:bg-primary-200 hover:text-primary-700 active:bg-primary-300 active:text-primary-700'
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={buttonAction}
            className='bg-primary-600 rounded-lg w-full hover:bg-primary-400 active:bg-primary-500 '
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
