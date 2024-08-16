export default function BackgroundVideo() {
  return (
    <div className='fixed inset-0 w-full h-full overflow-hidden pointer-events-none opacity-50'>
      <video
        src='/videos/backgroundVideo.mp4'
        autoPlay
        loop
        playsInline
        muted
        suppressHydrationWarning
        className='absolute top-0 left-0 w-full h-full object-cover'
      ></video>
      {/* <div className='absolute top-0 left-0 w-full h-full bg-black-1000 opacity-30'></div> */}
    </div>
  );
}
