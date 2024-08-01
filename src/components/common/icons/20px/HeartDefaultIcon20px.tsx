import Image from 'next/image';

const HeartDefaultIcon20px = () => {
  return (
    <Image
      src='/icons/20px/heart_default.svg'
      alt='heart default icon 20px'
      width={20}
      height={20}
    />
  );
};

export default HeartDefaultIcon20px;
