import Image from 'next/image';

const MyPageIcon32px = () => {
  return (
    <Image
      src='/icons/32px/my_page.svg'
      alt='my page icon 32px'
      width={32}
      height={32}
    />
  );
};

export default MyPageIcon32px;
