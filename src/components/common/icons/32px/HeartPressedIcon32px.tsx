import Image from 'next/image';

const HeartPressedIcon32px = () => {
  return (
    <>
      <Image
        src='/icons/32px/heart_pressed.svg'
        alt='heart pressed icon 32px'
        width={32}
        height={32}
      />
    </>
  );
};

export default HeartPressedIcon32px;
