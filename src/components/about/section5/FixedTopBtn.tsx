import Image from 'next/image';

function FixedTopBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex justify-center p-5 mt-10'>
      <button onClick={scrollToTop} className=' animate-bounce z-50 '>
        <Image
          src={'/icons/TopBtn.svg'}
          alt='voyageXtopBtn'
          width={52}
          height={20}
        />
      </button>
    </div>
  );
}

export default FixedTopBtn;
