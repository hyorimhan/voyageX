import Image from 'next/image';

const MyPageIcon24px = () => {
  return (
    <>
      <Image
        src='/icons/24px/my_page.svg'
        alt='my page icon 24px'
        width={24}
        height={24}
      />
    </>
  );
};

export default MyPageIcon24px;
