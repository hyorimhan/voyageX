import Image from 'next/image';

const HeartHovered32px = () => {
  return (
    <>
      <Image
        src='/icons/32px/heart_hovered.svg'
        alt='heart hovered icon 32px'
        width={32}
        height={32}
      />
    </>
  );
};

export default HeartHovered32px;
