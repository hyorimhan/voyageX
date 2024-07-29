import Image from 'next/image';

const MinusIcon20px = () => {
  return (
    <>
      <Image
        src='/icons/20px/minus.svg'
        alt='minus icon 20px'
        width={20}
        height={20}
      />
    </>
  );
};

export default MinusIcon20px;
