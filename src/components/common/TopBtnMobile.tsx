import Image from 'next/image';

interface topBtnProps {
  size: string;
}

function TopBtnMobile({ size }: topBtnProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    // <div className='flex justify-center p-5'>
    //   <button onClick={scrollToTop} className=' animate-bounce z-50 '>
    //     <div className={`${size} text-primary-200`}>TOP</div>
    //   </button>
    // </div>
    <div className='flex justify-center p-5'>
      <button onClick={scrollToTop} className=' animate-bounce z-50 '>
        <Image
          src={'/icons/logo/logo1.svg'}
          alt='voyage_x_logo'
          width={100}
          height={100}
        />
      </button>
    </div>
  );
}
export default TopBtnMobile;
