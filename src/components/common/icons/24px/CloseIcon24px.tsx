import Image from 'next/image';

const CloseIcon24px = () => {
  return (
    <>
      <Image
        src='/icons/24px/close.svg'
        alt='close icon 24px'
        width={24}
        height={24}
      />
    </>
  );
};

export default CloseIcon24px;
