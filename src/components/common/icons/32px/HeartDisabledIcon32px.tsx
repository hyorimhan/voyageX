import Image from 'next/image';

const HeartDisabledIcon32px = () => {
  return (
    <Image
      src='/icons/32px/heart_disabled.svg'
      alt='heart disabled icon 32px'
      width={32}
      height={32}
    />
  );
};

export default HeartDisabledIcon32px;
