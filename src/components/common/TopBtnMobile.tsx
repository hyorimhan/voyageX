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
    <div className='flex justify-center p-5'>
      <button onClick={scrollToTop} className=' animate-bounce z-50 '>
        <div className={`${size} text-primary-200`}>TOP</div>
      </button>
    </div>
  );
}
export default TopBtnMobile;
