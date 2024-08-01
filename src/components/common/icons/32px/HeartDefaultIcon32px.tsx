import Image from 'next/image';

const HeartDefaultIcon32px = () => {
  return (
    <Image
      src='/icons/32px/heart_default.svg'
      alt='heart default icon 32px'
      width={32}
      height={32}
    />
  );
};

export default HeartDefaultIcon32px;
