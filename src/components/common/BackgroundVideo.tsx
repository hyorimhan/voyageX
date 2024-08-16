export default function BackgroundVideo() {
  return (
    <div className='fixed top-0 left-0 w-full h-full -z-50'>
      <video
        src='/videos/backgroundVideo.mp4'
        autoPlay
        loop
        playsInline
        muted
        suppressHydrationWarning
      ></video>
      <div className='absolute top-0 left-0 w-full h-full bg-black-1000 opacity-30'></div>
    </div>
  );
}
