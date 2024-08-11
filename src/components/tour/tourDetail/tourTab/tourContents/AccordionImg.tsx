import Image from 'next/image';

function AccordionImg({ isEnter }: { isEnter: boolean }) {
  return (
    <>
      <Image
        className={`transition-transform duration-200 ease-out cursor-pointer ${
          isEnter && 'rotate-180'
        }`}
        src='/icons/24px/detail_arrow_up.svg'
        alt='button'
        width={24}
        height={24}
      />
    </>
  );
}

export default AccordionImg;
