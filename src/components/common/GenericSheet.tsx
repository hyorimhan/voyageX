import React, { Dispatch, SetStateAction, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
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

const GenericSheet = ({
  isOpen,
  setIsModalOpen,
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
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 0,
    },
  };

  const modalTransition = {
    type: 'spring',
    stiffness: 500,
    damping: 50,
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.section
        className='fixed inset-0 flex items-end justify-center bg-black-1000 bg-opacity-50 z-50 text-white'
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}
      >
        <motion.div
          variants={modalVariants}
          transition={modalTransition}
          initial='hidden'
          animate='visible'
          exit='exit'
          className={`bg-black-800 ${popupWidth} w-full rounded-t-lg flex flex-col items-center px-5 pt-14 pb-9 ${popup}`}
        >
          <div className={`text-xl mb-5 ${popupTitle}`}>{title}</div>
          <div className={`text-sm mb-7 text-center ${popupContent} `}>
            {content}
          </div>
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
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default GenericSheet;
