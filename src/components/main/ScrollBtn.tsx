import Image from 'next/image';

function ScrollBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  return (
    <button
      onClick={scrollToTop}
      className='absolute mx-auto cursor-pointer bottom-3 transform -translate-x-1/2 animate-bounce z-10'
    >
      <Image
        src='/images/scroll-text.png'
        alt='Scroll Down'
        className='w-[60px] h-12 sm:w-10 sm:h-10'
        width={60}
        height={48}
      />
    </button>
  );
}

export default ScrollBtn;
