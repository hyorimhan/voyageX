import React from 'react';

type ModalProps = {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  buttonText: string | React.ReactNode;
  buttonAction: () => void | React.ReactNode | Promise<void>;
  cancelText?: string;
  cancelAction?: () => void;
  popup?: string;
  popupContent?: string;
  popupWidth?: string;
  popupTitle?: string;
  popupButton?: React.ReactNode;
};

const GenericModal = ({
  isOpen,
  title,
  content,
  buttonText,
  buttonAction,
  cancelText,
  cancelAction,
  popup,
  popupContent,
  popupWidth,
  popupTitle,
  popupButton,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-1000 bg-opacity-50 z-50 text-white'>
      <div
        className={`bg-black-800 sm:w-[340px] ${popupWidth} w-[414px] rounded-lg flex flex-col items-center px-5 pt-14 pb-9 ${popup}`}
      >
        <p className={`text-xl mb-5 ${popupTitle}`}>{title}</p>
        <p className={`text-sm mb-7 text-center ${popupContent} `}>{content}</p>
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
        {popupButton && <div className='ml-auto mt-3'>{popupButton}</div>}
      </div>
    </div>
  );
};

export default GenericModal;
