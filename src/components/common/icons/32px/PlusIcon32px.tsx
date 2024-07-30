import Image from 'next/image';

const PlusIcon32px = () => {
  return (
    <>
      <Image
        src='/icons/32px/plus.svg'
        alt='plus icon 32px'
        width={32}
        height={32}
      />
    </>
  );
};

export default PlusIcon32px;
