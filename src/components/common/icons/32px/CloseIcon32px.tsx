import Image from 'next/image';

const CloseIcon32px = () => {
  return (
    <>
      <Image
        src='/icons/32px/close.svg'
        alt='close icon 32px'
        width={32}
        height={32}
      />
    </>
  );
};

export default CloseIcon32px;
