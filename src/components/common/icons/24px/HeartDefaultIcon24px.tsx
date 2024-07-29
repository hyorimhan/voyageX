import Image from 'next/image';

const HeartDefaultIcon24px = () => {
  return (
    <>
      <Image
        src='/icons/24px/heart_default.svg'
        alt='heart default icon 24px'
        width={24}
        height={24}
      />
    </>
  );
};

export default HeartDefaultIcon24px;
